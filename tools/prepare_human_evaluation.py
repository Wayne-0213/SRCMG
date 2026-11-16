#!/usr/bin/env python3
"""Extract the exact questionnaire embedded in the original evaluation HTML.

No participant responses or unrelated files are read. No resampling is performed.
"""
import argparse
import hashlib
import json
import re
from pathlib import Path


def extract(source):
    html = Path(source).read_text(encoding="utf-8-sig")
    decoder = json.JSONDecoder()
    values = {}
    for name in ("evaluationData", "evaluationMeta"):
        match = re.search(r"\bconst\s+" + name + r"\s*=\s*", html)
        if not match:
            raise ValueError(f"Missing embedded {name}")
        # The original generator escapes closing HTML tags as <\/.
        values[name] = decoder.raw_decode(html[match.end():])[0]
    questions, meta = values["evaluationData"], values["evaluationMeta"]
    ids = set()
    for question in questions:
        qid = question["question_id"]
        if qid in ids:
            raise ValueError(f"Duplicate question ID: {qid}")
        ids.add(qid)
        labels = [c["label"] for c in question["candidates"]]
        if not labels or len(labels) != len(set(labels)):
            raise ValueError(f"Invalid candidate labels for question {qid}")
        for candidate in question["candidates"]:
            for key in ("label", "text", "method"):
                if not isinstance(candidate[key], str):
                    raise ValueError(f"Invalid {key} for question {qid}")
    if not questions or meta["total_questions"] != len(questions):
        raise ValueError("Question count does not match metadata")
    if meta["score_scale"] != {"min": 1, "max": 5}:
        raise ValueError("This questionnaire requires the original 1–5 scale")
    # Retain scientific provenance; omit workstation-specific absolute paths.
    meta.pop("source_files", None)
    canonical = json.dumps(questions, ensure_ascii=False, sort_keys=True).encode("utf-8")
    meta["dataset_id"] = "srcmg-rq1-" + hashlib.sha256(canonical).hexdigest()[:16]
    return {"meta": meta, "questions": questions}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Original evaluation.html")
    parser.add_argument("--output", type=Path, default=Path("docs/human-evaluation/data.js"))
    args = parser.parse_args()
    data = extract(args.source)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(data, ensure_ascii=False, indent=2).replace("<", "\\u003c").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
    args.output.write_text("// Generated with tools/prepare_human_evaluation.py; do not reorder candidates.\nwindow.SRCMG_EVALUATION = " + serialized + ";\n", encoding="utf-8")
    print(f"Prepared {len(data['questions'])} questions: {data['meta']['dataset_id']}")


if __name__ == "__main__":
    main()
