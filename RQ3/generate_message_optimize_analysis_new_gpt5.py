import json
from openai import OpenAI

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

# 构造 examples 文本块
def build_examples(examples_data):
    # 取最后 10 个示例（如果不足 10 个则全部保留）
    # examples_data = examples_data[-10:]

    blocks = []
    for i, ex in enumerate(examples_data, start=1):
        block = f"""---Example {i}---
Code Change:
{ex.get('code_change_edit', '')}

Natural-language descriptions of structural changes from the AST Diff:
{ex.get('astnl', '')}

First Generated Commit Message: 
{ex.get('first_msg', '')}

Ground-Truth Commit Message: 
{ex.get('msg', '')}

Commit Message Difference Analysis Results:
EditSequence: 
{ex.get('EditSequence', '')}"""
        blocks.append(block)
    return "\n".join(blocks)


def main():
    input_file = "../test_with_jaccard_top16_new_gpt5_with_msg.jsonl"
    output_file = "result/result_final_new_gpt5_30.jsonl"

    results = []

    with open(input_file, "r", encoding="utf-8") as f:
        data = [json.loads(line.strip()) for line in f]

    # ✅ 只处理前 30 条数据
    data = data[:30]

    for idx, data_item in enumerate(data, start=1):
        examples_text = build_examples(data_item.get("examples", []))
        target_code_change = data_item.get("code_change_edit", "")
        target_astnl = data_item.get("astnl", "")
        first_msg = data_item.get("first_msg", "")

        prompt = PROMPT_TEMPLATE.format(
            examples=examples_text,
            target_code_change=target_code_change,
            target_astnl=target_astnl,
            First_Generated_Commit_Message=first_msg
        )

        print(prompt)

        print(f"🟢 正在处理第 {idx} 条数据...")

        try:
            response = client.chat.completions.create(
                model="gpt-5",
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

    # ✅ 保存结果
    with open(output_file, "w", encoding="utf-8") as out_f:
        for item in results:
            out_f.write(json.dumps(item, ensure_ascii=False) + "\n")

    print(f"🎉 已处理前 30 条数据，结果已保存至: {output_file}")


if __name__ == "__main__":
    main()

