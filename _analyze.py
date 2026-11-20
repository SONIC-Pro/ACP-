import sys, json; sys.stdout.reconfigure(encoding='utf-8')
text = open('data.js',encoding='utf-8').read()
# 提取 JSON 部分
json_str = text.replace('window.QUIZ_DATA = ', '', 1).rstrip().rstrip(';')
data = json.loads(json_str)
print('chapters:', len(data['chapters']))
for c in data['chapters']:
    print(c)
print('total questions:', len(data['questions']))
from collections import Counter
cc=Counter(q['chap'] for q in data['questions'])
for c in data['chapters']:
    cid = c['id']
    ctitle = c['title']
    print(f'  {cid:6} {ctitle:40} {cc.get(cid,0)}')
print('sources:')
for s in data['sources']:
    print(f'  {s["id"]:10} {s["name"]:50} {s["count"]}')
