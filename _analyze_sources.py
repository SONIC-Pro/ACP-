# -*- coding: utf-8 -*-
"""分析 553题 xlsx 和 30题 PDF 的结构"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

# 1. 分析 553 题 xlsx
print('='*60)
print('553题 xlsx 结构分析')
print('='*60)
from openpyxl import load_workbook
wb = load_workbook(r'e:\阿里云ACP\阿里云大模型ACP-553题-2\阿里云大模型ACP-553题-2.xlsx', read_only=True)
print(f'Sheet names: {wb.sheetnames}')
for sn in wb.sheetnames:
    ws = wb[sn]
    print(f'\nSheet: {sn}, max_row={ws.max_row}, max_col={ws.max_column}')
    # 打印前 5 行
    for i, row in enumerate(ws.iter_rows(values_only=True)):
        if i >= 8:
            break
        print(f'  Row {i}: {[str(c)[:60] if c else "" for c in row]}')
wb.close()

# 2. 分析 30 题 PDF
print('\n' + '='*60)
print('30题 PDF 结构分析')
print('='*60)
import fitz
doc = fitz.open(r'e:\阿里云ACP\2025年阿里云ACP大模型高级工程师30题（含解析）\2025年阿里云ACP大模型高级工程师30题（含解析）.pdf')
print(f'Pages: {len(doc)}')
for i in range(min(3, len(doc))):
    page = doc[i]
    text = page.get_text()
    print(f'\n--- Page {i+1} ({len(text)} chars) ---')
    print(text[:500])
doc.close()
