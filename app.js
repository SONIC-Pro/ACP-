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

  /* ================= 本地存储 + 外层防丢失 ================= */
  var recovery = window.QUIZ_RECOVERY;
  var progress, guard, store, booted = false, pendingGate = false;
  try {
    progress = window.QuizProgress.create(DATA, recovery,
      recovery && recovery.bankId === DATA.bankId ? recovery.knownLegacy : [], localStorage);
    guard = window.QuizGuard.create(localStorage, DATA.bankId);
    // 场景 a：进度键消失但恢复种子还在 → 疑似整站数据被清，明确警告，绝不静默播种
    var emptyInfo = guard.detectEmpty(progress.key, recovery && recovery.bankId === DATA.bankId);
    if (emptyInfo && emptyInfo.hasSeed) {
      var proceed = confirm(
        '⚠️ 浏览器数据疑似被清除\n\n' +
        '应用找不到任何本地进度（localStorage 为空），但内置的 10/30 恢复种子存在。\n' +
        '直接继续会用 10/30 存档播种，你最近的作答可能已经丢失。\n\n' +
        '【取消】= 先导入最新备份文件（推荐）\n【确定】= 知晓风险，继续用播种存档');
      if (!proceed) {
        pendingGate = true; // 不播种、不写入，先进恢复引导页；恢复后由 boot() 正常启动
        store = { records: {}, stars: [], wrongs: [] };
      }
    }
    if (!pendingGate) {
      store = progress.load();
      if (guard.watermark() === null) guard.markSaved(Object.keys(store.records).length); // 首次启用防护：以现状建立水位线
    }
  } catch (e) {
    document.getElementById('main').textContent = '已停止加载以保护原记录：' + e.message;
    return;
  }
  // 场景 b：非显式操作导致记录数骤降 → 拒绝写入；成功后刷新水位线并调度自动备份
  function save(explicit) {
    var count = Object.keys(store.records).length;
    var res = guard.checkSave(count);
    if (!res.ok && !explicit) {
      alert('⛔ 已拒绝写入（数据骤降保护）\n\n当前作答数 ' + count + ' 条，少于上次保存时的 ' + res.prev +
        ' 条，且这不是显式操作（重做/重置/导入）。存储未被改动。\n' +
        '请先"📤 导出进度"保全现场，再判断原因；必要时用"📥 导入进度"从备份恢复。');
      return false;
    }
    progress.save(store);
    guard.markSaved(count);
    scheduleBackup();
    return true;
  }

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
  // 重做本题：清空已做记录，错题本同步移除；收藏不受影响
  function redo(qid) {
    if (!confirm('确定要重做这道题吗？\n\n将清空这道题的已做记录；若错题本中有这道题，也会一并移除。收藏不受影响。')) return;
    delete store.records[qid];
    var wi = store.wrongs.indexOf(qid);
    if (wi >= 0) store.wrongs.splice(wi, 1);
    save(true); // 显式操作：重做导致记录数减 1，不走骤降拦截
    updateBadges();
    delete P.submitted[qid]; // 本次会话内也恢复为未作答
    P.picked = [];
    renderQuestion();
    renderSheet();
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
      (recovery && recovery.bankId === DATA.bankId ?
        '<div class="page-sub">已移除 XLSX 题库及其中 4 条作答，其他历史作答、收藏和错题保留。<a href="recovery-review.html" target="_blank">查看移除前的原始恢复核对清单</a></div>' : '') +
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
      '<p style="margin-top:10px"><button class="btn" id="btn-backup-dir">🗄️ ' +
      (dirHandle && backupNeedsPermission ? '🔑 点击恢复自动备份授权' : (dirHandle ? '🗄️ 重新选择 / 停用自动备份文件夹' : '🗄️ 设置自动备份文件夹')) +
      '</button><br><span class="page-sub">' + esc(backupStatusText()) + '</span></p>' +
      '<p class="page-sub" style="margin-top:8px">导出包含完整题库快照与进度。同题库导入按作答时间合并，收藏取并集；不同题库拒绝导入，避免错位。无题库的旧格式仅接受本次已核验的原始备份。</p>';
    main.innerHTML = html;
    document.getElementById('btn-export').addEventListener('click', exportProgress);
    document.getElementById('btn-backup-dir').addEventListener('click', function () {
      if (dirHandle && backupNeedsPermission) {
        dirHandle.requestPermission({ mode: 'readwrite' }).then(function (p) {
          if (p === 'granted') { backupNeedsPermission = false; doBackup(); renderStats(); }
        });
      } else if (dirHandle) {
        if (confirm('自动备份当前已启用。\n\n【确定】= 重新选择备份文件夹（需再次授权）\n【取消】= 停用自动备份（只清除授权设置，不删除已备份文件）')) pickBackupDir();
        else {
          dirHandle = null; backupNeedsPermission = false; lastBackupName = null;
          idbDel('backupDir').then(function () { refreshGuardUI(); renderStats(); });
        }
      } else pickBackupDir();
    });
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
        save(true); // 显式重置：允许骤降（归零）
        updateBadges();
        renderStats();
      }
    });
  }

  /* ================= 进度导出 / 导入（跨设备同步） ================= */
  function exportProgress() {
    var d = new Date();
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var data = JSON.stringify(progress.export(store), null, 2);
    var blob = new Blob([data], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'acp-quiz-' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    guard.markExported(Object.keys(store.records).length, Date.now()); // 催导出横幅据此消失
    refreshGuardUI();
  }

  function importProgress(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        var ext = progress.readImport(data);
        var next = progress.merge(store, ext);
        store = next;
        save(true); // 导入合并只增不减，显式操作不受骤降拦截
        updateBadges();
        renderStats();
        alert('导入完成！当前做题记录 ' + Object.keys(store.records).length + ' 条、收藏 ' + store.stars.length + ' 个、错题 ' + store.wrongs.length + ' 个');
      } catch (e) {
        alert('导入失败：' + e.message + '\n现有记录未改动。');
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
    var trailing = '';
    if (store.records[q.id]) trailing += '<button class="btn" id="btn-redo" title="清空本题已做记录，错题本同步移除，收藏保留">🔄 重做本题</button>';
    if (P.ctx.collection === 'stars') trailing += '<button class="btn" id="btn-unstar">移出收藏夹</button>';
    if (trailing) html += '<span class="spacer"></span>' + trailing;
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
    var redoBtn = document.getElementById('btn-redo');
    if (redoBtn) redoBtn.addEventListener('click', function () { redo(q.id); });
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

  /* ================= 自动备份到磁盘（File System Access API） ================= */
  var FS_SUPPORTED = typeof window.showDirectoryPicker === 'function';
  var dirHandle = null, backupNeedsPermission = false, lastBackupName = null, backupError = null;
  var backupTimer = null;

  function idbOpen() {
    return new Promise(function (resolve, reject) {
      var req = indexedDB.open('acp-quiz-guard', 1);
      req.onupgradeneeded = function () { req.result.createObjectStore('kv'); };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  }
  function idbOp(mode, fn) {
    return idbOpen().then(function (db) {
      return new Promise(function (resolve, reject) {
        var tx = db.transaction('kv', mode);
        fn(tx.objectStore('kv'));
        tx.oncomplete = function () { resolve(); };
        tx.onerror = function () { reject(tx.error); };
      });
    });
  }
  function idbGet(key) {
    return idbOpen().then(function (db) {
      return new Promise(function (resolve, reject) {
        var req = db.transaction('kv', 'readonly').objectStore('kv').get(key);
        req.onsuccess = function () { resolve(req.result === undefined ? null : req.result); };
        req.onerror = function () { reject(req.error); };
      });
    });
  }
  function idbSet(key, val) { return idbOp('readwrite', function (s) { s.put(val, key); }); }
  function idbDel(key) { return idbOp('readwrite', function (s) { s.delete(key); }); }

  function backupStatusText() {
    if (!FS_SUPPORTED) return '当前环境不支持 File System Access API（如 file:// 直接打开或旧浏览器），自动备份不可用，请务必定期手动导出。';
    if (dirHandle && backupNeedsPermission) return '自动备份文件夹已配置，但浏览器要求重新授权，点击上方按钮恢复。';
    if (dirHandle) return '自动备份已启用：防抖 30 秒写入带时间戳 JSON，保留最近 ' + window.QuizGuard.KEEP_BACKUPS +
      ' 份轮转' + (lastBackupName ? '，最新：' + lastBackupName : '') + (backupError ? '；上次失败：' + backupError : '');
    return '尚未配置：选择一个备份文件夹后，每次作答保存会自动写出完整 JSON 备份。';
  }

  function pickBackupDir() {
    if (!FS_SUPPORTED) {
      alert('当前浏览器/环境不支持 File System Access API（file:// 打开或旧浏览器），无法自动备份到磁盘，请使用"📤 导出进度"手动备份。');
      return;
    }
    window.showDirectoryPicker({ mode: 'readwrite', id: 'acp-quiz-backup' }).then(function (h) {
      dirHandle = h; backupNeedsPermission = false; backupError = null;
      return idbSet('backupDir', h);
    }).then(doBackup).then(function () {
      alert('自动备份已设置。备份文件名格式：acp-quiz-backup-YYYYMMDD-HHMMSS.json，保留最近 ' + window.QuizGuard.KEEP_BACKUPS + ' 份。');
      if (document.querySelector('.nav-btn.active[data-nav="stats"]')) renderStats();
    }).catch(function (e) {
      if (e && e.name === 'AbortError') return; // 用户取消选择
      backupError = e && e.message ? e.message : String(e);
      alert('设置自动备份失败：' + backupError + '\n（file:// 环境下此 API 不可用，请改用手动导出。）');
      refreshGuardUI();
    });
  }

  function scheduleBackup(delay) {
    if (!dirHandle) return;
    clearTimeout(backupTimer);
    backupTimer = setTimeout(doBackup, delay || 30000);
  }

  function doBackup() {
    if (!dirHandle) return Promise.resolve();
    clearTimeout(backupTimer); backupTimer = null;
    return Promise.resolve().then(function () {
      if (!dirHandle.queryPermission) return;
      return dirHandle.queryPermission({ mode: 'readwrite' }).then(function (p) {
        if (p === 'granted') return;
        backupNeedsPermission = true;
        throw new Error('备份文件夹权限待用户重新授权');
      });
    }).then(function () {
      var name = window.QuizGuard.backupName(new Date());
      var payload = progress.export(store);
      payload.guard = { watermark: Object.keys(store.records).length, via: 'auto' }; // 水位线双写；readImport 忽略额外字段
      return dirHandle.getFileHandle(name, { create: true }).then(function (fh) {
        return fh.createWritable().then(function (w) {
          return w.write(JSON.stringify(payload, null, 2)).then(function () { return w.close(); });
        });
      }).then(function () { lastBackupName = name; });
    }).then(function () {
      var names = [];
      var it = dirHandle.values();
      function step() {
        return it.next().then(function (r) {
          if (r.done) return;
          if (r.value && r.value.kind === 'file' && r.value.name.indexOf(window.QuizGuard.BACKUP_PREFIX) === 0) names.push(r.value.name);
          return step();
        });
      }
      return step().then(function () {
        return window.QuizGuard.planRotation(names, window.QuizGuard.KEEP_BACKUPS)
          .reduce(function (p, n) { return p.then(function () { return dirHandle.removeEntry(n); }); }, Promise.resolve());
      });
    }).then(function () {
      backupError = null; backupNeedsPermission = false;
      refreshGuardUI();
    }).catch(function (e) {
      backupError = e && e.message ? e.message : String(e);
      refreshGuardUI();
    });
  }

  // 页面隐藏/关闭时尽力补刷未落盘的备份（异步写不保证完成，见边界说明）
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden' && backupTimer) doBackup();
  });
  window.addEventListener('pagehide', function () { if (backupTimer) doBackup(); });

  function initBackup() {
    if (!FS_SUPPORTED) return;
    idbGet('backupDir').then(function (h) {
      if (!h) return null;
      dirHandle = h;
      return h.queryPermission ? h.queryPermission({ mode: 'readwrite' }) : 'granted';
    }).then(function (perm) {
      if (dirHandle && perm === 'granted') scheduleBackup(5000); // 启动 5 秒后补一份，缩小备份时间差
      else if (dirHandle) backupNeedsPermission = true;
      refreshGuardUI();
    }).catch(function () {});
  }

  /* ================= 防护横幅（页头下方常驻） ================= */
  function refreshGuardUI() {
    var area = document.getElementById('guard-area');
    if (!area) return;
    var html = '';
    if (booted && store) {
      var rem = guard.exportReminder(Date.now(), Object.keys(store.records).length);
      if (rem.show) html += '<div class="guard-banner danger">🔴 导出提醒：' + esc(rem.reason) + '。请到"📊 统计"页手动导出进度。</div>';
      if (!FS_SUPPORTED) html += '<div class="guard-banner warn">⚠️ 当前环境无法自动备份到磁盘（file:// 或浏览器限制），请定期手动导出。</div>';
      else if (!dirHandle) html += '<div class="guard-banner warn">💡 自动备份未配置：到"📊 统计"页选择备份文件夹（自动保留最近 ' + window.QuizGuard.KEEP_BACKUPS + ' 份带时间戳 JSON）。</div>';
      else if (backupNeedsPermission) html += '<div class="guard-banner warn">🔑 自动备份权限待确认：到"📊 统计"页点击"恢复自动备份授权"。</div>';
      else if (backupError) html += '<div class="guard-banner warn">⚠️ 上次自动备份失败：' + esc(backupError) + '</div>';
    }
    area.innerHTML = html;
  }

  /* ================= 空档恢复引导页（场景 a 用户选择先导入时） ================= */
  function renderRecoveryGate() {
    main.innerHTML = '<h2 class="page-title">🛡️ 本地进度数据缺失</h2>' +
      '<div class="page-sub">浏览器数据疑似被清除（例如执行过"清除 Cookie 和其他网站数据"）。为避免用旧种子覆盖现场，应用尚未载入任何数据。</div>' +
      '<div class="card-grid"><div class="chap-card" id="gate-import"><div class="t">📥 导入备份文件恢复（推荐）</div>' +
      '<div class="meta"><span>选择 acp-quiz-*.json（手动导出或自动备份均可）</span></div></div>' +
      '<div class="chap-card" id="gate-seed"><div class="t">⚠️ 用 10/30 播种存档继续</div>' +
      '<div class="meta"><span>接受近期进度丢失，仅在没有任何备份时选择</span></div></div></div>';
    document.getElementById('gate-import').addEventListener('click', function () {
      var inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = '.json,application/json';
      inp.onchange = function () {
        if (!inp.files || !inp.files[0]) return;
        var reader = new FileReader();
        reader.onload = function () {
          try {
            var ext = progress.readImport(JSON.parse(reader.result));
            store = ext;
            progress.save(store);
            guard.markSaved(Object.keys(store.records).length);
            alert('恢复完成！作答 ' + Object.keys(store.records).length + ' 条、收藏 ' + store.stars.length + ' 个、错题 ' + store.wrongs.length + ' 个');
            boot();
          } catch (e) {
            alert('导入失败：' + e.message + '\n应用仍未载入任何数据，可重试或换一份备份。');
          }
        };
        reader.readAsText(inp.files[0]);
      };
      inp.click();
    });
    document.getElementById('gate-seed').addEventListener('click', function () {
      try {
        store = progress.load();
        if (guard.watermark() === null) guard.markSaved(Object.keys(store.records).length);
        boot();
      } catch (e) {
        alert('播种失败：' + e.message);
      }
    });
  }

  /* ================= 启动 ================= */
  function boot() {
    booted = true;
    document.getElementById('total-count').textContent = QS.length;
    updateBadges();
    go('home');
    initBackup();
    refreshGuardUI();
  }
  if (pendingGate) renderRecoveryGate();
  else boot();
})();
