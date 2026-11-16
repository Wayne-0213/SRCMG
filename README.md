# SRCMG

## Human Evaluation Questionnaire / 人工评价问卷

The RQ1 human evaluation is available as a browser-based questionnaire with 50 questions and 250 candidate messages. It preserves the original sample order and evaluates informativeness, conciseness, expressiveness (1–5), and acceptance (0/1).

- **[Open the questionnaire / 在线填写问卷](https://wayne-0213.github.io/SRCMG/human-evaluation/)**
- **[Instructions, protocol, export format and source / 使用说明与源码](docs/human-evaluation/README.md)**

The questionnaire supports local autosave, draft import/export, and JSON/CSV results. Answers stay in the browser; participants download their results and return them to the study organizer. It can also run offline by opening `docs/human-evaluation/index.html`.

# Dataset Description

This repository uses a processed version of the MCMD-NT dataset for the experiments in our study.

## Original Dataset

The original MCMD-NT dataset is publicly available at the following link:

- **MCMD-New**:  
  https://mega.nz/file/LggR1QRS#tRNR4nL9o6Vhf36rnVuu8YvL3J-ZptaQJ5mQPWRilI0

## Processed Dataset Used in This Study

Based on the original MCMD-NT dataset, we further performed data preprocessing, feature extraction, and retrieval-related processing to construct the dataset used in this work.

The processed dataset used for all experiments in this study is publicly released on Zenodo:

- **Processed MCMD-NT Dataset (for this study)**:  
  https://zenodo.org/records/18169557

This released dataset includes all data required to reproduce the experimental results reported in the paper.

## Reproduction Guide

If you would like to reproduce our experiments, please follow the steps below:

1. **Prepare the dataset**  
   Download and set up the processed dataset released in this repository.

2. **Extract AST differences**  
   Run the `extract_ast` script in the `code feature construction` directory to extract the differential ASTs for both the training and test sets.

3. **Retrieve similar examples**  
   Run the `retrieval` script in the `RQ1` directory to retrieve similar code examples.

4. **Generate edit sequences**  
   Run the `generate_edit_sequence_line` script in the `code feature construction` directory to construct code edit sequences.

5. **Generate AST-based representations**  
   - Run `generate_retrieval_astnl_new` for the retrieval set  
   - Run `generate_test_astnl_new` for the test set  
   Both scripts are located in the `code feature construction` directory and are used to summarize differential ASTs.

6. **Generate commit messages**  
   Run the `generate_message_first` script in the `RQ1` directory to generate initial commit messages.

7. **Analyze syntax differences**  
   Run the `step2_syntax_cpu` script in the `RQ1` directory to analyze the differences between generated commit messages and ground-truth messages.

8. **Optimize commit messages**  
   Run the `generate_message_optimize` script in the `RQ1` directory to refine and improve the generated commit messages.
