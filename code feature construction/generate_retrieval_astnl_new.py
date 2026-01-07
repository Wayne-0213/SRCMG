import json
from tqdm import tqdm
from openai import OpenAI
import time, random
import os


def generate_astnl():
    client = OpenAI(
        api_key="sk-B5WnXqHtgPj0PDFx6EM8WPEpctUFKRtq4JPArX5Y6aQic5hp",
        base_url="https://www.dmxapi.cn/v1",
    )

    # 输入文件
    test_file = "../test_with_jaccard_top16.jsonl"
    retrieval_file = "../retrieval_java.jsonl"

    # 输出文件
    output_file = "../retrieval_java_new_gpt5.jsonl"

    # 只取前多少条 test 记录的 top-16
    max_count = 100

    # ================================
    # Step 1: 收集 top-16 id
    # ================================
    print("Step 1: 收集 top-16 id ...")
    selected_ids = set()
    with open(test_file, "r", encoding="utf-8") as f:
        for idx, line in enumerate(f):
            if idx >= max_count:
                break
            obj = json.loads(line)
            selected_ids.update(obj["top-16"])
    print(f"收集完成，共 {len(selected_ids)} 个唯一 id")

    # ================================
    # Step 2: 读取已有输出文件，保存为 existing
    # ================================
    existing = {}
    resume_start_id = 20785

    if os.path.exists(output_file):
        print(f"发现旧输出文件，读取中：{output_file}")
        with open(output_file, "r", encoding="utf-8") as f:
            for line in f:
                if not line.strip():
                    continue
                obj = json.loads(line)
                existing[obj["id"]] = obj

        print(f"旧文件加载完成：已有 {len(existing)} 条数据")
    else:
        print("未发现旧输出文件，将从空开始。")

    # ================================
    # Step 3: 遍历原始 retrieval_file
    # 补充生成 20785 之前的数据
    # ================================
    print("Step 3: 扫描原始 retrieval_java.jsonl，生成缺失的 astnl ...")

    processed_objects = []

    with open(retrieval_file, "r", encoding="utf-8") as f:
        for line in tqdm(f, desc="Processing retrieval file"):
            if not line.strip():
                continue

            obj = json.loads(line)
            obj_id = obj["id"]

            # ---- 如果 ID ≥ 20785，则已经在 existing 里保存了，跳过
            if obj_id >= resume_start_id:
                continue

            # ---- 如果之前就已经生成过，则无需生成，直接沿用
            if obj_id in existing:
                processed_objects.append(existing[obj_id])
                continue

            # ---- 如果不在需要生成的 top-16 id 中，也直接保持原样
            if obj_id not in selected_ids:
                processed_objects.append(obj)
                continue

            # ---- 到这里就是：id < 20785 且确实需要生成 astnl 的
            ast_diff = obj.get("ast_diff_text", "")
            code_edit = obj.get("code change edit", "")

            # === 你的提示模板保持不变 ===
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

            print(f"\n正在生成 astnl: id = {obj_id}")

            # === 自动重试 ===
            response = None
            for attempt in range(5):
                try:
                    response = client.chat.completions.create(
                        model="gpt-5",
                        messages=[{"role": "user", "content": prompt}],
                        temperature=0
                    )
                    break

                except Exception as e:
                    e_str = str(e).lower()

                    if "ratelimit" in e_str or "429" in e_str:
                        print(f"⚠️ 限流，第 {attempt + 1} 次重试")
                        time.sleep(5 * (attempt + 1))
                        continue

                    if "timeout" in e_str:
                        print(f"⚠️ 超时，第 {attempt + 1} 次重试")
                        time.sleep(5 * (attempt + 1))
                        continue

                    print(f"❌ 非可重试错误：{e}")
                    break

            if response is None:
                nl_description = ""
            else:
                nl_description = response.choices[0].message.content.strip()

            obj["astnl"] = nl_description
            print(f"生成完成: {nl_description}")

            processed_objects.append(obj)

    print("生成前段数据完成。")

    # ================================
    # Step 4: 将 existing（id ≥ 20785）的数据依序附加
    # ================================
    print("Step 4: 追加旧数据（id ≥ 20785）...")

    existing_sorted = sorted(existing.values(), key=lambda x: x["id"])
    processed_objects.extend(existing_sorted)

    # ================================
    # Step 5: 整体按 id 排序并保存
    # ================================
    print(f"Step 5: 写入最终文件：{output_file}")

    with open(output_file, "w", encoding="utf-8") as out_f:
        for obj in sorted(processed_objects, key=lambda x: x["id"]):
            out_f.write(json.dumps(obj, ensure_ascii=False) + "\n")

    print("处理完成 ✅")


if __name__ == "__main__":
    generate_astnl()
