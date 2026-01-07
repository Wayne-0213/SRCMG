import json
from openai import OpenAI

# 初始化 OpenAI 客户端
client = OpenAI(
    api_key="sk-B5WnXqHtgPj0PDFx6EM8WPEpctUFKRtq4JPArX5Y6aQic5hp",
    base_url="https://www.dmxapi.cn/v1"
)

# 文件路径
input_file = "../test_with_jaccard_top16_new_gpt5_with_msg_deepseek.jsonl"
output_file = "test_with_jaccard_top16_new_gpt5_with_msg_deepseek_NoASTEdit.jsonl"
result_file = "result/result_first_NoASTEdit_new_deepseek.jsonl"  # ✅ 新增输出文件

# 提示模板
prompt_template = """Generate a concise commit message that summarizes the content of code changes. Do not write explanations or other words, just reply with the commit message.

### Rule:
1. Carefully analyze the target code change.
2. Generate a **very concise, high-level commit message** that summarizes the semantic intent.
3. Do not include detailed class names, method names, or implementation details unless strictly necessary.
4. Follow the conventions of professional commit messages: use imperative verbs such as Add, Remove, Fix, Update, Refactor, etc.
5. Do not output explanations, reasoning, or formatting other than the final commit message.

--- Target commit (the model should generate one commit message for this target) ---
Code Change:
{target_code_change}

Commit message:
"""

def generate_commit_message(prompt: str) -> str:
    """调用 GPT-5 生成提交消息"""
    try:
        response = client.chat.completions.create(
            model="deepseek-v3.2-exp",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
            seed=42
        )
        msg = response.choices[0].message.content.strip()
        return msg
    except Exception as e:
        print(f"❌ 调用模型失败: {e}")
        return ""

# 读取原始文件
with open(input_file, "r", encoding="utf-8") as f:
    data = [json.loads(line) for line in f]

# ✅ 只处理前 30 条
data = data[:100]

# ✅ 存储原始 msg、commit_id 与生成 first_msg 的结果
results = []

# 遍历每条数据
for idx, item in enumerate(data, 1):
    print(f"🔹 处理第 {idx}/{len(data)} 条数据...")

    target_code_change = item.get("diff", "")
    target_astnl = item.get("astnl", "")
    prompt = prompt_template.format(
        target_code_change=target_code_change,
        target_astnl=target_astnl
    )

    # print(prompt)

    commit_msg = generate_commit_message(prompt)
    item["first_msg"] = commit_msg

    # ✅ 保存 (commit_id, 原始 msg, 新生成 first_msg)
    results.append({
        "commit_id": item.get("commit_id", f"unknown_{idx}"),
        "original_msg": item.get("msg", ""),
        "generated_first_msg": commit_msg
    })

    # === 生成相似示例提交消息 ===
    for ex_idx, ex in enumerate(item.get("examples", []), 1):
        ex_prompt = prompt_template.format(
            target_code_change=ex.get("diff", ""),
            target_astnl=ex.get("astnl", "")
        )
        ex_msg = generate_commit_message(ex_prompt)
        ex["first_msg"] = ex_msg
        print(f"   ↳ 示例 {ex_idx} 完成")

# 写回完整数据文件
with open(output_file, "w", encoding="utf-8") as f:
    for entry in data:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")

# ✅ 写入仅包含 commit_id 与 msg 对应关系的新文件
with open(result_file, "w", encoding="utf-8") as f:
    for r in results:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")

print(f"✅ 所有提交消息已生成并保存到: {output_file}")
print(f"✅ commit_id-msg 对照结果已保存到: {result_file}")
