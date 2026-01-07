import json
from openai import OpenAI
import tiktoken  # ✅ 新增：用于 token 截断计算

# 初始化客户端
client = OpenAI(
    api_key="sk-B5WnXqHtgPj0PDFx6EM8WPEpctUFKRtq4JPArX5Y6aQic5hp",  # ← 这里替换为你的实际 API Key
    base_url="https://www.dmxapi.cn/v1"
)

# 固定的提示模板（⚠️ 与用户提供的完全一致，不做任何改动）
PROMPT_TEMPLATE = """### Task Objective
You are refining a previously generated commit message using comparative and differential learning.Your goal is to improve the clarity, semantic correctness, and stylistic alignment of the final commit message.

You are given:
- Several similar examples, each containing:
    · Code Change
    · Natural-language descriptions of structural changes from the AST Diff
    · First Generated Commit Message (model’s first predicted)
    · Ground-Truth Commit Message (human-written)
    · Commit Message Difference Analysis Results (EditSequence)
- The target commit, including:
    · Code Change
    · Natural-language descriptions of structural changes from the AST Diff
    · First Generated Commit Message

Your goal is to:
1. Learn from how the Ground-Truth Commit Messages differ from the model’s initial attempts(First Generated Commit Messages) — focusing on conciseness, verb choice, abstraction, and correctness.  
2. Understand the wording, semantic and stylistic gaps between generated and ground-truth commit messages using the provided difference analysis results.
3. Apply these learned patterns to refine the target’s first generated commit message, generating a more accurate and stylistically aligned Final Optimized Commit Message.
---

### Input Components
1. Code Change:
The code change is represented using annotated edit blocks:
<DELETE> ... <DELETE_END>
    - Code that existed before but was removed.
<INSERT> ... <INSERT_END>
    - New code added in this version.
<UPDATE_FROM> ... <UPDATE_TO> ... <UPDATE_END>
    - Represents a single replacement operation.
    - The code inside <UPDATE_FROM> is old code.
    - The code inside <UPDATE_TO> is its new updated form.
    - Treat this entire structure as **one atomic transformation**, not two separate code blocks.
    
2. Natural-language descriptions of structural changes from the AST Diff:
High-level bullet natural language descriptions summarizing GumTree AST diff (insert/update/delete/move).
These bullets describe only syntactic transformations and do **not** include semantic intent.
Only use these bullets as supplementary structural cues; infer semantic intent from the Code Change only.

3. **Examples**
Each example includes:
   - Code Change
   - Natural-language descriptions of structural changes from the AST Diff
   - First Generated Commit Message: The model’s first predicted commit message.
   - Ground-Truth Commit Message: The correct human-written commit message.
   - Commit Message Difference Analysis Results, which contain:
      · EditSequence: word-level edit operations showing how the model’s First Generated Commit Message transforms into the Ground-Truth Commit Message.
        This representation marks edits using:
            <UPDATE_FROM>...</UPDATE_FROM> <UPDATE_TO>...</UPDATE_TO> — for substitutions or rewording,
            <INSERT>...</INSERT> — for insertions,
            <DELETE>...</DELETE> — for deletions.
   - The model should interpret this difference analysis results as explicit guidance on how to refine commit messages, learning to emulate the strengths of the Ground-Truth Commit Message while avoiding weaknesses in the First Generated Commit Message.
---

### Rules
1. **Source of intent**
   - Carefully analyze the target code change.
   - Use the "Natural-language descriptions of structural changes from the AST Diff" only as *supplementary cues* for what changed.Infer the **semantic intent** purely from the code change, not from "Natural-language descriptions of structural changes from the AST Diff".
   - "Natural-language descriptions of structural changes from the AST Diff" are structural cues only and must not be used to infer intent or add new behaviors.When in doubt, trust the Code Change over "Natural-language descriptions of structural changes from the AST Diff".
2. **Learning from examples**
   - Compare each example’s First Generated Commit Message with its Ground-Truth Commit Message using the provided difference analysis results.
   - Focus on how the ground-truth commit message improves clarity, action verb precision, abstraction, and conciseness.
   - Leverage the EditSequence to understand whether changes involve rewording, intent shifts, or scope adjustments.
   - Do not include detailed class names, method names, or implementation details unless strictly necessary.
3. **Refine the target commit message**
   - Start from the target’s First Generated Commit Message.
   - Adjust it to match the style, precision, and abstraction of the ground-truth examples.
   - If the first commit message is too verbose, overly detailed, or unclear, rewrite it concisely and purposefully.
   - Preserve factual correctness (e.g., version numbers, dependencies, affected modules) based on the code change context.
4. **Output format**
   - Output **only** the final optimized commit message.
   - Use imperative verbs (Add, Remove, Fix, Update, Refactor, Bump, Improve, etc.).
   - Keep it **concise and professional**.
   - Do **not** output explanations, reasoning, or additional text.
---

### Examples (ordered by similarity low → high).
{examples}

### Target commit (the model should generate one final optimized commit message for this target)
Code Change:
{target_code_change}

Natural-language descriptions of structural changes from the AST Diff:
{target_astnl}

First Generated Commit Message: 
{First_Generated_Commit_Message}

Final Optimized Commit Message: """


# ----------------- tiktoken 工具 -----------------
def get_encoding_for_model(model_name: str = "gpt-3.5-turbo"):
    try:
        return tiktoken.encoding_for_model(model_name)
    except Exception:
        return tiktoken.get_encoding("cl100k_base")


ENCODING_MODEL_NAME = "gpt-3.5-turbo"
encoding = get_encoding_for_model(ENCODING_MODEL_NAME)

MAX_MODEL_TOKENS = 12000
SAFETY_MARGIN = 84


def num_tokens_from_messages(messages, model: str = ENCODING_MODEL_NAME) -> int:
    if model.startswith("gpt-3.5") or model.startswith("gpt-4"):
        tokens_per_message = 4
        tokens_per_name = -1
    else:
        tokens_per_message = 3
        tokens_per_name = 0

    num_tokens = 0
    for message in messages:
        num_tokens += tokens_per_message
        for k, v in message.items():
            num_tokens += len(encoding.encode(str(v), disallowed_special=()))
            if k == "name":
                num_tokens += tokens_per_name
    num_tokens += 3
    return num_tokens


# ----------------- 截断逻辑 -----------------
def build_examples_with_truncation_like_source(
    examples_data,
    target_code_change,
    target_astnl,
    model_for_encoding: str = ENCODING_MODEL_NAME,
    debug_idx=None
):
    examples = examples_data or []
    few_shot = len(examples)
    if few_shot == 0:
        return ""

    # 1️⃣ 占位 tokens（不带 code change）
    placeholder_blocks = []
    for i, ex in enumerate(examples, start=1):
        block = (
            f"---Example {i}---\n"
            f"Code Change:\n\n"
            f"Natural-language descriptions of structural changes from the AST Diff:\n{ex.get('astnl','')}\n"
            f"First Generated Commit Message:\n{ex.get('first_msg','')}\n"
            f"Ground-Truth Commit Message:\n{ex.get('msg','')}\n"
            f"Commit Message Difference Analysis Results:\nEditSequence:\n{ex.get('EditSequence','')}\n\n"
        )
        placeholder_blocks.append(block)
    placeholder_examples_text = "".join(placeholder_blocks)

    prompt_with_empty_code = PROMPT_TEMPLATE.format(
        examples=placeholder_examples_text,
        target_code_change=target_code_change,
        target_astnl=target_astnl,
        First_Generated_Commit_Message=""
    )
    used_tokens = num_tokens_from_messages(
        [{"role": "user", "content": prompt_with_empty_code}],
        model_for_encoding
    )

    # 2️⃣ 拼完整 examples，测 token
    full_blocks = []
    for i, ex in enumerate(examples, start=1):
        block = (
            f"---Example {i}---\n"
            f"Code Change:\n{ex.get('code_change_edit','')}\n"
            f"Natural-language descriptions of structural changes from the AST Diff:\n{ex.get('astnl','')}\n"
            f"First Generated Commit Message:\n{ex.get('first_msg','')}\n"
            f"Ground-Truth Commit Message:\n{ex.get('msg','')}\n"
            f"Commit Message Difference Analysis Results:\nEditSequence:\n{ex.get('EditSequence','')}\n\n"
        )
        full_blocks.append(block)
    final_examples_text = "".join(full_blocks)

    full_prompt = PROMPT_TEMPLATE.format(
        examples=final_examples_text,
        target_code_change=target_code_change,
        target_astnl=target_astnl,
        First_Generated_Commit_Message=""
    )
    final_tokens = num_tokens_from_messages(
        [{"role": "user", "content": full_prompt}],
        model_for_encoding
    )

    # ✅ 不超限
    if final_tokens + SAFETY_MARGIN <= MAX_MODEL_TOKENS:
        print(f"[Line {debug_idx}] 占位 tokens={used_tokens}, 完整 tokens={final_tokens}, 未触发截断")
        return final_examples_text

    # 3️⃣ 超长 -> 平均分配截断
    remaining = MAX_MODEL_TOKENS - SAFETY_MARGIN - used_tokens
    per_example_tokens = max(0, remaining // few_shot)

    truncated_blocks = []
    for i, ex in enumerate(examples, start=1):
        code_full = ex.get("code_change_edit", "")
        truncated_code = encoding.decode(
            encoding.encode(code_full, disallowed_special=())[:per_example_tokens]
        ) if per_example_tokens > 0 else ""
        block = (
            f"---Example {i}---\n"
            f"Code Change:\n{truncated_code}\n"
            f"Natural-language descriptions of structural changes from the AST Diff:\n{ex.get('astnl','')}\n"
            f"First Generated Commit Message:\n{ex.get('first_msg','')}\n"
            f"Ground-Truth Commit Message:\n{ex.get('msg','')}\n"
            f"Commit Message Difference Analysis Results:\nEditSequence:\n{ex.get('EditSequence','')}\n\n"
        )
        truncated_blocks.append(block)
    final_examples_text = "".join(truncated_blocks)

    final_prompt = PROMPT_TEMPLATE.format(
        examples=final_examples_text,
        target_code_change=target_code_change,
        target_astnl=target_astnl,
        First_Generated_Commit_Message=""
    )
    truncated_tokens = num_tokens_from_messages(
        [{"role": "user", "content": final_prompt}],
        model_for_encoding
    )

    print(f"[Line {debug_idx}] 占位 tokens={used_tokens}, 分配={per_example_tokens}/例, 截断后 tokens={truncated_tokens}, 触发截断")
    return final_examples_text


# ----------------- 主流程 -----------------
def main():
    input_file = "test_with_jaccard_top16_new_gpt5_with_msg_3.5turbo.jsonl"
    output_file = "result/result_final_3.5turbo_new.jsonl"

    results = []

    with open(input_file, "r", encoding="utf-8") as f:
        data = [json.loads(line.strip()) for line in f]

    for idx, data_item in enumerate(data, start=1):
        # ✅ 替换为带截断逻辑的构造函数
        examples_text = build_examples_with_truncation_like_source(
            data_item.get("examples", []),
            data_item.get("code_change_edit", ""),
            data_item.get("astnl", ""),
            model_for_encoding=ENCODING_MODEL_NAME,
            debug_idx=idx
        )

        target_code_change = data_item.get("code_change_edit", "")
        target_astnl = data_item.get("astnl", "")
        first_msg = data_item.get("first_msg", "")

        prompt = PROMPT_TEMPLATE.format(
            examples=examples_text,
            target_code_change=target_code_change,
            target_astnl=target_astnl,
            First_Generated_Commit_Message=first_msg
        )

        # print(prompt)
        print(f"🟢 正在处理第 {idx} 条数据...")

        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo-1106",
                messages=[{"role": "user", "content": prompt}],
                temperature=0,
                seed=42
            )
            optimized_msg = response.choices[0].message.content.strip()
        except Exception as e:
            print(f"❌ 第 {idx} 条生成失败: {e}")
            optimized_msg = ""

        result_item = {
            "commit_id": data_item.get("commit_id"),
            "first_msg": first_msg,
            "pred_msg": optimized_msg,
            "gold_msg": data_item.get("msg", "")
        }
        results.append(result_item)

        print(f"✅ 完成第 {idx} 条")
        print(f"First: {first_msg}")
        print(f"Optimized: {optimized_msg}")
        print("=" * 100)

    with open(output_file, "w", encoding="utf-8") as out_f:
        for item in results:
            out_f.write(json.dumps(item, ensure_ascii=False) + "\n")

    print(f"🎉 已处理数据，结果已保存至: {output_file}")


if __name__ == "__main__":
    main()
