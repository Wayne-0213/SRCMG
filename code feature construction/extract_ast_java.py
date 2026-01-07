import json
import subprocess
import tempfile
import os
from tqdm import tqdm

# 配置路径
gumtree_jar_path = r"D:\project\Second\gumtree\dist\build\libs\gumtree.jar"
input_jsonl = r"D:\project\Second\dataset\MCMD-NT\processed_data\java\train_code.jsonl"
output_jsonl = r"D:\project\Second\dataset\MCMD-NT\processed_data\java\train_ast.jsonl"

def write_temp_file(code, suffix=".java"):
    """将代码写入临时文件中"""
    tmp = tempfile.NamedTemporaryFile(delete=False, mode='w', suffix=suffix, encoding='utf-8')
    tmp.write(code)
    tmp.close()
    return tmp.name

def run_gumtree(old_path, new_path, gumtree_jar_path=r"D:\project\Second\gumtree\dist\build\libs\gumtree.jar"):
    """调用 GumTree 的 diff 功能"""
    try:
        result = subprocess.run(
            ["java", "-jar", gumtree_jar_path, "textdiff", "-g", "java-treesitter-ng", old_path, new_path],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True,
            encoding = 'utf-8'
        )

        # print(result)
        # print("STDOUT:\n", result.stdout)
        # print("STDERR:\n", result.stderr)
        return result.stdout
    except subprocess.CalledProcessError as e:
        print("GumTree 错误:", e.stderr)
        return None

def describe_action(action):
    """将 GumTree 的原始操作转换为自然语言描述"""
    action_type = action["action"]
    node = action["node"]
    label = node.get("label", "")
    node_type = node.get("type", "")
    parent = action.get("parent", {}).get("type", "")
    pos = action.get("position", -1)

    if action_type == "insert":
        return f"Inserted {node_type} `{label}` under {parent} at position {pos}."
    elif action_type == "delete":
        return f"Deleted {node_type} `{label}` from {parent}."
    elif action_type == "update":
        old = action.get("value", "")
        new = node.get("label", "")
        return f"Updated {node_type} `{label}` from `{old}` to `{new}`."
    elif action_type == "move":
        old_parent = action.get("parent", {}).get("type", "")
        new_parent = action.get("parentTo", {}).get("type", "")
        return f"Moved {node_type} `{label}` from {old_parent} to {new_parent}."
    else:
        return f"{action_type.title()} {node_type} `{label}`."

def extract_gumtree_features(old_code, new_code):
    """主函数：输入 old 和 new 代码，返回自然语言动作列表"""
    old_file = write_temp_file(old_code)
    new_file = write_temp_file(new_code)

    diff_result = run_gumtree(old_file, new_file)
    os.remove(old_file)
    os.remove(new_file)

    if not diff_result or "actions" not in diff_result:
        return []

    actions = diff_result["actions"]
    descriptions = [describe_action(a) for a in actions]
    return descriptions

with open(input_jsonl, 'r', encoding='utf-8') as fin, \
        open(output_jsonl, 'w', encoding='utf-8') as fout:

    for idx, line in enumerate(tqdm(fin, desc="Processing")):
        # if idx >= 5:
        #     break  # 只处理前 5 条数据

        data = json.loads(line)
        old_code = data.get("old_code", "")
        new_code = data.get("new_code", "")
        diff = data.get("diff", {})
        # print("diff", diff)
        # print("old_code", old_code)
        # print("new_code", new_code)
        old_file = write_temp_file(old_code)
        new_file = write_temp_file(new_code)

        diff_result = run_gumtree(old_file, new_file)

        # 删除临时文件
        os.remove(old_file)
        os.remove(new_file)

        data["ast_diff_text"] = diff_result  # 将diff结果加入数据中

        fout.write(json.dumps(data, ensure_ascii=False) + '\n')

print("全部处理完成，结果已保存到:", output_jsonl)