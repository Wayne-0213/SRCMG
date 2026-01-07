import json
import heapq
from tqdm import tqdm
import re

# Jaccard
def get_jaccard_similarity(set1, set2):
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return intersection / union

def jaccard_similarity(sample, corpus_sets, top_n, reverse):
    sample = set(text_to_split(sample))
    similarities = []
    for corpus_idx, corpus_set in enumerate(corpus_sets):
        similarity = get_jaccard_similarity(sample, corpus_set)
        heapq.heappush(similarities, (similarity, corpus_idx))
        if len(similarities) > top_n:
            heapq.heappop(similarities)
    top_similarities = [(idx, sim) for sim, idx in similarities]
    top_similarities.sort(key=lambda x: x[1], reverse=reverse)
    return top_similarities

# 分词
def text_to_split(text):
    text = [x for x in re.split(r'(\W)', text.lower()) if x.strip()]
    return text

# 文件路径
retrieval_file = "../retrieval_java_new_gpt5.jsonl"
test_file = "../test_astnl_new_gpt5.jsonl"
output_file = "../test_with_jaccard_top16_new_gpt5.jsonl"

TOP_N = 16
REVERSE = False  # True 表示相似度高排前

# --------- 1. 加载检索池并预处理 ---------
retrieval_data = []
corpus_sets = []
with open(retrieval_file, "r", encoding="utf-8") as fr:
    for line in fr:
        obj = json.loads(line)
        retrieval_data.append(obj)
        corpus_sets.append(set(text_to_split(obj["diff"])))

# --------- 2. 加载测试集并检索 ---------
results = []
with open(test_file, "r", encoding="utf-8") as fr:
    for line in tqdm(fr, desc="Jaccard 检索"):
        if not line.strip():
            continue
        test_obj = json.loads(line)

        # 计算 top-16
        top_similarities = jaccard_similarity(test_obj["diff"], corpus_sets, TOP_N, reverse=REVERSE)

        # 构造输出字段
        result = {
            "commit_id": test_obj["sha"],
            "diff": test_obj["diff"],
            "msg": test_obj["msg"],
            "ast_diff_text": test_obj["ast_diff_text"],
            "code_change_edit": test_obj["code_change_edit"],
            "top-16": [retrieval_data[idx]["id"] for idx, _ in top_similarities],
            "examples": []
        }

        # 如果测试样本有 astnl，存进去
        if "astnl" in test_obj:
            result["astnl"] = test_obj["astnl"]

        # 构造 examples，带 astnl
        for idx, _ in top_similarities:
            example = {
                "commit_id": retrieval_data[idx]["sha"],
                "diff": retrieval_data[idx]["diff"],
                "msg": retrieval_data[idx]["msg"],
                "ast_diff_text": retrieval_data[idx]["ast_diff_text"],
                "code_change_edit": retrieval_data[idx]["code_change_edit"],
            }
            if "astnl" in retrieval_data[idx]:
                example["astnl"] = retrieval_data[idx]["astnl"]
            result["examples"].append(example)

        results.append(result)

# --------- 3. 保存结果 ---------
with open(output_file, "w", encoding="utf-8") as fw:
    for obj in results:
        fw.write(json.dumps(obj, ensure_ascii=False) + "\n")

print(f"检索完成，结果已保存至 {output_file}")

# --------- 4. 检查前30条数据 ---------
for i, obj in enumerate(results[:100]):
    has_astnl_test = "astnl" in obj
    has_astnl_all_examples = all("astnl" in ex for ex in obj["examples"])
    print(f"Index {i}: Test has astnl={has_astnl_test}, Examples all have astnl={has_astnl_all_examples}")
