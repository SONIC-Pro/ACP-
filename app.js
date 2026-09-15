/* 阿里云大模型 ACP 刷题系统 */
(function () {
  'use strict';

  var DATA = window.QUIZ_DATA;
  var QS = DATA.questions;
  var QMAP = {};
  QS.forEach(function (q) { QMAP[q.id] = q; });
  var SRC_MAP = {};
  DATA.sources.forEach(function (s) { SRC_MAP[s.id] = s; });
  var CHAP_MAP = {};
  DATA.chapters.forEach(function (c) { CHAP_MAP[c.id] = c; });

  /* ================= 本地存储 ================= */
  var STORE_KEY = 'acp_quiz_v1';
  var store = load();
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(STORE_KEY));
      if (s && s.records) return s;
    } catch (e) {}
    return { records: {}, stars: [], wrongs: [] };
  }
  function save() { localStorage.setItem(STORE_KEY, JSON.stringify(store)); }

  function record(qid, picked, ok) {
    store.records[qid] = { my: picked, ok: ok, ts: Date.now() };
    var wi = store.wrongs.indexOf(qid);
    if (!ok && wi < 0) store.wrongs.push(qid);
    if (ok && wi >= 0) store.wrongs.splice(wi, 1); // 答对后移出错题本
    save();
    updateBadges();
  }
  function toggleStar(qid) {
    var i = store.stars.indexOf(qid);
    if (i >= 0) store.stars.splice(i, 1); else store.stars.push(qid);
    save();
    updateBadges();
    return i < 0;
  }
  function updateBadges() {
    document.getElementById('star-count').textContent = store.stars.length;
    document.getElementById('wrong-count').textContent = store.wrongs.length;
  }

  /* ================= 工具 ================= */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  // 将含 ```代码块``` 的文本渲染为 HTML
  function renderText(s) {
    var parts = String(s).split(/```/);
    var html = '';
    for (var i = 0; i < parts.length; i++) {
      if (i % 2 === 1) html += '<pre>' + esc(parts[i].replace(/^\n+|\n+$/g, '')) + '</pre>';
      else html += esc(parts[i]);
    }
    return html;
  }
  function el(html) {
    var d = document.createElement('div');
    d.innerHTML = html.trim();
    return d.firstChild;
  }
  var main = document.getElementById('main');

  /* ================= 导航 ================= */
  var navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(function (b) {
    b.addEventListener('click', function () { go(b.dataset.nav); });
  });
  document.getElementById('btn-home').addEventListener('click', function () { go('home'); });
  function setActiveNav(name) {
    navBtns.forEach(function (b) { b.classList.toggle('active', b.dataset.nav === name); });
  }
  function go(page) {
    setActiveNav(page);
    window.scrollTo(0, 0);
    if (page === 'home') renderHome();
    else if (page === 'exams') renderExams();
    else if (page === 'stars') renderCollection('stars');
    else if (page === 'wrongs') renderCollection('wrongs');
    else if (page === 'stats') renderStats();
  }

  /* ================= 首页：章节练习 ================= */
  function progressOf(list) {
    var ok = 0, ng = 0;
    list.forEach(function (q) {
      var r = store.records[q.id];
      if (!r) return;
      if (r.ok) ok++; else ng++;
    });
    return { ok: ok, ng: ng, done: ok + ng, total: list.length };
  }
  function progressHtml(p) {
    var okPct = p.total ? (p.ok / p.total * 100) : 0;
    var ngPct = p.total ? (p.ng / p.total * 100) : 0;
    return '<div class="meta"><span>已做 ' + p.done + ' / ' + p.total + '</span>' +
      '<span>正确率 ' + (p.done ? Math.round(p.ok / p.done * 100) + '%' : '--') + '</span></div>' +
      '<div class="progress-bar"><div class="ok" style="width:' + okPct + '%"></div><div class="ng" style="width:' + ngPct + '%"></div></div>';
  }

  function renderHome() {
    var html = '<h2 class="page-title">📚 分章节练习</h2>' +
      '<div class="page-sub">按课程章节刷题（含章节习题集 + 各题库按知识点自动归类的题目），点击章节开始练习</div>' +
      '<div class="card-grid">';
    DATA.chapters.forEach(function (c) {
      var list = QS.filter(function (q) { return q.chap === c.id; });
      if (!list.length) return;
      var p = progressOf(list);
      html += '<div class="chap-card" data-chap="' + c.id + '"><div class="t">' + esc(c.title) + '</div>' + progressHtml(p) + '</div>';
    });
    html += '</div>';
    main.innerHTML = html;
    main.querySelectorAll('.chap-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var cid = card.dataset.chap;
        openPractice({
          title: CHAP_MAP[cid].title,
          list: QS.filter(function (q) { return q.chap === cid; }),
          back: 'home'
        });
      });
    });
  }

  /* ================= 试卷题库页 ================= */
  function renderExams() {
    var groups = [
      { g: 'chapter', name: '📖 章节习题集（每章约30题）' },
      { g: 'exam', name: '📝 模拟考试 / 模拟题' },
      { g: 'bank', name: '🗂️ 综合题库' }
    ];
    var html = '<h2 class="page-title">📝 试卷题库</h2>' +
      '<div class="page-sub">按原始试卷 / 题库整卷练习</div>';
    groups.forEach(function (grp) {
      var srcs = DATA.sources.filter(function (s) { return s.group === grp.g; });
      if (!srcs.length) return;
      html += '<div class="group-title">' + grp.name + '</div><div class="card-grid">';
      srcs.forEach(function (s) {
        var list = QS.filter(function (q) { return q.src === s.id; });
        var p = progressOf(list);
        html += '<div class="chap-card" data-src="' + s.id + '"><div class="t">' + esc(s.name) + '</div>' + progressHtml(p) + '</div>';
      });
      html += '</div>';
    });
    main.innerHTML = html;
    main.querySelectorAll('.chap-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var sid = card.dataset.src;
        openPractice({
          title: SRC_MAP[sid].name,
          list: QS.filter(function (q) { return q.src === sid; }),
          back: 'exams'
        });
      });
    });
  }

  /* ================= 收藏夹 / 错题本 ================= */
  function renderCollection(kind) {
    var ids = kind === 'stars' ? store.stars : store.wrongs;
    var title = kind === 'stars' ? '⭐ 收藏夹' : '❌ 错题本';
    var list = ids.map(function (id) { return QMAP[id]; }).filter(Boolean);
    if (!list.length) {
      main.innerHTML = '<h2 class="page-title">' + title + '</h2>' +
        '<div class="empty"><div class="big">' + (kind === 'stars' ? '⭐' : '🎉') + '</div>' +
        (kind === 'stars' ? '还没有收藏题目，做题时点击星标即可收藏' : '错题本是空的，继续保持！答错的题会自动收进来，重新答对后自动移出') +
        '</div>';
      return;
    }
    openPractice({
      title: title + '（' + list.length + ' 题）',
      list: list,
      back: kind,
      collection: kind
    });
  }

  /* ================= 统计页 ================= */
  function renderStats() {
    var done = 0, ok = 0;
    QS.forEach(function (q) {
      var r = store.records[q.id];
      if (r) { done++; if (r.ok) ok++; }
    });
    var html = '<h2 class="page-title">📊 学习统计</h2><div class="page-sub">全部数据保存在本地浏览器</div>' +
      '<div class="stats-cards">' +
      '<div class="stat-card"><div class="num">' + QS.length + '</div><div class="lbl">题库总题数</div></div>' +
      '<div class="stat-card"><div class="num">' + done + '</div><div class="lbl">已做题数</div></div>' +
      '<div class="stat-card"><div class="num">' + (done ? Math.round(ok / done * 100) + '%' : '--') + '</div><div class="lbl">总正确率</div></div>' +
      '<div class="stat-card"><div class="num">' + store.wrongs.length + '</div><div class="lbl">当前错题</div></div>' +
      '<div class="stat-card"><div class="num">' + store.stars.length + '</div><div class="lbl">收藏题目</div></div>' +
      '</div>' +
      '<table class="stat-table"><tr><th>章节</th><th>题数</th><th>已做</th><th>正确率</th><th>完成度</th></tr>';
    DATA.chapters.forEach(function (c) {
      var list = QS.filter(function (q) { return q.chap === c.id; });
      if (!list.length) return;
      var p = progressOf(list);
      var pct = Math.round(p.done / p.total * 100);
      html += '<tr><td>' + esc(c.title) + '</td><td>' + p.total + '</td><td>' + p.done + '</td>' +
        '<td>' + (p.done ? Math.round(p.ok / p.done * 100) + '%' : '--') + '</td>' +
        '<td><span class="mini-bar"><i style="width:' + pct + '%"></i></span>' + pct + '%</td></tr>';
    });
    html += '</table><p style="margin-top:18px">' +
      '<button class="btn" id="btn-export">📤 导出进度</button> ' +
      '<button class="btn" id="btn-import">📥 导入进度</button>' +
      '<button class="danger-link" id="btn-reset" style="margin-left:12px">清空全部做题记录（不可恢复）</button></p>' +
      '<p class="page-sub" style="margin-top:8px">导出会下载一个 JSON 备份文件，可发送到其他设备后点"导入进度"合并（手机端刷题进度 → 电脑端本地应用）</p>';
    main.innerHTML = html;
    document.getElementById('btn-export').addEventListener('click', exportProgress);
    document.getElementById('btn-import').addEventListener('click', function () {
      var inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = '.json,application/json';
      inp.onchange = function () { if (inp.files && inp.files[0]) importProgress(inp.files[0]); };
      inp.click();
    });
    document.getElementById('btn-reset').addEventListener('click', function () {
      if (confirm('确定清空全部做题记录、错题本与收藏吗？此操作不可恢复。')) {
        store = { records: {}, stars: [], wrongs: [] };
        save();
        updateBadges();
        renderStats();
      }
    });
  }

  /* ================= 进度导出 / 导入（跨设备同步） ================= */
  function exportProgress() {
    var d = new Date();
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var data = JSON.stringify({ v: 1, ts: d.toISOString(), store: store }, null, 2);
    var blob = new Blob([data], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'acp-quiz-' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function importProgress(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (!data || !data.store) throw new Error('格式不正确');
        var ext = data.store;
        // 合并：records 按题覆盖，stars/wrongs 取并集
        var nRec = 0, nStar = 0, nWrong = 0;
        Object.keys(ext.records || {}).forEach(function (k) {
          if (!store.records[k]) nRec++;
          store.records[k] = ext.records[k];
        });
        (ext.stars || []).forEach(function (id) {
          if (store.stars.indexOf(id) < 0) { store.stars.push(id); nStar++; }
        });
        (ext.wrongs || []).forEach(function (id) {
          if (store.wrongs.indexOf(id) < 0) { store.wrongs.push(id); nWrong++; }
        });
        save();
        updateBadges();
        renderStats();
        alert('导入成功！新增做题记录 ' + nRec + ' 条、收藏 ' + nStar + ' 个、错题 ' + nWrong + ' 个');
      } catch (e) {
        alert('导入失败：不是有效的备份文件（应为本应用导出的 .json 文件）');
      }
    };
    reader.readAsText(file);
  }

  /* ================= 练习页 ================= */
  // ctx: {title, list, back, collection}
  var P = null; // 当前练习状态

  function openPractice(ctx) {
    var filtered = ctx.list.slice();
    P = {
      ctx: ctx,
      all: ctx.list.slice(),
      list: filtered,
      idx: 0,
      filter: 'all',     // all | undone | wrong
      recite: false,      // 背题模式
      picked: [],         // 多选暂存
      submitted: {}       // 本次会话内已提交的题（qid -> true），用于渲染
    };
    // 定位到第一道未做的题
    var firstUndone = filtered.findIndex(function (q) { return !store.records[q.id]; });
    if (firstUndone > 0) P.idx = firstUndone;
    renderPractice();
  }

  function applyFilter() {
    var f = P.filter;
    P.list = P.all.filter(function (q) {
      var r = store.records[q.id];
      if (f === 'undone') return !r;
      if (f === 'wrong') return r && !r.ok;
      return true;
    });
    if (P.idx >= P.list.length) P.idx = Math.max(0, P.list.length - 1);
  }

  function renderPractice() {
    var ctx = P.ctx;
    var head =
      '<div class="practice-head">' +
      '<button class="btn" id="btn-back">← 返回</button>' +
      '<div class="title">' + esc(ctx.title) + '</div>' +
      '<div class="pill-group" id="filter-group">' +
      '<button class="pill' + (P.filter === 'all' ? ' active' : '') + '" data-f="all">全部</button>' +
      '<button class="pill' + (P.filter === 'undone' ? ' active' : '') + '" data-f="undone">未做</button>' +
      '<button class="pill' + (P.filter === 'wrong' ? ' active' : '') + '" data-f="wrong">做错</button>' +
      '</div>' +
      '<button class="btn' + (P.recite ? ' primary' : '') + '" id="btn-recite">' + (P.recite ? '📖 背题模式' : '📖 刷题模式') + '</button>' +
      '<button class="btn" id="btn-shuffle">🔀 乱序</button>' +
      '</div>';
    main.innerHTML = head + '<div class="practice-layout"><div id="q-area"></div><div id="sheet-area"></div></div>';

    document.getElementById('btn-back').addEventListener('click', function () { go(ctx.back); });
    document.getElementById('btn-recite').addEventListener('click', function () {
      P.recite = !P.recite;
      renderPractice();
    });
    document.getElementById('btn-shuffle').addEventListener('click', function () {
      for (var i = P.all.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = P.all[i]; P.all[i] = P.all[j]; P.all[j] = t;
      }
      applyFilter();
      P.idx = 0;
      renderPractice();
    });
    main.querySelectorAll('#filter-group .pill').forEach(function (b) {
      b.addEventListener('click', function () {
        P.filter = b.dataset.f;
        applyFilter();
        P.idx = 0;
        renderPractice();
      });
    });
    renderQuestion();
    renderSheet();
  }

  function renderQuestion() {
    var area = document.getElementById('q-area');
    if (!P.list.length) {
      area.innerHTML = '<div class="q-card"><div class="empty"><div class="big">🈳</div>当前筛选条件下没有题目</div></div>';
      return;
    }
    var q = P.list[P.idx];
    var r = store.records[q.id];
    // 刷题模式：本次会话提交过才显示判题；背题模式直接显示答案解析
    var showAnswer = P.recite || !!P.submitted[q.id];
    var typeTag = q.type === 'multi' ? '<span class="tag multi">多选题</span>' : '<span class="tag single">单选题</span>';
    var starred = store.stars.indexOf(q.id) >= 0;
    var srcName = SRC_MAP[q.src] ? SRC_MAP[q.src].name : q.src;
    var chapName = CHAP_MAP[q.chap] ? CHAP_MAP[q.chap].title : q.chap;

    var html = '<div class="q-card">' +
      '<div class="q-meta">' + typeTag +
      '<span class="tag chap">' + esc(chapName) + '</span>' +
      '<span class="tag src">' + esc(srcName) + '</span>' +
      '<span class="q-index">' + (P.idx + 1) + ' / ' + P.list.length + '</span>' +
      '<button class="star-btn' + (starred ? ' on' : '') + '" id="btn-star" title="收藏/取消收藏">★</button>' +
      '</div>' +
      '<div class="q-text">' + renderText(q.q) + '</div>' +
      '<div class="opts" id="opts">';

    var ansSet = q.ans.split('');
    q.opts.forEach(function (o, i) {
      var key = String.fromCharCode(65 + i);
      var cls = 'opt';
      if (showAnswer) {
        cls += ' disabled';
        var isAns = ansSet.indexOf(key) >= 0;
        var myPick = P.recite ? [] : (P.submitted[q.id] ? P.submitted[q.id] : (r ? r.my.split('') : []));
        var iPicked = myPick.indexOf(key) >= 0;
        if (isAns && iPicked) cls += ' right';
        else if (isAns && !iPicked) cls += (P.recite ? ' right' : ' miss');
        else if (!isAns && iPicked) cls += ' wrong';
      } else if (P.picked.indexOf(key) >= 0) {
        cls += ' picked';
      }
      html += '<div class="' + cls + '" data-k="' + key + '"><span class="k">' + key + '</span><span>' + renderText(o) + '</span></div>';
    });
    html += '</div>';

    // 判题反馈 / 解析
    if (showAnswer) {
      var myAns = P.recite ? null : (P.submitted[q.id] ? P.submitted[q.id].join('') : (r ? r.my : ''));
      var isOk = myAns === q.ans;
      if (P.recite) {
        html += '<div class="verdict ok"><div class="head">✅ 正确答案：' + q.ans.split('').join('、') + '</div>' +
          (q.exp ? '<div class="exp"><b>解析：</b>' + renderText(q.exp) + '</div>' : '') + '</div>';
      } else {
        html += '<div class="verdict ' + (isOk ? 'ok' : 'ng') + '">' +
          '<div class="head">' + (isOk ? '✅ 回答正确！' : '❌ 回答错误') + '</div>' +
          '你的答案：' + (myAns ? myAns.split('').join('、') : '（未作答）') + ' ｜ 正确答案：' + q.ans.split('').join('、') +
          (q.exp ? '<div class="exp"><b>解析：</b>' + renderText(q.exp) + '</div>' : '<div class="exp" style="color:var(--text2)">（本题暂无文字解析）</div>') +
          '</div>';
      }
    }

    // 操作按钮
    html += '<div class="q-actions">' +
      '<button class="btn" id="btn-prev"' + (P.idx === 0 ? ' disabled' : '') + '>上一题</button>' +
      '<button class="btn" id="btn-next"' + (P.idx >= P.list.length - 1 ? ' disabled' : '') + '>下一题</button>';
    if (!showAnswer && q.type === 'multi') {
      html += '<button class="btn primary" id="btn-submit"' + (P.picked.length ? '' : ' disabled') + '>提交答案</button>';
    }
    if (P.ctx.collection === 'stars') {
      html += '<span class="spacer"></span><button class="btn" id="btn-unstar">移出收藏夹</button>';
    }
    html += '</div></div>';

    area.innerHTML = html;

    /* 事件绑定 */
    document.getElementById('btn-star').addEventListener('click', function () {
      var on = toggleStar(q.id);
      this.classList.toggle('on', on);
      renderSheet();
    });
    document.getElementById('btn-prev').addEventListener('click', function () { moveTo(P.idx - 1); });
    document.getElementById('btn-next').addEventListener('click', function () { moveTo(P.idx + 1); });
    var unstar = document.getElementById('btn-unstar');
    if (unstar) unstar.addEventListener('click', function () {
      toggleStar(q.id);
      P.all = P.all.filter(function (x) { return x.id !== q.id; });
      applyFilter();
      if (!P.all.length) { go('stars'); return; }
      renderPractice();
    });

    if (!showAnswer) {
      area.querySelectorAll('.opt').forEach(function (optEl) {
        optEl.addEventListener('click', function () {
          var k = optEl.dataset.k;
          if (q.type === 'single') {
            submit(q, [k]);
          } else {
            var i = P.picked.indexOf(k);
            if (i >= 0) P.picked.splice(i, 1); else P.picked.push(k);
            renderQuestion();
          }
        });
      });
      var sb = document.getElementById('btn-submit');
      if (sb) sb.addEventListener('click', function () { submit(q, P.picked.slice()); });
    }
  }

  function submit(q, picks) {
    picks.sort();
    var my = picks.join('');
    var ok = my === q.ans;
    record(q.id, my, ok);
    P.submitted[q.id] = picks;
    P.picked = [];
    renderQuestion();
    renderSheet();
  }

  function moveTo(i) {
    if (i < 0 || i >= P.list.length) return;
    P.idx = i;
    P.picked = [];
    renderQuestion();
    renderSheet();
    var qa = document.getElementById('q-area');
    if (qa) qa.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderSheet() {
    var area = document.getElementById('sheet-area');
    if (!area) return;
    var p = progressOf(P.list);
    var html = '<div class="sheet"><div class="s-title"><span>答题卡</span>' +
      '<span class="rate">' + p.done + '/' + p.total + ' · 正确率 ' + (p.done ? Math.round(p.ok / p.done * 100) + '%' : '--') + '</span></div>' +
      '<div class="sheet-grid">';
    P.list.forEach(function (q, i) {
      var r = store.records[q.id];
      var cls = 'cell';
      if (r) cls += r.ok ? ' ok' : ' ng';
      if (i === P.idx) cls += ' cur';
      if (store.stars.indexOf(q.id) >= 0) cls += ' star';
      html += '<button class="' + cls + '" data-i="' + i + '">' + (i + 1) + '</button>';
    });
    html += '</div><div class="sheet-legend">' +
      '<span><span class="dot d-ok"></span>正确</span>' +
      '<span><span class="dot d-ng"></span>错误</span>' +
      '<span><span class="dot d-un"></span>未做</span>' +
      '<span>★ 已收藏</span></div></div>';
    area.innerHTML = html;
    area.querySelectorAll('.cell').forEach(function (c) {
      c.addEventListener('click', function () { moveTo(parseInt(c.dataset.i, 10)); });
    });
  }

  /* ================= 启动 ================= */
  document.getElementById('total-count').textContent = QS.length;
  updateBadges();
  go('home');
})();
