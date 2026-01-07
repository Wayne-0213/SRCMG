import json
import difflib

def generate_edit_sequence_line_diff(old_code, new_code):
    old_lines = [line + '\n' for line in old_code.splitlines()]
    new_lines = [line + '\n' for line in new_code.splitlines()]

    sm = difflib.SequenceMatcher(None, old_lines, new_lines)
    result = []

    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            result.extend(old_lines[i1:i2])  # unchanged lines

        elif tag == 'replace':
            result.append("<UPDATE_FROM>\n")
            result.extend(old_lines[i1:i2])
            result.append("</UPDATE_FROM>\n")
            result.append("<UPDATE_TO>\n")
            result.extend(new_lines[j1:j2])
            result.append("</UPDATE_TO>\n")

        elif tag == 'delete':
            result.append("<DELETE>\n")
            result.extend(old_lines[i1:i2])
            result.append("</DELETE>\n")

        elif tag == 'insert':
            result.append("<INSERT>\n")
            result.extend(new_lines[j1:j2])
            result.append("</INSERT>\n")

    return "".join(result)


def process_jsonl(input_path: str, output_path: str):
    with open(input_path, 'r', encoding='utf-8') as infile, \
         open(output_path, 'w', encoding='utf-8') as outfile:

        for line in infile:
            data = json.loads(line)
            old_code = data.get("old_code", "")
            new_code = data.get("new_code", "")

            edit_sequence = generate_edit_sequence_line_diff(old_code, new_code)
            data["code change edit"] = edit_sequence

            outfile.write(json.dumps(data, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    input_file = "YOUR_INPUT_FILE.jsonl"  # TODO: 填入你的输入路径
    output_file = "test_ast_with_edits_line.jsonl"
    process_jsonl(input_file, output_file)
    print(f"✅ 处理完成，已保存到 {output_file}")
