"""
step2_syntax_cpu.py
CPU 环境执行：进行 spaCy + benepar 的句法分析
读取 GPU 输出的文件，并补充差异信息
"""
import json
import textdistance
import spacy
import pandas as pd
from tqdm import tqdm
import diff_match_patch as dmp_module
import benepar
from nltk import Tree
import re

print("🔧 Loading spaCy + benepar...")
nlp = spacy.load("en_core_web_trf")
if "benepar" not in nlp.pipe_names:
    benepar.download('benepar_en3')
    nlp.add_pipe("benepar", config={"model": "benepar_en3"})
print("✅ spaCy and benepar ready.")

dmp = dmp_module.diff_match_patch()

# === constituency phrase extraction (reworked to use parse_string -> nltk.Tree) ===
def extract_vp_np_pp_phrases(text):
    """
    从 benepar 的 parse_string 中按线性顺序提取 VP / NP / PP 短语（每类最多返回前两个）。
    如果 parse_string 无法解析，回退到 sent._.constituents（老接口）提取。
    返回 (vps[:2], nps[:2], pps[:2])
    """
    doc = nlp(text)
    vps, nps, pps = [], [], []

    def add_phrase(lst, phrase):
        # 去重并保留顺序
        if phrase and phrase not in lst:
            lst.append(phrase)

    for sent in doc.sents:
        parse_str = getattr(sent._, "parse_string", None)
        if parse_str:
            try:
                tree = Tree.fromstring(parse_str)
                # 以树中叶子出现的顺序为准，遍历所有子树（preorder）
                for subtree in tree.subtrees():
                    if not isinstance(subtree, Tree):
                        continue
                    lab = subtree.label()
                    if lab == "VP":
                        phrase = " ".join(subtree.leaves()).strip()
                        add_phrase(vps, phrase)
                    elif lab == "NP":
                        phrase = " ".join(subtree.leaves()).strip()
                        add_phrase(nps, phrase)
                    elif lab == "PP":
                        phrase = " ".join(subtree.leaves()).strip()
                        add_phrase(pps, phrase)
                    # 提前终止以节省开销（当每类已满2个时）
                    if len(vps) >= 2 and len(nps) >= 2 and len(pps) >= 2:
                        break
                # 如果已经收集到足够数量，继续到下一个句子
                if len(vps) >= 2 and len(nps) >= 2 and len(pps) >= 2:
                    break
                else:
                    # 继续处理下一句
                    continue
            except Exception:
                # 解析失败则回退到下面的替代方法
                pass

        # 回退：如果没有 parse_string 或解析失败，尝试使用 sent._.constituents（旧接口）
        if hasattr(sent._, "constituents"):
            try:
                for subtree in sent._.constituents:
                    # subtree 可能是 benepar Span-like object; 尝试读取 label 属性或方法
                    label = None
                    # benepar 的 subtree 可能有 .label 或 .label_ / ._.label 等不同接口，尝试兼容
                    if hasattr(subtree, "label"):
                        try:
                            label = subtree.label
                        except Exception:
                            label = None
                    if label is None and hasattr(subtree, "_") and hasattr(subtree._, "label"):
                        label = subtree._.label
                    if label is None and hasattr(subtree, "label_"):
                        label = subtree.label_
                    # 取出短语文本（尝试按 token 遍历）
                    try:
                        phrase = " ".join([tok.text for tok in subtree])
                    except Exception:
                        # 最后回退到 str(subtree)
                        phrase = str(subtree)
                    if not label:
                        continue
                    if label == "VP":
                        add_phrase(vps, phrase.strip())
                    elif label == "NP":
                        add_phrase(nps, phrase.strip())
                    elif label == "PP":
                        add_phrase(pps, phrase.strip())
                    if len(vps) >= 2 and len(nps) >= 2 and len(pps) >= 2:
                        break
            except Exception:
                # 忽略回退提取中的任何错误
                pass

    return vps[:2], nps[:2], pps[:2]

# === verb extraction (improved) ===
def find_first_verb(tree: Tree):
    """递归在整棵树中寻找第一个动词"""
    for subtree in tree:
        if isinstance(subtree, Tree):
            if subtree.label().startswith("VB"):
                leaves = subtree.leaves()
                if leaves:  # ✅ 关键修复：防止空列表访问
                    return leaves[0].lower()
                else:
                    continue
            result = find_first_verb(subtree)
            if result:
                return result
    return None

def extract_main_verb(text):
    """严格取第一个实际动词（优先：benepar parse tree 中第一个 VB*（同时考虑原始/cleaned 两种树）-> spaCy tag_ -> dependency），
    保留你的清理/commit_prefix/辅助动词过滤逻辑。"""
    if not text or not text.strip():
        return None

    # 保存 commit type 前缀（备用）
    prefix_match = re.match(r'^([a-zA-Z]+):\s*', text)
    commit_prefix = prefix_match.group(1).lower() if prefix_match else None

    # 保留原始用于生成 parse tree 的文本（不要让首字母小写干扰 parse tree）
    original_for_tree = text.strip()

    # 对用于后续 token/依存分析的文本做清理与首字母小写修正
    cleaned = re.sub(r'^\[.*?\]\s*', '', text.strip())   # 去掉 [xxx]
    cleaned = re.sub(r'^[a-zA-Z]+:\s*', '', cleaned)     # 去掉 type:
    if cleaned and cleaned[0].isupper():                 # 修正首词大写便于后续 tag_/dep
        cleaned = cleaned[0].lower() + cleaned[1:]

    # spaCy 文档（cleaned 用于 tag_/dep 回退）
    doc_clean = nlp(cleaned)

    auxiliary_verbs = {
        "be","am","is","are","was","were","been","being",
        "do","does","did","done","have","has","had","having",
        "will","would","should","can","could","may","might","must","shall","to"
    }

    # --------------------------
    # STEP 1: 同时用原始文本与 cleaned 文本的 benepar parse_string 搜索第一个 VB*
    # - 从两棵树分别提取第一个 VB*（通过 find_first_verb）
    # - 若两边都找到，则用 cleaned 句子中先出现的那个（按 token 顺序）
    # --------------------------
    candidates = []  # list of tuples (verb_lower, token_index_in_cleaned_sentence)

    # 尝试原始文本生成的 parse trees
    try:
        doc_orig = nlp(original_for_tree)
    except Exception:
        doc_orig = None

    # 准备对应 cleaned doc（已经有 doc_clean）
    # 对齐句子时，用 zip 保证同一序号的句子比对（若句子数不一致，将以短的为准）
    if doc_orig is not None:
        for sent_orig, sent_clean in zip(list(doc_orig.sents), list(doc_clean.sents)):
            parse_str = getattr(sent_orig._, "parse_string", None)
            if not parse_str:
                continue
            try:
                tree = Tree.fromstring(parse_str)
            except Exception:
                continue
            main_v = find_first_verb(tree)  # 递归查找第一个 VB*
            if main_v:
                mv = main_v.lower()
                if mv not in auxiliary_verbs:
                    # 找到在 cleaned 句子里的索引（尽量匹配单词）
                    idx = None
                    for i, tok in enumerate(sent_clean):
                        if tok.text.lower() == mv:
                            idx = i
                            break
                    # 若未在 cleaned tokens 中直接匹配（可能标点/形式差异），放到大索引后面
                    if idx is None:
                        idx = 9999
                    candidates.append((mv, idx))

    # 也尝试用 cleaned 文本自身生成 parse trees（以防原始/cleaned 两者会返回不同结果）
    for sent_clean in doc_clean.sents:
        parse_str = getattr(sent_clean._, "parse_string", None)
        if not parse_str:
            continue
        try:
            tree = Tree.fromstring(parse_str)
        except Exception:
            continue
        main_v = find_first_verb(tree)
        if main_v:
            mv = main_v.lower()
            if mv not in auxiliary_verbs:
                # 找索引（必然能在 cleaned 中匹配）
                idx = None
                for i, tok in enumerate(sent_clean):
                    if tok.text.lower() == mv:
                        idx = i
                        break
                if idx is None:
                    idx = 9999
                candidates.append((mv, idx))

    # 如果找到了候选动词，按在 cleaned 中出现的位置排序并返回最早的
    if candidates:
        # 去重同时保留最小索引
        best = {}
        for v, ix in candidates:
            if v not in best or ix < best[v]:
                best[v] = ix
        sorted_cands = sorted(best.items(), key=lambda x: x[1])
        chosen = sorted_cands[0][0]
        print(f"✅ Main verb (from benepar parse_string first (VB ...)): {chosen}")
        return chosen

    # --------------------------
    # STEP 2: spaCy token.tag_（线性），作为次优选（保留你原来的行为）
    # --------------------------
    for sent in doc_clean.sents:
        for token in sent:
            if getattr(token, "tag_", "").startswith("VB"):
                lem = token.lemma_.lower()
                if lem not in auxiliary_verbs:
                    print(f"✅ Main verb (from spaCy token.tag_ VB*): {lem}")
                    return lem
                # 遇到助动词则跳过，继续寻找

    # --------------------------
    # STEP 3: 依存回退：第一个 pos_ == VERB（排除助动词）
    # --------------------------
    for token in doc_clean:
        if token.pos_ == "VERB":
            lem = token.lemma_.lower()
            if lem not in auxiliary_verbs:
                print(f"✅ Main verb (from dependency first VERB): {lem}")
                return lem

    # --------------------------
    # STEP 4: commit 前缀
    # --------------------------
    if commit_prefix:
        print(f"✅ Main verb (from commit prefix): {commit_prefix}")
        return commit_prefix

    # --------------------------
    # STEP 5: heuristic fallback
    # --------------------------
    for w in cleaned.split():
        if w.isalpha():
            print(f"✅ Main verb (from heuristic): {w.lower()}")
            return w.lower()

    print("⚠️ No verb found.")
    return None


# === diff and comparison ===
def compare_phrases(first_list, gold_list):
    if not first_list and not gold_list:
        return "None"
    first_set, gold_set = set(first_list), set(gold_list)
    added, removed = gold_set - first_set, first_set - gold_set
    parts = []
    if removed: parts.append(f"Removed: {list(removed)}")
    if added: parts.append(f"Added: {list(added)}")
    return " | ".join(parts) if parts else "No major change"

def pretty_token_diff(first, gold):
    diffs = dmp.diff_main(first, gold)
    dmp.diff_cleanupSemantic(diffs)
    added, removed, pairs = [], [], []
    for op, txt in diffs:
        if op == 1: added.append(txt.strip())
        elif op == -1: removed.append(txt.strip())
    for i in range(min(len(added), len(removed))):
        pairs.append(f'"{removed[i]}" → "{added[i]}"')
    if len(added) > len(removed):
        pairs.append(f"Added only: {added[len(removed):]}")
    elif len(removed) > len(added):
        pairs.append(f"Removed only: {removed[len(added):]}")
    return " | ".join(pairs) if pairs else "No major token change"

def summarize_diff(sim_score, edit_dist, verb_diff, vp_diff):
    if sim_score is None:
        return "No embedding info."
    if sim_score > 0.85:
        return f"Mostly similar; gold adds detail or minor rephrasing. EditDist={edit_dist}, Sim={sim_score:.2f}"
    elif sim_score > 0.6:
        return f"Partially similar; abstraction or structure differs. VerbDiff={verb_diff}, VP_Diff={vp_diff}, Sim={sim_score:.2f}"
    else:
        return f"Low similarity; likely intent or scope mismatch. VerbDiff={verb_diff}, VP_Diff={vp_diff}, Sim={sim_score:.2f}"

# === new: semantic natural-language summarization ===
def generate_semantic_summary(verb_diff, vp_diff, pp_diff, token_diff, sim_score):
    """
    生成自然语言语义总结，用于 LLM 提示模板
    """
    summary_parts = []

    # 1️⃣ 相似度层
    if sim_score is not None:
        if sim_score > 0.85:
            summary_parts.append("The model's first generated commit message closely aligns with the ground-truth commit message, differing only in minor phrasing or formatting. ")
        elif sim_score > 0.6:
            summary_parts.append("The model's first generated commit message expresses a similar overall intent as the ground-truth commit message, but differs in the level of abstraction, detail, or specificity. ")
        else:
            summary_parts.append("The model's first generated commit message diverges significantly from the ground-truth commit message in meaning or focus.")

    # 2️⃣ 动词差异层
    if "→" in verb_diff:
        left, right = [v.strip() for v in verb_diff.split("→")]
        if left == right or (left and right and left.lower() == right.lower()):
            summary_parts.append("Both commit messages use the same main verb.")
        elif not right or right == "None":
            summary_parts.append(f"The main verb '{left}' (first generated) missing or unclear in ground-truth commit message.")
        elif not left or left == "None":
            summary_parts.append(f"The ground-truth commit message introduces the verb '{right}', missing in the model first generated commit message.")
        else:
            summary_parts.append(f"The ground-truth commit message changes the main verb from '{left}' (model first generated) to '{right}' (ground-truth).")

    # 3️⃣ 短语结构层
    if "Added" in vp_diff or "Added" in pp_diff:
        summary_parts.append("Ground-Truth commit message adds more detail or context phrases.")
    if "Removed" in vp_diff or "Removed" in pp_diff:
        summary_parts.append("Ground-Truth commit message removes some descriptive or contextual elements.")
    if "No major" in vp_diff and "No major" in pp_diff:
        summary_parts.append("Overall sentence structure remains consistent between the two commit messages.")

    # 4️⃣ token-level clues
    # if "→" in token_diff:
    #     summary_parts.append("Token-level changes reflect rewording rather than meaning change.")

    # 合并为自然语言段落
    return " ".join(summary_parts).strip()

def generate_verb_summary(verb_diff, vp_diff, pp_diff, token_diff, sim_score):
    """
    生成自然语言语义总结，用于 LLM 提示模板
    """
    summary_parts = []

    # # 1️⃣ 相似度层
    # if sim_score is not None:
    #     if sim_score > 0.85:
    #         summary_parts.append("The model's first generated commit message closely aligns with the ground-truth commit message, differing only in minor phrasing or formatting. ")
    #     elif sim_score > 0.6:
    #         summary_parts.append("The model's first generated commit message expresses a similar overall intent as the ground-truth commit message, but differs in the level of abstraction, detail, or specificity. ")
    #     else:
    #         summary_parts.append("The model's first generated commit message diverges significantly from the ground-truth commit message in meaning or focus.")

    # 2️⃣ 动词差异层
    if "→" in verb_diff:
        left, right = [v.strip() for v in verb_diff.split("→")]
        if left == right or (left and right and left.lower() == right.lower()):
            summary_parts.append("Both commit messages use the same main verb.")
        elif not right or right == "None":
            summary_parts.append(f"The main verb '{left}' (first generated) missing or unclear in ground-truth commit message.")
        elif not left or left == "None":
            summary_parts.append(f"The ground-truth commit message introduces the verb '{right}', missing in the model first generated commit message.")
        else:
            summary_parts.append(f"The ground-truth commit message changes the main verb from '{left}' (model first generated) to '{right}' (ground-truth).")
    if "same:" in verb_diff:
        summary_parts.append("Both commit messages use the same main verb.")

    # # 3️⃣ 短语结构层
    # if "Added" in vp_diff or "Added" in pp_diff:
    #     summary_parts.append("Ground-Truth commit message adds more detail or context phrases.")
    # if "Removed" in vp_diff or "Removed" in pp_diff:
    #     summary_parts.append("Ground-Truth commit message removes some descriptive or contextual elements.")
    # if "No major" in vp_diff and "No major" in pp_diff:
    #     summary_parts.append("Overall sentence structure remains consistent between the two commit messages.")

    # 4️⃣ token-level clues
    # if "→" in token_diff:
    #     summary_parts.append("Token-level changes reflect rewording rather than meaning change.")

    # 合并为自然语言段落
    return " ".join(summary_parts).strip()

import re
import difflib

def tag_edit_sequence(first: str, gold: str) -> str:
    """
    单词级对齐，但在输出时直接用原始字符串的字符片段（保持原始间隔/标点），
    输出标签使用：
      <UPDATE_FROM>...</UPDATE_FROM><UPDATE_TO>...</UPDATE_TO>
      <INSERT>...</INSERT_END>
      <DEL>...</DEL_END>
    """

    # tokenization but keep spans in original strings
    token_re = re.compile(r"\w+|[^\w\s]", re.UNICODE)

    def tokens_with_spans(s):
        tokens = []
        for m in token_re.finditer(s):
            tokens.append((m.group(0), m.start(), m.end()))
        return tokens

    first_toks = tokens_with_spans(first)
    gold_toks = tokens_with_spans(gold)

    first_texts = [t for t, a, b in first_toks]
    gold_texts = [t for t, a, b in gold_toks]

    matcher = difflib.SequenceMatcher(None, first_texts, gold_texts)
    opcodes = matcher.get_opcodes()

    out_parts = []
    pos = 0  # pointer into original 'first' string for preserving gaps

    for tag, i1, i2, j1, j2 in opcodes:
        if tag == "equal":
            if i1 >= i2:
                continue
            start_char = first_toks[i1][1]
            end_char = first_toks[i2 - 1][2]
            # append any text between current pos and this segment start (preserve spaces/newlines)
            if pos < start_char:
                out_parts.append(first[pos:start_char])
            # append exact original equal segment
            out_parts.append(first[start_char:end_char])
            pos = end_char

        elif tag == "replace":
            # from first: i1..i2-1, to gold: j1..j2-1
            if i1 < i2:
                start_char = first_toks[i1][1]
                end_char = first_toks[i2 - 1][2]
                if pos < start_char:
                    out_parts.append(first[pos:start_char])
                from_sub = first[start_char:end_char]
                pos = end_char
            else:
                # no from-sub in first (should behave like insert) -> preserve pos
                from_sub = ""

            if j1 < j2:
                g_start = gold_toks[j1][1]
                g_end = gold_toks[j2 - 1][2]
                to_sub = gold[g_start:g_end]
            else:
                to_sub = ""

            # append tags (no extra spaces injected; spacing is preserved by the previous appended slice)
            out_parts.append(f"<UPDATE_FROM>{from_sub}</UPDATE_FROM><UPDATE_TO>{to_sub}</UPDATE_TO>")

        elif tag == "delete":
            # remove a span from first
            if i1 < i2:
                start_char = first_toks[i1][1]
                end_char = first_toks[i2 - 1][2]
                if pos < start_char:
                    out_parts.append(first[pos:start_char])
                del_sub = first[start_char:end_char]
                pos = end_char
                out_parts.append(f"<DELETE>{del_sub}</DELETE>")

        elif tag == "insert":
            # insert a span from gold; no advancement in pos in first
            if j1 < j2:
                g_start = gold_toks[j1][1]
                g_end = gold_toks[j2 - 1][2]
                ins_sub = gold[g_start:g_end]
            else:
                ins_sub = ""
            # we should preserve spaces between pos and the next token start in first;
            # since insertion has no start_char in 'first', we simply append at current pos
            out_parts.append(f"<INSERT>{ins_sub}</INSERT>")

    # append remainder of original
    if pos < len(first):
        out_parts.append(first[pos:])

    # join parts directly (we preserved all inter-token whitespace from original 'first')
    return "".join(out_parts)


# === main analysis ===
def analyze_jsonl(input_path, output_path):
    data = []
    with open(input_path, "r", encoding="utf-8") as f:
        for line in f:
            try:
                data.append(json.loads(line))
            except:
                continue

    print(f"📂 Loaded {len(data)} samples from {input_path}")
    print("🧩 Starting detailed diff comparison with syntax trees...\n")

    results = []
    total = len(data)

    for idx, item in enumerate(data, 1):
        first_msg = item.get("first_msg", "").strip()
        gold_msg = item.get("gold_msg", "").strip()
        sim_score = item.get("Similarity")
        edit_dist = item.get("EditDistance")

        # === 解析两个句子 ===
        doc_first = nlp(first_msg)
        doc_gold = nlp(gold_msg)

        # 获取句法树文本
        first_tree = ""
        gold_tree = ""
        if len(list(doc_first.sents)) > 0 and hasattr(list(doc_first.sents)[0]._, "parse_string"):
            first_tree = list(doc_first.sents)[0]._.parse_string
        if len(list(doc_gold.sents)) > 0 and hasattr(list(doc_gold.sents)[0]._, "parse_string"):
            gold_tree = list(doc_gold.sents)[0]._.parse_string

        # 提取动词、短语、差异
        v1, v2 = extract_main_verb(first_msg), extract_main_verb(gold_msg)
        verb_diff = f"{v1} → {v2}" if v1 != v2 else v1 or "None"

        vps1, nps1, pps1 = extract_vp_np_pp_phrases(first_msg)
        vps2, nps2, pps2 = extract_vp_np_pp_phrases(gold_msg)
        vp_diff = compare_phrases(vps1, vps2)
        pp_diff = compare_phrases(pps1, pps2)
        token_diff = pretty_token_diff(first_msg, gold_msg)
        summary = summarize_diff(sim_score, edit_dist, verb_diff, vp_diff)
        semantic_summary = generate_semantic_summary(verb_diff, vp_diff, pp_diff, token_diff, sim_score)

        # === 打印结构化输出 ===
        print("─" * 60)
        print(f"🧾 Pair {idx}/{total}")
        print(f"🟡 FIRST: {first_msg}")
        print(f"🟢 GOLD:  {gold_msg}\n")

        if first_tree:
            print("📘 FIRST Constituency Tree:")
            print(first_tree)
        if gold_tree:
            print("\n📗 GOLD Constituency Tree:")
            print(gold_tree)

        print(f"\n🔤 VerbDiff: {verb_diff}")
        print(f"💬 VP_Diff: {vp_diff}")
        print(f"📦 PP_Diff: {pp_diff}")
        print(f"🔠 TokenDiff: {token_diff}")
        print(f"📊 Similarity: {sim_score} | EditDistance: {edit_dist}")
        print(f"🧩 Summary: {summary}")
        print(f"🧠 SemanticSummary: {semantic_summary}")
        print("─" * 60 + "\n")

        # === 保存结果 ===
        results.append({
            "first_msg": first_msg,
            "gold_msg": gold_msg,
            "EditDistance": edit_dist,
            "VerbDiff": verb_diff,
            "VP_Diff": vp_diff,
            "PP_Diff": pp_diff,
            "Similarity": sim_score,
            "TokenDiff": token_diff,
            "Summary": summary,
            "SemanticSummary": semantic_summary,
            "FirstTree": first_tree,
            "GoldTree": gold_tree
        })

    # === 文件输出 ===
    df = pd.DataFrame(results)
    csv_out = output_path.replace(".jsonl", "_analysis.csv")
    df.to_csv(csv_out, index=False, encoding="utf-8")

    with open(output_path, "w", encoding="utf-8") as f:
        for row in results:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")

    print(f"\n✅ CPU analysis completed!\n  JSONL: {output_path}\n  CSV:   {csv_out}")

if __name__ == "__main__":
    import shutil
    import os

    input_path = "test_with_jaccard_top16_new_gpt5_with_msg_deepseek_NoASTEdit.jsonl"
    backup_path = input_path + ".bak"

    # 备份原文件
    if not os.path.exists(backup_path):
        shutil.copy(input_path, backup_path)
        print(f"📦 Backup created: {backup_path}")
    else:
        print(f"⚠️ Backup already exists: {backup_path}")

    # 读取原文件
    with open(input_path, "r", encoding="utf-8") as f:
        data = [json.loads(line) for line in f]

    print(f"📂 Loaded {len(data)} root samples from {input_path}")

    # 遍历每个样本的 examples
    for i, item in enumerate(data):
        if "examples" not in item:
            continue
        examples = item["examples"]
        print(f"🧩 Processing item {i+1}/{len(data)} with {len(examples)} examples")

        for ex in tqdm(examples, desc=f"Analyzing examples of item {i+1}", leave=False):
            first_msg = ex.get("first_msg", "").strip()
            gold_msg = ex.get("msg", "").strip()  # 注意这里使用 msg 而非 gold_msg
            sim_score = ex.get("Similarity")
            edit_dist = ex.get("EditDistance")

            # === 解析两个句子 ===
            doc_first = nlp(first_msg)
            doc_gold = nlp(gold_msg)

            # 获取句法树文本
            first_tree = ""
            gold_tree = ""
            if len(list(doc_first.sents)) > 0 and hasattr(list(doc_first.sents)[0]._, "parse_string"):
                first_tree = list(doc_first.sents)[0]._.parse_string
            if len(list(doc_gold.sents)) > 0 and hasattr(list(doc_gold.sents)[0]._, "parse_string"):
                gold_tree = list(doc_gold.sents)[0]._.parse_string

            print(f"🟡 FIRST: {first_msg}")
            print(f"🟢 GOLD:  {gold_msg}\n")

            if first_tree:
                print("📘 FIRST Constituency Tree:")
                print(first_tree)
            if gold_tree:
                print("\n📗 GOLD Constituency Tree:")
                print(gold_tree)

            # 解析差异
            v1, v2 = extract_main_verb(first_msg), extract_main_verb(gold_msg)
            if v1 != v2:
                verb_diff = f"{v1 or 'None'} → {v2 or 'None'}"
            else:
                verb_diff = f"same: {v1 or 'None'}"

            vps1, nps1, pps1 = extract_vp_np_pp_phrases(first_msg)
            vps2, nps2, pps2 = extract_vp_np_pp_phrases(gold_msg)
            vp_diff = compare_phrases(vps1, vps2)
            pp_diff = compare_phrases(pps1, pps2)
            token_diff = pretty_token_diff(first_msg, gold_msg)
            edit_sequence = tag_edit_sequence(first_msg, gold_msg)
            print("\nEditSequence:"+ edit_sequence)

            semantic_summary = generate_semantic_summary(
                verb_diff, vp_diff, pp_diff, token_diff, sim_score
            )
            verb_summary = generate_verb_summary(verb_diff, vp_diff, pp_diff, token_diff, sim_score
            )

            # 写回
            ex["VerbDiff"] = verb_diff
            ex["VerbSummary"] = verb_summary
            ex["SemanticSummary"] = semantic_summary
            ex["EditSequence"] = edit_sequence


    # 写回原文件（覆盖）
    with open(input_path, "w", encoding="utf-8") as f:
        for item in data:
            f.write(json.dumps(item, ensure_ascii=False) + "\n")

    print(f"\n✅ All examples processed and saved back to {input_path}")

