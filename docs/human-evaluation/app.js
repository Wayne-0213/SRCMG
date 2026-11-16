/* Browser-local questionnaire. No requests, telemetry, or automatic submission. */
(() => {
  "use strict";
  const dataset = window.SRCMG_EVALUATION;
  const $ = (id) => document.getElementById(id);
  if (!dataset?.questions?.length) { $("fatal-error").hidden = false; return; }
  const { questions, meta } = dataset;
  const dimensions = [
    ["informativeness", "信息充分性"],
    ["conciseness", "简洁性"],
    ["expressiveness", "表达性"],
  ];
  const fields = [...dimensions.map(([key]) => key), "acceptance"];
  const storageKey = `srcmg-questionnaire-v1:${meta.dataset_id}`;
  const state = { evaluator: "", limit: questions.length, current: 0, answers: {} };
  let toastTimer;
  let storageAvailable = true;
  const keyOf = (qid, label) => `${qid}:${label}`;
  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const valid = (field, value) => Number.isInteger(value) && (field === "acceptance" ? value === 0 || value === 1 : value >= 1 && value <= 5);
  const answerFor = (q, c) => state.answers[keyOf(q.question_id, c.label)] || {};
  const complete = (answer) => fields.every((field) => valid(field, answer[field]));
  const scopedQuestions = () => questions.slice(0, state.limit);
  const average = (answer) => dimensions.every(([key]) => valid(key, answer[key])) ? Number((dimensions.reduce((sum, [key]) => sum + answer[key], 0) / 3).toFixed(4)) : null;

  function toast(message) {
    clearTimeout(toastTimer);
    $("toast").textContent = message;
    $("toast").hidden = false;
    toastTimer = setTimeout(() => { $("toast").hidden = true; }, 6500);
  }

  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ ...state, dataset_id: meta.dataset_id, saved_at: new Date().toISOString() }));
      $("save-status").textContent = "进度已自动保存到此浏览器";
      storageAvailable = true;
    } catch {
      $("save-status").textContent = "本地保存不可用，请下载草稿备份";
      if (storageAvailable) toast("浏览器本地存储不可用。离开页面前请通过“下载与备份”下载草稿。");
      storageAvailable = false;
    }
  }

  // Validate imports and cached values against the exact questionnaire, including 0 acceptance.
  function parseDraft(draft, requireDataset = false) {
    if (!draft || typeof draft !== "object") throw new Error("不是有效的问卷文件。");
    const datasetId = draft.dataset_id || draft.meta?.dataset_id;
    if ((requireDataset && !datasetId) || (datasetId && datasetId !== meta.dataset_id)) throw new Error("文件属于另一版本问卷，无法导入。");
    const answers = {};
    let matched = 0;
    if (draft.answers && typeof draft.answers === "object" && !Array.isArray(draft.answers)) {
      for (const q of questions) for (const c of q.candidates) {
        const key = keyOf(q.question_id, c.label);
        const row = draft.answers[key];
        if (!row || typeof row !== "object") continue;
        matched++;
        answers[key] = {};
        for (const field of fields) if (valid(field, row[field])) answers[key][field] = row[field];
      }
      // A blank backup is valid, but unknown question keys are not silently accepted.
      if (!matched && Object.keys(draft.answers).length) throw new Error("未找到匹配的题目。");
    } else if (Array.isArray(draft.responses)) {
      for (const row of draft.responses) {
        const q = questions.find((item) => item.question_id === row.question_id);
        const c = q?.candidates.find((item) => item.label === row.candidate_label);
        if (!q || !c || (row.commit_id && row.commit_id !== q.commit_id) || (row.candidate_message !== undefined && row.candidate_message !== c.text)) throw new Error("题目或候选顺序与当前问卷不一致，无法导入。");
        const key = keyOf(q.question_id, c.label);
        if (answers[key]) throw new Error("文件包含重复答案。");
        matched++;
        answers[key] = {};
        for (const field of fields) if (valid(field, row[field])) answers[key][field] = row[field];
      }
      if (!matched) throw new Error("文件中没有可导入的答卷明细。统计文件不能用于恢复作答。");
    } else throw new Error("文件中没有草稿或答卷明细。");
    const evaluator = draft.evaluator ?? draft.meta?.evaluator ?? "";
    const requestedLimit = draft.limit ?? draft.meta?.export_question_limit;
    return {
      answers,
      evaluator: typeof evaluator === "string" ? evaluator.slice(0, 80) : "",
      limit: Number.isInteger(requestedLimit) && requestedLimit >= 1 && requestedLimit <= questions.length ? requestedLimit : questions.length,
      current: Number.isInteger(draft.current) && draft.current >= 0 && draft.current < questions.length ? draft.current : 0,
    };
  }

  function restore() {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      Object.assign(state, parseDraft(JSON.parse(raw), true));
      state.current = Math.min(state.current, state.limit - 1);
      $("save-status").textContent = "已恢复上次填写进度";
    } catch {
      $("save-status").textContent = "草稿无法恢复，可导入备份文件";
      toast("未能恢复本地草稿。你可以继续填写，或导入此前下载的草稿文件。");
    }
  }

  function renderNavigation() {
    $("question-nav").innerHTML = scopedQuestions().map((q, index) => `<button type="button" data-index="${index}" aria-label="第 ${q.question_id} 题">${q.question_id}</button>`).join("");
  }

  function updateProgress() {
    let total = 0, done = 0, completedQuestions = 0;
    scopedQuestions().forEach((q, index) => {
      const count = q.candidates.filter((c) => complete(answerFor(q, c))).length;
      const started = q.candidates.some((c) => fields.some((field) => valid(field, answerFor(q, c)[field])));
      total += q.candidates.length;
      done += count;
      if (count === q.candidates.length) completedQuestions++;
      const button = $("question-nav").children[index];
      button.classList.toggle("complete", count === q.candidates.length);
      button.classList.toggle("partial", started && count !== q.candidates.length);
      button.setAttribute("aria-label", `第 ${q.question_id} 题，${count === q.candidates.length ? "已完成" : started ? "已开始" : "未填写"}`);
      if (index === state.current) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    $("progress").max = total;
    $("progress").value = done;
    $("progress-percent").textContent = `${Math.floor(done / total * 100)}%`;
    $("progress-text").textContent = `已评价 ${done} / ${total} 条消息`;
    $("question-completion").textContent = `已完成 ${completedQuestions} / ${state.limit} 题`;
  }

  function choices(q, c, field, values) {
    const answer = answerFor(q, c);
    return `<div class="choices">${values.map(([value, label]) => `<label class="choice"><input type="radio" name="${q.question_id}-${c.label}-${field}" data-label="${c.label}" data-field="${field}" value="${value}" ${answer[field] === value ? "checked" : ""}><span>${escapeHtml(label)}</span></label>`).join("")}</div>`;
  }

  function renderQuestion(focus = false) {
    const q = questions[state.current];
    const diff = String(q.code_change).split("\n").map((line) => {
      const kind = line.startsWith("+") && !line.startsWith("+++") ? "add" : line.startsWith("-") && !line.startsWith("---") ? "remove" : line.startsWith("@@") ? "hunk" : "";
      return `<span class="diff-line ${kind}">${escapeHtml(line) || " "}</span>`;
    }).join("");
    $("question").innerHTML = `
      <div class="question-heading"><h2 id="question-title">第 ${q.question_id} 题 <span>/ ${state.limit}</span></h2><span class="badge">${escapeHtml(q.language)}</span></div>
      <div class="question-layout">
        <div class="context"><div class="block-heading">代码变更 <span>CODE CHANGE</span></div><div class="diff-panel"><div class="diff-topbar"><span class="code-dot"></span><span>commit ${escapeHtml(q.commit_id)}</span></div><pre class="diff" tabindex="0" aria-label="代码变更，可横向和纵向滚动"><code>${diff}</code></pre></div><div class="block-heading">参考提交消息 <span>REFERENCE</span></div><div class="gold">${escapeHtml(q.gold_msg)}</div><p class="context-note">结合代码变更判断，参考消息不是唯一正确表述。</p></div>
        <div class="candidates"><div class="candidate-intro"><div class="block-heading">候选消息评价</div><span>顺序已打乱 · 方法名隐藏</span></div><p class="scale-note">1–5 分，分数越高越好</p>
          ${q.candidates.map((c) => {
            const avg = average(answerFor(q, c));
            return `<article class="candidate" id="candidate-${c.label}" aria-labelledby="candidate-heading-${c.label}"><div class="candidate-header"><h3 id="candidate-heading-${c.label}"><span class="candidate-label">${escapeHtml(c.label)}</span>候选消息</h3><span class="average" id="average-${c.label}">均分 ${avg === null ? "—" : avg.toFixed(2)}</span></div><p class="message">${escapeHtml(c.text)}</p>
              ${dimensions.map(([field, label]) => `<fieldset class="rating-row"><legend>${label}<span class="sr-only"> · 候选 ${escapeHtml(c.label)}</span></legend>${choices(q, c, field, [1, 2, 3, 4, 5].map((n) => [n, n]))}</fieldset>`).join("")}
              <fieldset class="rating-row acceptance"><legend>是否接受<span class="sr-only"> · 候选 ${escapeHtml(c.label)}</span></legend>${choices(q, c, "acceptance", [[1, "接受"], [0, "不接受"]])}</fieldset></article>`;
          }).join("")}
        </div>
      </div>`;
    $("position").textContent = `${state.current + 1} / ${state.limit}`;
    $("previous").disabled = state.current === 0;
    $("next").textContent = state.current === state.limit - 1 ? "完成并导出 ↓" : "下一题 →";
    updateProgress();
    if (focus) $("question").focus({ preventScroll: true });
  }

  function navigate(index) {
    state.current = Math.max(0, Math.min(index, state.limit - 1));
    renderQuestion(true);
    save();
    $("question").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  }

  function firstMissing() {
    for (let i = 0; i < state.limit; i++) {
      const q = questions[i];
      const candidate = q.candidates.find((c) => !complete(answerFor(q, c)));
      if (candidate) return { index: i, candidate };
    }
    return null;
  }

  function validateComplete() {
    const missing = firstMissing();
    if (!missing) return true;
    navigate(missing.index);
    const card = $(`candidate-${missing.candidate.label}`);
    card.classList.add("invalid");
    const answer = answerFor(questions[missing.index], missing.candidate);
    const field = fields.find((item) => !valid(item, answer[item]));
    card.querySelector(`input[data-field="${field}"]`).focus();
    toast(`第 ${questions[missing.index].question_id} 题的候选 ${missing.candidate.label} 还有未填项。完成本次 ${state.limit} 题后即可导出；中途可下载草稿。`);
    return false;
  }

  function collectResponses() {
    return scopedQuestions().flatMap((q) => q.candidates.map((c) => {
      const answer = answerFor(q, c);
      return {
        question_id: q.question_id, language: q.language, commit_id: q.commit_id,
        candidate_label: c.label, method: c.method, candidate_message: c.text, gold_msg: q.gold_msg,
        ...Object.fromEntries(dimensions.map(([field]) => [field, valid(field, answer[field]) ? answer[field] : null])),
        average_score: average(answer), acceptance: valid("acceptance", answer.acceptance) ? answer.acceptance : null,
      };
    }));
  }

  function computeSummary(responses) {
    const methods = [...new Set(responses.map((row) => row.method))];
    const by_method = methods.map((method) => {
      const rows = responses.filter((row) => row.method === method && complete(row));
      const mean = (field) => rows.length ? Number((rows.reduce((sum, row) => sum + row[field], 0) / rows.length).toFixed(4)) : null;
      return { method, evaluated_count: rows.length, mean_informativeness: mean("informativeness"), mean_conciseness: mean("conciseness"), mean_expressiveness: mean("expressiveness"), mean_overall: mean("average_score"), acceptance_rate: mean("acceptance") };
    }).sort((a, b) => (b.mean_overall ?? -1) - (a.mean_overall ?? -1));
    const completed = responses.filter(complete).length;
    return {
      overall: { total_candidate_items: responses.length, completed_candidate_items: completed, completion_rate: responses.length ? Number((completed / responses.length).toFixed(4)) : 0 },
      by_method,
      by_question: scopedQuestions().map((q) => ({ question_id: q.question_id, items: responses.filter((row) => row.question_id === q.question_id) })),
    };
  }

  function payload() {
    const responses = collectResponses();
    return {
      meta: { ...meta, evaluator: state.evaluator, exported_at: new Date().toISOString(), export_question_limit: state.limit === questions.length ? null : state.limit, export_scope: state.limit === questions.length ? "all" : `1-${state.limit}`, questionnaire_version: 1 },
      summary: computeSummary(responses), responses,
    };
  }

  function download(filename, content, mime) {
    const url = URL.createObjectURL(new Blob([content], { type: mime }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $("downloads").open = false;
  }

  function exportResults(kind) {
    if (!validateComplete()) return;
    const result = payload();
    const scope = state.limit === questions.length ? "all" : `q1-${state.limit}`;
    if (kind === "csv") {
      const headers = ["method", "evaluated_count", "mean_informativeness", "mean_conciseness", "mean_expressiveness", "mean_overall", "acceptance_rate"];
      const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
      const lines = [headers, ...result.summary.by_method.map((row) => headers.map((key) => row[key]))];
      download(`evaluation_summary_${scope}_${Date.now()}.csv`, "\uFEFF" + lines.map((row) => row.map(csvCell).join(",")).join("\r\n"), "text/csv;charset=utf-8");
    } else {
      const summary = kind === "summary";
      download(`evaluation_${summary ? "summary" : "results"}_${scope}_${Date.now()}.json`, JSON.stringify(summary ? result.summary : result, null, 2), "application/json;charset=utf-8");
    }
    toast("已生成下载文件。请将明细 JSON 交回研究组织者；答案不会自动上传。");
  }

  restore();
  $("evaluator").value = state.evaluator;
  $("question-limit").max = questions.length;
  $("question-limit").value = state.limit;
  $("total-questions").textContent = questions.length;
  $("total-candidates").textContent = questions.reduce((sum, q) => sum + q.candidates.length, 0);
  renderNavigation();
  renderQuestion();

  $("question").addEventListener("change", (event) => {
    const input = event.target;
    if (!input.matches("input[type=radio][data-field]")) return;
    const q = questions[state.current];
    const c = q.candidates.find((item) => item.label === input.dataset.label);
    const field = input.dataset.field, value = Number(input.value);
    if (!c || !fields.includes(field) || !valid(field, value)) return;
    const key = keyOf(q.question_id, c.label);
    state.answers[key] ||= {};
    state.answers[key][field] = value;
    const avg = average(state.answers[key]);
    $(`average-${c.label}`).textContent = `均分 ${avg === null ? "—" : avg.toFixed(2)}`;
    $(`candidate-${c.label}`).classList.remove("invalid");
    updateProgress();
    save();
  });
  $("evaluator").addEventListener("input", () => { state.evaluator = $("evaluator").value; save(); });
  $("question-limit").addEventListener("change", () => {
    const value = Number($("question-limit").value);
    if (!Number.isInteger(value) || value < 1 || value > questions.length) {
      $("question-limit").value = state.limit;
      toast(`评价题数需为 1–${questions.length} 之间的整数。`);
      return;
    }
    state.limit = value;
    state.current = Math.min(state.current, value - 1);
    renderNavigation(); renderQuestion(); save();
    toast(`本次评价前 ${value} 题。范围以外的已填答案仍保留在草稿中。`);
  });
  $("question-nav").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-index]");
    if (button) navigate(Number(button.dataset.index));
  });
  $("previous").addEventListener("click", () => navigate(state.current - 1));
  $("next").addEventListener("click", () => state.current < state.limit - 1 ? navigate(state.current + 1) : exportResults("detail"));
  $("first-incomplete").addEventListener("click", () => {
    const missing = firstMissing();
    if (missing) navigate(missing.index);
    else toast("本次所有题目已完成，可以导出结果。");
  });
  $("export-detail").addEventListener("click", () => exportResults("detail"));
  $("export-csv").addEventListener("click", () => exportResults("csv"));
  $("export-summary").addEventListener("click", () => exportResults("summary"));
  $("download-draft").addEventListener("click", () => {
    download(`evaluation_draft_${Date.now()}.json`, JSON.stringify({ ...state, dataset_id: meta.dataset_id, saved_at: new Date().toISOString(), responses: collectResponses() }, null, 2), "application/json;charset=utf-8");
    toast("草稿已生成下载文件，可在其他浏览器通过“导入草稿”继续填写。");
  });
  $("import-draft").addEventListener("click", () => $("import-file").click());
  $("import-file").addEventListener("change", async () => {
    const file = $("import-file").files[0];
    if (!file) return;
    try {
      if (file.size > 10 * 1024 * 1024) throw new Error("文件过大，请选择小于 10 MB 的问卷 JSON 文件。");
      const restored = parseDraft(JSON.parse((await file.text()).replace(/^\uFEFF/, "")));
      if (Object.keys(state.answers).length && !window.confirm("导入将替换此浏览器中的当前答案。建议先下载草稿备份。是否继续？")) return;
      Object.assign(state, restored);
      state.current = Math.min(state.current, state.limit - 1);
      $("evaluator").value = state.evaluator;
      $("question-limit").value = state.limit;
      renderNavigation(); renderQuestion(); save();
      $("downloads").open = false;
      toast("已导入作答记录，可以继续填写。");
    } catch (error) { toast(`导入失败：${error instanceof SyntaxError ? "JSON 文件格式错误。" : error.message}`); }
    finally { $("import-file").value = ""; }
  });
})();
