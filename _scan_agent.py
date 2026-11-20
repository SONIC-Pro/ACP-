# -*- coding: utf-8 -*-
"""扫描所有题库文件，查找第三章 Agent 相关的题目"""
import sys, os, re, json
sys.stdout.reconfigure(encoding='utf-8')

ROOT = r'e:\阿里云ACP'

# Agent 第三章关键词
AGENT_KEYWORDS = [
    'Agent', 'agent', '智能体', 'ReAct', 'react',
    'MCP', 'Model Context Protocol', '工具调用', 'Function Calling',
    '多Agent', '多智能体', '协作模式', 'MsgHub', 'Pipeline',
    '记忆机制', '长期记忆', 'InMemoryMemory', 'ContextConfig',
    '技能', 'Skill', '技能固化', 'PlanNotebook',
    '规划', '反思', 'Sequential', 'Fanout',
    'Handoff', 'Leader', 'UserAgent', 'ToolResponse',
    'code_exec', 'code as action',
    '评测驱动', 'RIDE', 'Harness', 'Loop',
    'Qwen Code', 'QwenCode',
]

# 要扫描的文件列表
files_to_scan = []

# 1. 知识点整理+题目（详细）/题目 下的习题集 HTML
tdir = os.path.join(ROOT, '知识点整理+题目（详细）', '题目')
for f in os.listdir(tdir):
    if f.endswith('.html') and '习题集' in f:
        files_to_scan.append(('习题集HTML', os.path.join(tdir, f)))

# 2. 模拟题 MD
mdir = os.path.join(ROOT, '知识点和模拟题', '1128知识点和模拟题')
for f in os.listdir(mdir):
    if f.endswith('.md'):
        files_to_scan.append(('模拟题MD', os.path.join(mdir, f)))

# 3. output_questions 批次 MD
for f in sorted(os.listdir(os.path.join(ROOT, 'output_questions'))):
    if f.endswith('.md'):
        files_to_scan.append(('553题MD', os.path.join(ROOT, 'output_questions', f)))

# 4. 553题 xlsx（跳过，二进制）
# 5. 326题 PDF（需要 fitz）
p326 = os.path.join(ROOT, '大模型acp-326题-2', '大模型acp-326题-2.pdf')
if os.path.exists(p326):
    files_to_scan.append(('326题PDF', p326))

# 6. 30题 PDF
p30 = os.path.join(ROOT, '2025年阿里云ACP大模型高级工程师30题（含解析）', '2025年阿里云ACP大模型高级工程师30题（含解析）.pdf')
if os.path.exists(p30):
    files_to_scan.append(('30题PDF', p30))

# 7. 553题 xlsx
p553 = os.path.join(ROOT, '阿里云大模型ACP-553题-2', '阿里云大模型ACP-553题-2.xlsx')
if os.path.exists(p553):
    files_to_scan.append(('553题XLSX', p553))

print(f'共 {len(files_to_scan)} 个文件待扫描\n')

# 扫描
results = {}  # {file_type: {keyword: count}}
agent_questions = []  # 命中的题目

for ftype, fpath in files_to_scan:
    fname = os.path.basename(fpath)
    try:
        if fpath.endswith('.pdf'):
            import fitz
            doc = fitz.open(fpath)
            text = ''.join(p.get_text() for p in doc)
        elif fpath.endswith('.xlsx'):
            from openpyxl import load_workbook
            wb = load_workbook(fpath, read_only=True)
            text = ''
            for ws in wb.worksheets:
                for row in ws.iter_rows(values_only=True):
                    text += ' '.join(str(c) for c in row if c) + '\n'
        else:
            text = open(fpath, encoding='utf-8', errors='replace').read()
    except Exception as e:
        print(f'[跳过] {fname}: {e}')
        continue
    
    # 搜索关键词
    hits = {}
    for kw in AGENT_KEYWORDS:
        count = text.count(kw)
        if count > 0:
            hits[kw] = count
    
    if hits:
        results[fname] = (ftype, hits)
        total_hits = sum(hits.values())
        print(f'[命中] {fname} ({ftype})')
        for kw, cnt in sorted(hits.items(), key=lambda x: -x[1]):
            print(f'  {kw:30} {cnt}次')
        print()

print('\n' + '='*60)
print('汇总：')
for fname, (ftype, hits) in results.items():
    total = sum(hits.values())
    print(f'  {fname:60} {total}次命中')
