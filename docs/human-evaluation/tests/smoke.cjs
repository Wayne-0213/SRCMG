/* Run with node tests/smoke.cjs from this directory; needs Playwright for QA only. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const http = require("node:http");
const vm = require("node:vm");
const { pathToFileURL } = require("node:url");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(__dirname, "..");
const fields = ["informativeness", "conciseness", "expressiveness", "acceptance"];
let checks = 0;
function check(condition, message) { assert.ok(condition, message); checks++; }
async function readDownload(download) { return fs.readFile(await download.path(), "utf8"); }

(async () => {
  const sandbox = { window: {} };
  vm.runInNewContext(await fs.readFile(path.join(root, "data.js"), "utf8"), sandbox);
  const dataset = JSON.parse(JSON.stringify(sandbox.window.SRCMG_EVALUATION));
  check(dataset.questions.length === 50, "Original 50 questions");
  check(dataset.questions.every((q) => q.candidates.length === 5), "Five candidates per question");
  check(dataset.questions.filter((q) => q.language === "java").length === 25, "Balanced language sample");
  const server = http.createServer(async (request, response) => {
    const pathname = new URL(request.url, "http://localhost").pathname;
    const filename = path.resolve(root, "." + (pathname.endsWith("/") ? pathname + "index.html" : pathname));
    if (!filename.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
    try {
      const type = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" }[path.extname(filename)] || "application/octet-stream";
      response.writeHead(200, { "Content-Type": type + "; charset=utf-8" });
      response.end(await fs.readFile(filename));
    } catch { response.writeHead(404).end(); }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const url = `http://127.0.0.1:${server.address().port}/`;
  let browser;
  try {
    browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {}) });
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const errors = [], requests = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("request", (request) => requests.push(request.url()));
    await page.goto(url);
    check(await page.locator(".candidate").count() === 5, "Initial question renders");
    check(await page.locator("#previous").isDisabled(), "First question boundary");
    check(await page.locator("input[type=radio]:checked").count() === 0, "No preselected ratings");
    await page.locator("#downloads summary").click();
    await page.locator("#export-detail").click();
    check(await page.locator(".candidate.invalid").count() === 1, "Incomplete export highlights missing candidate");
    check((await page.locator("#toast").textContent()).includes("还有未填项"), "Incomplete export explains missing answers");
    await page.locator("#downloads summary").click();
    for (const invalid of ["0", "51", "3.5"]) {
      await page.locator("#question-limit").fill(invalid);
      await page.locator("#question-limit").dispatchEvent("change");
      check(await page.locator("#question-limit").inputValue() === "50", "Reject invalid scope " + invalid);
    }
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No horizontal page overflow at ${width}px`);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.locator("#evaluator").fill("rater_test");
    await page.locator('[name="1-A-informativeness"][value="5"]').check();
    await page.locator('[name="1-A-acceptance"][value="0"]').check();
    await page.reload();
    check(await page.locator('[name="1-A-informativeness"][value="5"]').isChecked(), "Restore score");
    check(await page.locator('[name="1-A-acceptance"][value="0"]').isChecked(), "Restore zero acceptance");
    check(await page.locator("#evaluator").inputValue() === "rater_test", "Restore anonymous identifier");

    // Exercise real change events and rendered question content for the full sample.
    for (let index = 0; index < dataset.questions.length; index++) {
      const question = dataset.questions[index];
      await page.locator(`#question-nav button[data-index="${index}"]`).click();
      check((await page.locator(".gold").textContent()) === question.gold_msg, `Reference unchanged for Q${question.question_id}`);
      await page.evaluate(({ fields, accepted }) => {
        for (const card of document.querySelectorAll(".candidate")) {
          const scores = [5, 3, 4, accepted];
          fields.forEach((field, i) => card.querySelector(`input[data-field="${field}"][value="${scores[i]}"]`).click());
        }
      }, { fields, accepted: question.question_id % 2 });
    }
    check((await page.locator("#progress-percent").textContent()) === "100%", "All 1,000 judgments count as complete");
    check((await page.locator("#progress-text").textContent()).includes("250 / 250"), "All candidates complete");
    const downloadPromise = page.waitForEvent("download");
    await page.locator("#next").click();
    const resultDownload = await downloadPromise;
    const result = JSON.parse(await readDownload(resultDownload));
    check(resultDownload.suggestedFilename().startsWith("evaluation_results_all_"), "Compatible detail filename");
    check(result.responses.length === 250, "Full export count");
    check(result.meta.dataset_id === dataset.meta.dataset_id && result.meta.evaluator === "rater_test", "Export identity and metadata");
    check(!JSON.stringify(result.meta).includes("d:/project"), "No original workstation paths");
    check(result.summary.overall.completion_rate === 1, "Summary completion");
    for (const method of result.summary.by_method) {
      assert.deepEqual({ count: method.evaluated_count, inf: method.mean_informativeness, con: method.mean_conciseness, exp: method.mean_expressiveness, avg: method.mean_overall, acc: method.acceptance_rate }, { count: 50, inf: 5, con: 3, exp: 4, avg: 4, acc: 0.5 }); checks++;
    }
    for (const q of dataset.questions) for (const c of q.candidates) {
      const row = result.responses.find((r) => r.question_id === q.question_id && r.candidate_label === c.label);
      check(row.method === c.method && row.candidate_message === c.text && row.commit_id === q.commit_id, "Candidate mapping unchanged");
    }
    await page.locator("#downloads summary").click();
    const csvPromise = page.waitForEvent("download");
    await page.locator("#export-csv").click();
    const csv = await readDownload(await csvPromise);
    check(csv.charCodeAt(0) === 0xfeff && csv.split("\r\n").length === 6, "Excel-compatible CSV with five methods");
    await page.locator("#downloads summary").click();
    const summaryPromise = page.waitForEvent("download");
    await page.locator("#export-summary").click();
    assert.deepEqual(JSON.parse(await readDownload(await summaryPromise)), result.summary); checks++;

    await page.locator("#question-limit").fill("2");
    await page.locator("#question-limit").dispatchEvent("change");
    check(await page.locator("#question-nav button").count() === 2, "Prefix scope navigation");
    const prefixPromise = page.waitForEvent("download");
    await page.locator("#next").click();
    const prefix = JSON.parse(await readDownload(await prefixPromise));
    check(prefix.responses.length === 10 && prefix.meta.export_scope === "1-2", "Prefix export scope");
    await page.locator("#downloads summary").click();
    const draftPromise = page.waitForEvent("download");
    await page.locator("#download-draft").click();
    const draft = JSON.parse(await readDownload(await draftPromise));
    check(Object.keys(draft.answers).length === 250, "Backup retains answers outside current scope");

    await context.clearCookies();
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.locator("#import-file").setInputFiles({ name: "draft.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(draft)) });
    await page.waitForFunction(() => document.querySelector("#question-limit").value === "2");
    check(await page.locator("#evaluator").inputValue() === "rater_test", "Import backup metadata");
    check((await page.locator("#progress-percent").textContent()) === "100%", "Import backup answers");
    await page.locator("#question-limit").fill("50");
    await page.locator("#question-limit").dispatchEvent("change");
    check((await page.locator("#progress-percent").textContent()) === "100%", "Restore hidden scope answers");
    page.on("dialog", (dialog) => dialog.accept());
    const legacy = { evaluator: "legacy_rater", responses: result.responses.slice(0, 5), saved_at: new Date().toISOString() };
    await page.locator("#import-file").setInputFiles({ name: "legacy.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(legacy)) });
    await page.waitForFunction(() => document.querySelector("#evaluator").value === "legacy_rater");
    check((await page.locator("#progress-text").textContent()).includes("5 / 250"), "Legacy draft import");
    await page.locator("#first-incomplete").click();
    check((await page.locator("#question-title").textContent()).includes("第 2 题"), "First missing question navigation");
    await page.locator("#import-file").setInputFiles({ name: "wrong.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify({ ...draft, dataset_id: "different-dataset" })) });
    await page.waitForFunction(() => document.querySelector("#toast").textContent.includes("另一版本"));
    check(await page.locator("#evaluator").inputValue() === "legacy_rater", "Reject mismatched dataset without overwriting answers");
    await page.locator("#import-file").setInputFiles({ name: "summary.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(result.summary)) });
    await page.waitForFunction(() => document.querySelector("#toast").textContent.includes("没有草稿"));
    check((await page.locator("#progress-text").textContent()).includes("5 / 250"), "Reject summary as draft");

    const denied = await browser.newContext();
    await denied.addInitScript(() => { Storage.prototype.setItem = () => { throw new Error("Unavailable"); }; });
    const deniedPage = await denied.newPage();
    await deniedPage.goto(url);
    await deniedPage.locator('[name="1-A-informativeness"][value="1"]').check();
    check((await deniedPage.locator("#save-status").textContent()).includes("不可用"), "Storage failure remains usable and visible");
    const offline = await context.newPage();
    await offline.goto(pathToFileURL(path.join(root, "index.html")).href);
    check(await offline.locator(".candidate").count() === 5, "Offline file loading without fetch or CDN");
    check(requests.every((request) => request.startsWith(url)), "No external network requests during questionnaire use");
    check(errors.length === 0, `No uncaught page errors: ${errors.join(", ")}`);
    console.log(`PASS: ${checks} questionnaire checks (desktop, mobile, all questions, storage, imports, JSON, CSV, offline).`);
  } finally {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
