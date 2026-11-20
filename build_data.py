# -*- coding: utf-8 -*-
"""
从课件配套的各类题库文件中提取题目，生成前端网站所需的 data.js
数据来源：
  1. 知识点整理+题目（详细）/题目/【…习题集】*.html  —— 按章节的习题集（题目+文末答案表）
  2. 知识点整理+题目（详细）/题目/模拟考试（一~五）.html + 【答案】版 —— 模拟考试卷
  3. 知识点和模拟题/1128知识点和模拟题/模拟题001~06.md —— 模拟题（含答案解析）
  4. output_questions/questions_batch_*.md —— 综合题库（已整理的批次文件）
  5. 大模型acp-326题-2/大模型acp-326题-2.pdf —— 326题题库（含答案解析）
  6. 阿里云大模型ACP-553题-2/阿里云大模型ACP-553题-2.xlsx —— 553题题库（含答案解析）
  7. 2025年阿里云ACP大模型高级工程师30题（含解析）.pdf —— 30题（OCR识别）
"""
import io
import os
import re
import json
import glob
import hashlib
import html as html_mod

ROOT = r'e:\阿里云ACP'
OUT = os.path.join(ROOT, '刷题', 'data.js')

# 新大纲章节（V3）
CHAPTERS = [
    ('2.1', '2.1 用大模型构建新人答疑机器人'),
    ('2.2', '2.2 构建 RAG 应用'),
    ('2.3', '2.3 提示词工程'),
    ('2.4', '2.4 评测与效果评估'),
    ('2.5', '2.5 优化 RAG 准确率'),
    ('3.1', '3.1 工具调用'),
    ('3.2', '3.2 规划与反思'),
    ('3.3', '3.3 多 Agent 协作'),
    ('3.4', '3.4 记忆机制'),
    ('3.5', '3.5 技能固化'),
    ('3.6', '3.6 评测驱动开发'),
    ('3.7', '3.7 Qwen Code 工程实践'),
    ('3.8', '3.8 Harness & Loop Engineering'),
    ('4.1', '4.1 模型微调与部署'),
    ('4.2', '4.2 高级检索策略'),
    ('4.3', '4.3 安全与合规'),
    ('4.4', '4.4 系统架构设计'),
    ('5.1', '5.1 RIDE 方法论'),
    ('5.2', '5.2 总结与展望'),
    ('misc', '综合知识点'),
]

# 章节关键词分类规则（按优先级从上到下，命中分数最高者胜出）
CHAPTER_KEYWORDS = {
    # 第4章 - 微调与部署（优先级最高，避免被其他关键词抢走）
    '4.1': ['微调', 'LoRA', 'lora', 'SFT', 'DPO', 'RLHF', '全参', '监督式微调', 'PEFT', 'QLoRA',
            '训练数据集', '过拟合', '灾难性遗忘', 'llama-factory', 'LLaMA-Factory', '奖励模型',
            '人类反馈', '强化学习', 'epoch', '学习率', 'loss', '预训练',
            '部署', 'PAI-EAS', 'EAS', 'vLLM', 'BladeLLM', '量化', 'GPTQ', 'AWQ', '推理加速',
            '吞吐量', 'KV Cache', 'KV缓存', '显存', 'GPU', '算力', 'TensorRT', 'ollama', 'Ollama',
            '模型压缩', '蒸馏', '剪枝', '弹性扩缩容', '扩缩容', '函数计算', 'Serverless',
            'ECS', 'ACK', 'ACS', '容器服务', '云服务API', '自托管', '盈亏平衡'],
    # 第4章 - 高级检索策略
    '4.2': ['重排', 'rerank', 'Rerank', '多路检索', '查询改写', 'query改写', '倒排', 'BM25',
            'ES检索', '混合检索', 'DashScopeParse', 'NL2SQL', '图片检索', '多模态检索',
            '高级检索', '检索策略', '检索增强'],
    # 第4章 - 安全与合规
    '4.3': ['安全', '内容审核', '备案', '合规', '生成式人工智能服务管理', '数据脱敏', '隐私',
            '护栏', 'Guardrail', '红蓝对抗', '越狱', '版权', '伦理', 'AIGC标识',
            '敏感信息', '内容安全', '风控'],
    # 第4章 - 系统架构设计
    '4.4': ['系统架构', '架构设计', '监控', '限流', '缓存', '网关', '灰度', '日志',
            '高可用', '容灾', '微服务', '负载均衡', '链路追踪'],
    # 第3章 - Agent 系统（注意优先级：工具调用 > 规划 > 协作 > 记忆 > 技能）
    '3.1': ['工具调用', 'Function Call', 'function call', 'function_call', 'MCP',
            'Model Context Protocol', 'Assistant API', 'assistant', '联网搜索', '代码解释器',
            'tools', '天气查询', 'ToolResponse', 'Toolkit', '插件'],
    '3.2': ['规划', '反思', 'PlanNotebook', 'create_plan', 'finish_subtask', 'finish_plan',
            'plan_notebook', 'Code as Action', 'code_exec', 'JSON计划', '执行器',
            '自主规划', '动态调整'],
    '3.3': ['多Agent', '多智能体', '协作模式', 'MsgHub', 'Handoff', 'Leader', 'UserAgent',
            'sequential_pipeline', 'fanout_pipeline', 'Pipeline', '共创协作', '分层规划',
            '多Agent协作', '消息广播', '参与者'],
    '3.4': ['记忆机制', '长期记忆', 'InMemoryMemory', 'ContextConfig', 'Mem0', 'Mem0LongTermMemory',
            '滚动摘要', '固定窗口截断', '向量库记忆', '记忆管理', 'trigger_ratio', 'reserve_ratio',
            'tool_result_limit', 'Qdrant', '记忆压缩', '上下文压缩'],
    '3.5': ['技能', 'Skill', '技能固化', 'SKILL.md', '技能文件', '审查SOP',
            '领域专家', '技能加载', '技能管理'],
    '3.6': ['评测驱动', '评测驱动开发', '测试驱动', 'TDD', '评测指标', '评测体系',
            '质量门禁', '持续评测', '回归测试'],
    '3.7': ['Qwen Code', 'QwenCode', 'qwen code', 'qwen-code', '命令行工具',
            'CLI工具', '开发工作流', '工程实践', '代码生成', '代码审查工具'],
    '3.8': ['Harness', 'Loop', 'Loop Engineering', 'harness', '循环工程',
            'Agent循环', '执行循环', '工具循环', 'ReAct循环', '推理循环'],
    # 第5章
    '5.1': ['RIDE', 'RIDE方法论', '方法论', '设计原则', '架构原则'],
    '5.2': ['总结与展望', '展望', '未来方向', '发展趋势'],
    # 第2章
    '2.5': ['切片', 'chunk', 'Chunk', '召回率', '准确率', '召回', 'RAG优化', 'RAG准确率',
            'RAG应用提升', '问答准确度'],
    '2.4': ['评测', '评估', 'RAGAS', 'ragas', 'Ragas', '忠实度', '答案相关性', '上下文召回率',
            '上下文精度', 'faithfulness', '裁判', '评分', 'BLEU', 'ROUGE', '人工评测', '自动化评测',
            '基准测试', 'benchmark'],
    '2.2': ['RAG', '检索增强', '向量', 'Embedding', 'embedding', '知识库', '索引', 'LlamaIndex',
            'llamaindex', '语义搜索', '相似度', '私域知识', '文档解析', 'VectorStore', 'DashVector',
            '百炼知识库'],
    '2.3': ['提示词', '提示工程', 'Prompt', 'prompt', '思维链', 'CoT', '少样本', 'Few-shot',
            'few-shot', '零样本', 'Zero-shot', '角色设定', '指令', 'System Message', 'system message',
            '提示模板', '防御', '注入'],
    '2.1': ['API Key', 'api key', 'API-KEY', 'temperature', 'top_p', 'top_k', 'Token', 'token',
            '分词', '流式输出', 'stream', 'seed', '上下文窗口', '多轮对话', 'OpenAI SDK', '通义千问',
            'qwen', 'Qwen', '百炼', 'DashScope', 'max_tokens', '大模型工作', '生成原理'],
    # Agent 相关关键词放在最后（优先级低），避免抢走第3章的题目
    '3.1_agent': ['Agent', 'agent', '智能体', 'ReAct', 'react', '工作流'],
}


def read_text(path):
    return io.open(path, encoding='utf-8', errors='replace').read()


def norm_space(s):
    s = re.sub(r'[ \t\u3000]+', ' ', s)
    return s.strip()


# ---------- HTML -> 文本行 ----------
BLOCK_END = re.compile(r'</(p|div|li|h[1-6]|tr|table|ul|ol|blockquote)>|<br\s*/?>', re.I)


def html_to_lines(raw):
    """CSDN 文章 HTML 转为文本行，<pre> 代码块转为 ```…``` 标记"""
    t = re.sub(r'<script[\s\S]*?</script>|<style[\s\S]*?</style>', '', raw, flags=re.I)
    m = re.search(r'<div[^>]*id="content_views"[^>]*>', t)
    if m:
        t = t[m.end():]

    pres = []

    def keep_pre(mm):
        inner = mm.group(1)
        inner = re.sub(r'<[^>]+>', '', inner)
        inner = html_mod.unescape(inner)
        pres.append(inner.strip('\n'))
        return '\n@@CODE%d@@\n' % (len(pres) - 1)

    t = re.sub(r'<pre[^>]*>([\s\S]*?)</pre>', keep_pre, t, flags=re.I)
    t = BLOCK_END.sub('\n', t)
    t = re.sub(r'<[^>]+>', '', t)
    t = html_mod.unescape(t)

    lines = []
    for ln in t.split('\n'):
        ln = norm_space(ln)
        if not ln:
            continue
        cm = re.match(r'^@@CODE(\d+)@@$', ln)
        if cm:
            lines.append('```\n' + pres[int(cm.group(1))] + '\n```')
        else:
            lines.append(ln)
    return lines


OPT_RE = re.compile(r'^([A-F])[\.、．]\s*(.*)$')


def parse_answer_letters(s):
    m = re.match(r'^\s*([A-F][A-F、，,\s]*)', s)
    if not m:
        return ''
    return ''.join(sorted(set(re.findall(r'[A-F]', m.group(1)))))


# ---------- 1. 习题集 HTML ----------
def parse_exercise_html(path, chap):
    lines = html_to_lines(read_text(path))
    qs = []
    cur = None
    i = 0
    # 答案表位置
    ans_idx = None
    for idx, ln in enumerate(lines):
        if re.match(r'^答案[：:]?$', ln) or ln == '答案：':
            ans_idx = idx
    qre = re.compile(r'^【(单选题|多选题|判断题)】\s*(\d+)?[\.、．]?\s*(.*)$')
    qre_tail = re.compile(r'^(.*?)\s*【(单选题|多选题|判断题)】\s*$')
    seq = 0
    while i < (ans_idx if ans_idx else len(lines)):
        ln = lines[i]
        qm = qre.match(ln)
        tm = None if qm else qre_tail.match(ln)
        if qm or tm:
            if cur:
                qs.append(cur)
            seq += 1
            if qm:
                typ, qtext = qm.group(1), qm.group(3)
                num = int(qm.group(2)) if qm.group(2) else seq
            else:
                typ, qtext, num = tm.group(2), tm.group(1), seq
                qtext = re.sub(r'^\d+[\.、．]\s*', '', qtext)
            cur = {'num': num, 'type': 'multi' if typ == '多选题' else 'single',
                   'q': qtext, 'opts': [], 'ans': '', 'exp': ''}
        elif cur is not None:
            om = OPT_RE.match(ln)
            if om:
                cur['opts'].append(om.group(2))
            elif cur['opts']:
                cur['opts'][-1] = (cur['opts'][-1] + '\n' + ln).strip()
            else:
                cur['q'] = (cur['q'] + '\n' + ln).strip()
        i += 1
    if cur:
        qs.append(cur)
    # 解析文末答案表：数字与字母交替
    answers = {}
    if ans_idx is not None:
        num = None
        for ln in lines[ans_idx + 1:]:
            if ln in ('题号', '答案'):
                continue
            if re.match(r'^\d+$', ln):
                num = int(ln)
            elif re.match(r'^[A-F]+$', ln) and num is not None:
                answers[num] = ln
                num = None
            elif answers:
                break
    out = []
    for q in qs:
        a = answers.get(q['num'], '')
        if not a or not q['opts']:
            continue
        out.append({'chap': chap, 'type': 'multi' if len(a) > 1 else q['type'],
                    'q': q['q'], 'opts': q['opts'], 'ans': ''.join(sorted(a)), 'exp': ''})
    return out


# ---------- 2. 模拟考试 HTML（题目版 + 答案版） ----------
def parse_exam_html(qpath, apath):
    lines = html_to_lines(read_text(qpath))
    # 定位单选/多选小节
    sec = None
    qs_single, qs_multi = [], []
    cur = None
    cur_list = None
    stop_words = ('内容来源', '确定要放弃本次机会', '单选题答案', '多选题答案', 'Charles茶总', '专栏目录')

    def flush():
        nonlocal cur
        if cur and len(cur['opts']) >= 2 and cur_list is not None:
            cur_list.append(cur)
        cur = None

    for ln in lines:
        if any(w in ln for w in stop_words):
            flush()
            break
        if re.match(r'^单选题$', ln):
            flush()
            sec = 'single'
            cur_list = qs_single
            continue
        if re.match(r'^多选题$', ln):
            flush()
            sec = 'multi'
            cur_list = qs_multi
            continue
        if sec is None:
            continue
        om = OPT_RE.match(ln)
        if om:
            if cur is not None:
                cur['opts'].append(om.group(2))
            continue
        if ln.startswith('```'):
            if cur is not None:
                if cur['opts']:
                    cur['opts'][-1] = (cur['opts'][-1] + '\n' + ln).strip()
                else:
                    cur['q'] += '\n' + ln
            continue
        # 新题目：上一题已有>=2个选项，否则视为题干延续
        if cur is not None and len(cur['opts']) >= 2:
            flush()
        if cur is None:
            cur = {'q': re.sub(r'^\d+[\.、．]\s*', '', ln), 'opts': []}
        else:
            cur['q'] += '\n' + ln
    flush()

    # 答案版
    singles, multis = [], []
    if apath and os.path.exists(apath):
        alines = html_to_lines(read_text(apath))
        mode = None
        started = False
        for ln in alines:
            if ln == '答案' or ln == '答案：':
                started = True
                continue
            if re.match(r'^单选题(答案)?[：:]?$', ln):
                mode = 's'
                started = True
                continue
            if re.match(r'^多选题(答案)?[：:]?$', ln):
                mode = 'm'
                started = True
                continue
            if '内容来源' in ln or '确定要放弃' in ln:
                break
            if not started:
                continue
            if mode == 's' and re.match(r'^[A-F]$', ln):
                singles.append(ln)
            elif mode == 'm' and re.match(r'^[A-F]{2,}$', ln):
                multis.append(ln)
    out = []
    for qlist, alist, typ in ((qs_single, singles, 'single'), (qs_multi, multis, 'multi')):
        if len(qlist) != len(alist):
            n = min(len(qlist), len(alist))
            qlist, alist = qlist[:n], alist[:n]
        for q, a in zip(qlist, alist):
            out.append({'chap': None, 'type': typ, 'q': q['q'], 'opts': q['opts'],
                        'ans': ''.join(sorted(a)), 'exp': ''})
    return out


# ---------- 3. 模拟题 001~005 MD ----------
def parse_moni_md(path):
    text = read_text(path)
    lines = [norm_space(l.replace('**', '')) for l in text.split('\n')]
    qs = []
    cur = None
    state = 'q'  # q / opt / ans
    qstart = re.compile(r'^(\d+)[\.、．]\s*(.*)$')
    for ln in lines:
        if not ln:
            continue
        if re.match(r'^#{1,4}\s', ln) or re.match(r'^[一二三四五六]\s*[、．.]', ln):
            continue
        am = re.match(r'^答案[：:]\s*(.*)$', ln)
        if am and cur is not None:
            cur['rawans'] = am.group(1)
            state = 'ans'
            continue
        qm = qstart.match(ln)
        om = OPT_RE.match(ln)
        if qm and (cur is None or state == 'ans' or (state != 'ans' and not om)):
            # 新题（答案已收集完或首题）
            if cur and cur.get('rawans'):
                qs.append(cur)
            cur = {'q': qm.group(2), 'opts': [], 'rawans': ''}
            state = 'q'
            continue
        if cur is None:
            continue
        if state == 'ans':
            cur['rawans'] += '\n' + ln
            continue
        if om:
            cur['opts'].append(om.group(2))
            state = 'opt'
        elif state == 'opt':
            cur['opts'][-1] = (cur['opts'][-1] + '\n' + ln).strip()
        else:
            cur['q'] += '\n' + ln
    if cur and cur.get('rawans'):
        qs.append(cur)
    out = []
    for q in qs:
        raw = q['rawans']
        letters = parse_answer_letters(raw)
        if not letters or len(q['opts']) < 2:
            continue
        # 解析 = 去掉开头的 "C. xxx 是正确答案。" 部分
        exp = raw
        m = re.match(r'^[A-F][A-F、，,\s]*[\.、．]?\s*(.*)$', raw, re.S)
        if m:
            exp = m.group(1)
        exp = re.sub(r'^.*?是正确答案[。.]?\s*', '', exp, count=1, flags=re.S) if '是正确答案' in exp[:80] else exp
        exp = re.sub(r'^(讲解|解析)[：:]\s*', '', exp.strip())
        out.append({'chap': None, 'type': 'multi' if len(letters) > 1 else 'single',
                    'q': q['q'], 'opts': q['opts'], 'ans': letters, 'exp': norm_space(exp.replace('\n', ' '))})
    return out


# ---------- 3b. 模拟题06（答案在题干行尾） ----------
def parse_moni06(path):
    text = read_text(path)
    lines = [norm_space(l) for l in text.split('\n')]
    qs = []
    cur = None
    # 题干行以答案字母结尾，如 “……最能满足需求？C” 或 “单选 1.……？B”
    qre = re.compile(r'^(?:(单选|多选|判断)\s*)?(?:\d+\s*[\.、．])\s*(.*?)\s*([A-F]{1,4})\s*$')
    qre2 = re.compile(r'^(.{15,}?[？?])\s*([A-F]{1,4})\s*$')  # 无题号变体
    for ln in lines:
        if not ln:
            continue
        om = OPT_RE.match(ln)
        qm = None if om else (qre.match(ln) or qre2.match(ln))
        if qm:
            if cur and cur['opts']:
                qs.append(cur)
            g = qm.groups()
            typ, qtext, ans = (g[0], g[1], g[2]) if len(g) == 3 else (None, g[0], g[1])
            ans = ''.join(sorted(set(ans)))
            cur = {'type': 'multi' if (typ == '多选' or len(ans) > 1) else 'single',
                   'q': qtext, 'opts': [], 'ans': ans, 'exp': ''}
            continue
        if cur is None:
            continue
        if om:
            cur['opts'].append(om.group(2))
        elif cur['opts']:
            cur['opts'][-1] = (cur['opts'][-1] + ' ' + ln).strip()
        else:
            cur['q'] += ' ' + ln
    if cur and cur['opts']:
        qs.append(cur)
    return [{'chap': None, 'type': q['type'], 'q': q['q'], 'opts': q['opts'],
             'ans': q['ans'], 'exp': ''} for q in qs if len(q['opts']) >= 2]


# ---------- 4. output_questions 批次 MD ----------
def parse_batch_md(path):
    text = read_text(path)
    blocks = re.split(r'^## 题目\s*\d+\s*$', text, flags=re.M)
    out = []
    for b in blocks[1:]:
        qm = re.search(r'\*\*题目\*\*[：:]\s*([\s\S]*?)\n\s*\*\*选项\*\*', b)
        opts = re.findall(r'^-\s+(.*)$', b, re.M)
        am = re.search(r'\*\*答案\*\*[：:]\s*([A-F][A-F,，、\s]*)', b)
        em = re.search(r'\*\*解析\*\*[：:]\s*([\s\S]*?)(?:\n---|\Z)', b)
        if not (qm and am and len(opts) >= 2):
            continue
        letters = ''.join(sorted(set(re.findall(r'[A-F]', am.group(1)))))
        if not letters:
            continue
        out.append({'chap': None, 'type': 'multi' if len(letters) > 1 else 'single',
                    'q': norm_space(qm.group(1)),
                    'opts': [strip_opt_prefix(norm_space(o)) for o in opts],
                    'ans': letters, 'exp': norm_space(em.group(1)) if em else ''})
    return out


# ---------- 5. 326题 PDF ----------
def parse_326_pdf(path):
    import fitz
    doc = fitz.open(path)
    text = ''.join(p.get_text() for p in doc)
    lines = []
    for ln in text.split('\n'):
        ln = norm_space(ln)
        if not ln:
            continue
        # 过滤水印/页码
        if re.match(r'^(VX[：:].*|V|ri\d+|Xiari\d*|\d{1,3})$', ln):
            continue
        if 'Xiari' in ln and len(ln) < 20:
            continue
        lines.append(ln)
    qs = []
    cur = None
    state = 'q'
    qre = re.compile(r'^(\d{1,3})、\s*(.*)$')
    for ln in lines:
        qm = qre.match(ln)
        if qm:
            if cur:
                qs.append(cur)
            cur = {'q': qm.group(2), 'opts': [], 'ans': '', 'exp': ''}
            state = 'q'
            continue
        if cur is None:
            continue
        am = re.match(r'^答案[：:]\s*([A-F]+)\s*$', ln)
        if am:
            cur['ans'] = ''.join(sorted(set(am.group(1))))
            state = 'ans'
            continue
        em = re.match(r'^解析[：:]\s*(.*)$', ln)
        if em:
            cur['exp'] = em.group(1)
            state = 'exp'
            continue
        om = OPT_RE.match(ln)
        if om and state in ('q', 'opt'):
            cur['opts'].append(om.group(2))
            state = 'opt'
            continue
        if state == 'q':
            cur['q'] += '\n' + ln
        elif state == 'opt':
            cur['opts'][-1] = (cur['opts'][-1] + ' ' + ln).strip()
        elif state == 'exp':
            cur['exp'] += ln if re.match(r'^[a-zA-Z0-9]', ln) is None else ' ' + ln
        # state == 'ans' 且非解析行：忽略
    if cur:
        qs.append(cur)
    out = []
    for q in qs:
        if not q['ans'] or len(q['opts']) < 2:
            continue
        out.append({'chap': None, 'type': 'multi' if len(q['ans']) > 1 else 'single',
                    'q': q['q'], 'opts': q['opts'], 'ans': q['ans'], 'exp': q['exp']})
    return out


# ---------- 6. 553题 XLSX ----------
def parse_553_xlsx(path):
    from openpyxl import load_workbook
    wb = load_workbook(path, read_only=True)
    ws = wb['sheet1']
    rows = list(ws.iter_rows(values_only=True))
    wb.close()
    out = []
    # 跳过表头
    for row in rows[1:]:
        if not row or not row[0]:
            continue
        qtext = str(row[2]).strip() if row[2] else ''
        if not qtext:
            continue
        opts = []
        for i in range(3, 9):  # A~F 列
            if row[i] and str(row[i]).strip():
                opts.append(str(row[i]).strip())
        ans = str(row[9]).strip() if row[9] else ''
        ans = ''.join(sorted(set(re.findall(r'[A-F]', ans))))
        exp = str(row[10]).strip() if row[10] else ''
        if not ans or len(opts) < 2:
            continue
        qtype = 'multi' if len(ans) > 1 else 'single'
        out.append({'chap': None, 'type': qtype, 'q': qtext, 'opts': opts,
                    'ans': ans, 'exp': exp})
    return out


# ---------- 7. 30题 PDF (OCR) ----------
def parse_30_pdf_ocr(path):
    import fitz
    doc = fitz.open(path)
    full_text = ''
    for page in doc:
        # 先尝试直接提取文字
        text = page.get_text()
        if len(text.strip()) < 50:
            # 文字层为空，用 OCR
            try:
                import pytesseract
                from PIL import Image
                import io as _io
                pix = page.get_pixmap(dpi=200)
                img = Image.open(_io.BytesIO(pix.tobytes('png')))
                text = pytesseract.image_to_string(img, lang='chi_sim+eng')
            except ImportError:
                print('  [警告] pytesseract 或 Pillow 未安装，30题PDF跳过')
                doc.close()
                return []
        full_text += text + '\n'
    doc.close()
    
    # 解析题目（格式：数字. 题干 + 选项 + 答案 + 解析）
    lines = []
    for ln in full_text.split('\n'):
        ln = norm_space(ln)
        if ln:
            lines.append(ln)
    
    qs = []
    cur = None
    state = 'q'
    qre = re.compile(r'^(\d{1,2})[\.、]\s*(.*)$')
    for ln in lines:
        qm = qre.match(ln)
        if qm:
            if cur and cur['ans']:
                qs.append(cur)
            cur = {'q': qm.group(2), 'opts': [], 'ans': '', 'exp': ''}
            state = 'q'
            continue
        if cur is None:
            continue
        am = re.match(r'^答案[：:]\s*([A-F]+)', ln)
        if am:
            cur['ans'] = ''.join(sorted(set(am.group(1))))
            state = 'ans'
            continue
        em = re.match(r'^(解析|解析[：:])\s*(.*)$', ln)
        if em:
            cur['exp'] = em.group(2)
            state = 'exp'
            continue
        om = OPT_RE.match(ln)
        if om and state in ('q', 'opt'):
            cur['opts'].append(om.group(2))
            state = 'opt'
            continue
        if state == 'q':
            cur['q'] += '\n' + ln
        elif state == 'opt':
            cur['opts'][-1] = (cur['opts'][-1] + ' ' + ln).strip()
        elif state == 'exp':
            cur['exp'] += ' ' + ln
    if cur and cur['ans']:
        qs.append(cur)
    
    out = []
    for q in qs:
        if len(q['opts']) < 2:
            continue
        out.append({'chap': None, 'type': 'multi' if len(q['ans']) > 1 else 'single',
                    'q': q['q'], 'opts': q['opts'], 'ans': q['ans'], 'exp': q['exp']})
    return out


# ---------- 章节分类 ----------
def classify(q):
    text = q['q'] + ' ' + ' '.join(q['opts']) + ' ' + q['exp']
    best, best_score = 'misc', 0
    for chap, kws in CHAPTER_KEYWORDS.items():
        score = sum(text.count(k) for k in kws)
        if score > best_score:
            best, best_score = chap, score
    # 3.1_agent 是兜底分类，映射到 3.1
    if best == '3.1_agent':
        best = '3.1'
    return best if best_score > 0 else 'misc'


def _norm_text(s):
    """题干规范化：去空白和常见中英文标点（差异仅为空格/标点的同题也能命中）"""
    return re.sub(r'[\s，。：:"\'()（）\.、？?！!]', '', str(s))


OPT_PREFIX_RE = re.compile(r'^[A-Fa-f](?:\s*[\.、．\)）:：]|\s+)\s*')


def strip_opt_prefix(s):
    """剥离选项自带的字母前缀：'A. xxx' / 'A、xxx' / 'A xxx'。
    字母后必须跟分隔符或空白才剥离，避免误伤 'API Key'、'A股' 这类正文。
    """
    return OPT_PREFIX_RE.sub('', str(s), count=1)


def _norm_opt(s):
    """选项文本规范化：去掉字母前缀、空白和标点，用于内容空间比对"""
    return re.sub(r'[\s，。：:"\'()（）\.、]', '', strip_opt_prefix(s))


def structural_ok(q):
    """题目结构是否可用：至少 2 个选项、答案字母不越界、选项内容不重复"""
    n = len(q['opts'])
    if n < 2:
        return False
    if any(ord(c) - 65 >= n for c in q['ans']):
        return False
    normed = [_norm_opt(o) for o in q['opts']]
    if len(set(normed)) != len(normed):
        return False
    return True


def prune_defective(questions):
    """剔除残缺题（在 dedupe 之前执行）。

    1. 结构性坏题（答案字母越界、选项重复）直接剔除 —— 这类题在界面上无解；
    2. 少于 4 个选项的题，若存在同题干、结构干净且选项更多的版本，
       剔除这个残缺副本（如 553题 XLSX 里 D 列整列为空的题）；
    3. 无更完整版本的三选项题保留（可能本来就是三选项的题）。
    """
    by_q = {}
    for q in questions:
        by_q.setdefault(_norm_text(q['q']), []).append(q)

    out = []
    n_bad = n_sub = 0
    for q in questions:
        if not structural_ok(q):
            n_bad += 1
            continue
        if len(q['opts']) < 4:
            n_opts = len(q['opts'])
            for s in by_q.get(_norm_text(q['q']), ()):
                if s is not q and len(s['opts']) > n_opts and structural_ok(s):
                    n_sub += 1
                    q = None
                    break
            if q is None:
                continue
        out.append(q)
    print('  残缺题剔除: %d -> %d (结构坏题 %d, 被完整版替代 %d)'
          % (len(questions), len(out), n_bad, n_sub))
    return out


def dedupe(questions):
    """跨来源全局去重。

    key = 题干(规范化) + 排序后的选项内容集 —— 选项顺序不同、标点/空格
    微差的同一题也能命中，而题干相同但选项集不同的（不同考点）不会被误删。
    保留先出现者（来源添加顺序即优先级），解析取更完整的版本。
    """
    seen = {}
    out = []
    n_dup = 0
    for q in questions:
        key = _norm_text(q['q']) + '|' + '|'.join(sorted(_norm_opt(o) for o in q['opts']))
        if key in seen:
            n_dup += 1
            old = seen[key]
            if len(q.get('exp', '')) > len(old.get('exp', '')):
                old['exp'] = q['exp']
            continue
        seen[key] = q
        out.append(q)
    print('  全局去重: %d -> %d (移除 %d 道重复题)' % (len(questions), len(out), n_dup))
    return out


def main():
    sources = []
    all_qs = []

    def add_source(sid, name, group, qs, chap_fixed=None):
        if not qs:
            print('  [跳过-无题目]', name)
            return
        for q in qs:
            q['src'] = sid
            if chap_fixed:
                q['chap'] = chap_fixed
        sources.append({'id': sid, 'name': name, 'group': group, 'count': len(qs)})
        all_qs.extend(qs)
        print('  [OK] %s: %d 题' % (name, len(qs)))

    tdir = os.path.join(ROOT, '知识点整理+题目（详细）', '题目')

    # 1. 章节习题集（按新大纲重新映射）
    print('== 章节习题集 HTML ==')
    exercise_files = [
        ('2.1', '【阿里云大模型高级工程师ACP习题集】2.1 用大模型构建新人答疑机器人.html'),
        ('2.2', '【阿里云大模型高级工程师ACP习题集】2.2 扩展答疑机器人的知识范围.html'),
        ('2.3', '【阿里云大模型高级工程师ACP习题集】2.3 优化提示词改善答疑机器人回答质量.html'),
        ('2.4', '【阿里云大模型高级工程师ACP习题集】2.4 自动化评测答疑机器人的表现（⭐️⭐️⭐️ 重点章节！！！）.html'),
        ('2.5', '【阿里云大模型高级工程师ACP习题集】2.5优化RAG应用提升问答准确度（⭐️⭐️⭐️重点章节！！！…….html'),
        ('3.1', '【阿里云大模型高级工程师ACP习题集】2.6.用插件扩展答疑机器人的能力边界.html'),  # 原2.6→新3.1
        ('4.1', '【阿里云大模型高级工程师ACP习题集】2.7通过微调增强模型能力_上篇_（⭐️⭐️⭐️重点章节！！！…….html'),  # 原2.7→新4.1
        ('4.1', '【阿里云大模型高级工程师ACP习题集】2.7通过微调增强模型能力_下篇_（⭐️⭐️⭐️重点章节！！！…….html'),
        ('4.1', '【阿里云大模型高级工程师ACP习题集】2.8部署模型.html'),  # 原2.8→新4.1
        ('misc', '【阿里云大模型高级工程师ACP习题集】2.9 大模型应用生产实践(下篇).html'),  # 原2.9→待分类
        ('misc', '【阿里云大模型高级工程师ACP习题集】3 总结与展望.html'),  # 原3→待分类
    ]
    for idx, (chap, fname) in enumerate(exercise_files):
        p = os.path.join(tdir, fname)
        if not os.path.exists(p):
            print('  [缺失]', fname)
            continue
        qs = parse_exercise_html(p, chap)
        label = re.search(r'】(.*?)\.html$', fname).group(1)
        label = re.sub(r'（⭐.*', '', label).strip()
        add_source('ex%d' % idx, '章节习题集 ' + label, 'chapter', qs, chap_fixed=chap)

    # 2. 模拟考试卷
    print('== 模拟考试 HTML ==')
    for zh, num in (('一', 1), ('二', 2), ('三', 3), ('四', 4), ('五', 5)):
        qp = os.path.join(tdir, '阿里云大模型ACP认证模拟考试（%s）.html' % zh)
        ap = os.path.join(tdir, '【答案】阿里云大模型ACP认证模拟考试（%s）.html' % zh)
        if not os.path.exists(qp):
            continue
        if not os.path.exists(ap):
            print('  [跳过-无答案版] 模拟考试（%s）' % zh)
            continue
        qs = parse_exam_html(qp, ap)
        add_source('exam%d' % num, '模拟考试（%s）' % zh, 'exam', qs)

    # 3. 模拟题 MD
    print('== 模拟题 MD ==')
    mdir = os.path.join(ROOT, '知识点和模拟题', '1128知识点和模拟题')
    for i in ('001', '002', '003', '004', '005'):
        p = os.path.join(mdir, '模拟题%s.md' % i)
        if os.path.exists(p):
            add_source('moni%s' % i, '模拟题%s' % i, 'exam', parse_moni_md(p))
    p06 = os.path.join(mdir, '模拟题06.md')
    if os.path.exists(p06):
        add_source('moni006', '模拟题006', 'exam', parse_moni06(p06))

    # 4. 553题综合题库（批次文件）
    print('== 553题综合题库 ==')
    batch_qs = []
    for f in sorted(glob.glob(os.path.join(ROOT, 'output_questions', 'questions_batch_*.md')),
                    key=lambda x: int(re.search(r'_(\d+)\.md$', x).group(1))):
        batch_qs.extend(parse_batch_md(f))
    add_source('bank553', '综合题库（553题扩展版，%d题）' % len(batch_qs), 'bank', batch_qs)

    # 5. 326题 PDF
    print('== 326题 PDF ==')
    p326 = os.path.join(ROOT, '大模型acp-326题-2', '大模型acp-326题-2.pdf')
    if os.path.exists(p326):
        add_source('bank326', '326题题库（含解析）', 'bank', parse_326_pdf(p326))

    # 6. 553题 XLSX
    print('== 553题 XLSX ==')
    p553 = os.path.join(ROOT, '阿里云大模型ACP-553题-2', '阿里云大模型ACP-553题-2.xlsx')
    if os.path.exists(p553):
        print('  [跳过] XLSX 来源选项损坏，已按用户要求移除')

    # 7. 30题 PDF (OCR)
    print('== 30题 PDF (OCR) ==')
    p30 = os.path.join(ROOT, '2025年阿里云ACP大模型高级工程师30题（含解析）', '2025年阿里云ACP大模型高级工程师30题（含解析）.pdf')
    if os.path.exists(p30):
        add_source('bank30', '2025年30题（OCR识别）', 'bank', parse_30_pdf_ocr(p30))

    # 清洗：去掉 markdown 转义符（如 max\_tokens -> max_tokens），
    # 否则同题因转义差异漏判去重，显示也难看
    md_esc = re.compile(r'\\([_`*\[\]()#!\-\.>])')
    for q in all_qs:
        q['q'] = md_esc.sub(r'\1', q['q']).strip()
        q['opts'] = [md_esc.sub(r'\1', o).strip() for o in q['opts']]
        if q.get('exp'):
            q['exp'] = md_esc.sub(r'\1', q['exp'])

    # 残缺题剔除（答案越界 / 选项重复 / 三选项的残缺副本）
    print('== 残缺题剔除 ==')
    all_qs = prune_defective(all_qs)

    # 全局去重（跨来源；保留先出现者，合并解析）
    print('== 全局去重 ==')
    all_qs = dedupe(all_qs)

    # 分类 + 编号
    # id 用「题干+选项集」内容哈希，保证重建题库后进度不错位
    for q in all_qs:
        if not q.get('chap'):
            q['chap'] = classify(q)
        h = hashlib.md5((_norm_text(q['q']) + '|' +
                         '|'.join(sorted(_norm_opt(o) for o in q['opts']))).encode('utf-8'))
        q['id'] = q['src'] + '-' + h.hexdigest()[:10]
        q['q'] = q['q'].strip()
        q['opts'] = [o.strip() for o in q['opts']]

    data = {
        'chapters': [{'id': c, 'title': t} for c, t in CHAPTERS],
        'sources': sources,
        'questions': all_qs,
        'bankId': hashlib.sha256(json.dumps(all_qs, ensure_ascii=False,
            sort_keys=True, separators=(',', ':')).encode('utf-8')).hexdigest(),
    }
    js = 'window.QUIZ_DATA = ' + json.dumps(data, ensure_ascii=False) + ';'
    io.open(OUT, 'w', encoding='utf-8').write(js)

    print('\n总题数: %d  ->  %s' % (len(all_qs), OUT))
    from collections import Counter
    cc = Counter(q['chap'] for q in all_qs)
    for c, t in CHAPTERS:
        print('  %-6s %-30s %d' % (c, t, cc.get(c, 0)))
    tc = Counter(q['type'] for q in all_qs)
    print('  题型:', dict(tc))


if __name__ == '__main__':
    main()
