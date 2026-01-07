import json
import time
import random
from openai import OpenAI

def generate_astnl():
    client = OpenAI(
        api_key="sk-B5WnXqHtgPj0PDFx6EM8WPEpctUFKRtq4JPArX5Y6aQic5hp",  # ⚠️ 填入你的实际 API Key
        base_url="https://www.dmxapi.cn/v1",
    )

    input_file = "../test_del.jsonl"  # 输入文件
    output_file = "../test_astnl_new_gpt5.jsonl"  # 输出文件
    max_count = 100  # 最大处理条数

    results = []

    def safe_request(prompt, max_retries=5):
        """带重试机制的安全请求"""
        for attempt in range(1, max_retries + 1):
            try:
                response = client.chat.completions.create(
                    model="gpt-5",
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0
                )
                return response.choices[0].message.content.strip()
            except Exception as e:
                print(f"⚠️ 请求失败 (第 {attempt} 次): {e}")
                if attempt < max_retries:
                    sleep_time = min(2 ** attempt + random.random(), 20)
                    print(f"⏳ {sleep_time:.1f}s 后重试...")
                    time.sleep(sleep_time)
                else:
                    print("❌ 达到最大重试次数，跳过该样本。")
                    return ""

    with open(input_file, "r", encoding="utf-8") as f:
        for idx, line in enumerate(f):
            data = json.loads(line)

            if idx >= max_count:
                break  # 超过设定上限就停止

            ast_diff = data.get("ast_diff_text", "")
            ast_diff = ast_diff.strip() if isinstance(ast_diff, str) else ""

            if not ast_diff:
                # 🚫 跳过空的 diff
                print(f"🔸 第 {idx+1} 条 ast_diff_text 为空，跳过 GPT 调用。")
                data["astnl"] = ""
            else:
                # ✅ 调用 GPT 生成
                prompt = f"""You are given an AST diff extracted by GumTree (insert, delete, update, move).
Your task is to summarize the *structural code changes* reflected by this AST diff.

### Critical Constraints
- Do NOT infer developer intent (e.g., do not say fix, refactor, optimize, improve, handle, support, prevent).
- Do NOT guess behavior or purpose.
- Only describe the structural transformations visible in the AST operations.

### Allowed descriptions
You may describe:
- Changes to control flow (e.g., conditional, loop, return path)
- Changes to statements (insertion, removal, replacement)
- Updated expressions or method calls
- Reordered/moved declarations or statements
- Added or removed syntactic constructs
- Modified literal or identifier nodes

### Prohibited descriptions
- No mention of bugs, features, fixes, performance, refactoring, or intent.
- No speculation about functionality or meaning of code.
- No repetition of raw AST node names unless necessary.

### Output Style
- Output as a bullet list, using '-' at the beginning of each item.
- Each bullet ≤ 15 words.
- Each bullet should describe a structural change pattern at a human-readable level.
- The bullets should provide helpful structural cues but no semantic interpretation.

AST diff:
{ast_diff}
"""
                print(f"🟢 正在生成第 {idx+1} 条 AST NL 描述...")
                # print(prompt)
                nl_description = safe_request(prompt)
                data["astnl"] = nl_description
                print(f"✅ 完成第 {idx+1} 条")
                print(nl_description)
                print("=" * 80)

            results.append(data)

    # 保存结果
    with open(output_file, "w", encoding="utf-8") as f:
        for item in results:
            f.write(json.dumps(item, ensure_ascii=False) + "\n")

    print(f"🎉 处理完成，结果已写入 {output_file}")


if __name__ == "__main__":
    generate_astnl()
