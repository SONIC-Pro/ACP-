/* 进度必须与题库内容绑定；旧数字 ID 本身不代表题目身份。 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.QuizProgress = factory();
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function canonical(value) {
    if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
    if (value && typeof value === 'object') {
      return '{' + Object.keys(value).sort().map(function (k) {
        return JSON.stringify(k) + ':' + canonical(value[k]);
      }).join(',') + '}';
    }
    return JSON.stringify(value);
  }
  function create(bank, seed, knownLegacy, storage) {
    if (!bank.bankId) throw new Error('题库缺少版本标识，请勿将旧进度直接挂到新题库。');
    var key = 'acp_quiz_v2_' + bank.bankId;
    var qm = Object.create(null);
    bank.questions.forEach(function (q) {
      if (qm[q.id]) throw new Error('题库中存在重复 ID：' + q.id);
      qm[q.id] = q;
    });
    var bankContent = canonical(bank.questions);
    var legacyContent = (knownLegacy || []).map(canonical);
    function validate(store) {
      if (!store || !store.records || Array.isArray(store.records) ||
          !Array.isArray(store.stars) || !Array.isArray(store.wrongs)) {
        throw new Error('进度结构不正确，原记录未改动。');
      }
      Object.keys(store.records).forEach(function (id) {
        var r = store.records[id];
        if (!qm[id]) throw new Error('题库中找不到记录对应的题目：' + id);
        if (!r || typeof r.my !== 'string' || !/^[A-Z]+$/.test(r.my) ||
            typeof r.ok !== 'boolean' || !Number.isFinite(r.ts) ||
            (r.my === qm[id].ans) !== r.ok) {
          throw new Error('作答与当前题库不符：' + id);
        }
      });
      store.stars.concat(store.wrongs).forEach(function (id) {
        if (!qm[id]) throw new Error('题库中找不到收藏或错题：' + id);
      });
      var expected = Object.keys(store.records).filter(function (id) { return !store.records[id].ok; });
      if (canonical(expected.sort()) !== canonical(store.wrongs.slice().sort()) ||
          new Set(store.stars).size !== store.stars.length) {
        throw new Error('错题或收藏集合与作答不一致，原记录未改动。');
      }
      return clone(store);
    }
    function snapshot(store) {
      var out = {};
      Object.keys(store.records).concat(store.stars, store.wrongs).forEach(function (id) {
        var q = qm[id];
        out[id] = { id: q.id, q: q.q, opts: q.opts, ans: q.ans, type: q.type, chap: q.chap };
      });
      return clone(out);
    }
    function save(store) {
      var clean = validate(store);
      storage.setItem(key, JSON.stringify({ bankId: bank.bankId, store: clean, questions: snapshot(clean) }));
    }
    function load() {
      var raw = storage.getItem(key);
      if (raw !== null) {
        var saved = JSON.parse(raw);
        if (saved.bankId !== bank.bankId) throw new Error('存储的题库版本不符，已停止加载。');
        var clean = validate(saved.store);
        if (canonical(saved.questions) !== canonical(snapshot(clean))) {
          throw new Error('题库内容与存储快照不符，已停止加载并保留原记录。');
        }
        return clean;
      }
      var initial = seed && seed.bankId === bank.bankId ? validate(seed.store) : { records: {}, stars: [], wrongs: [] };
      if (seed && seed.bankId === bank.bankId && seed.questions &&
          canonical(seed.questions) !== canonical(snapshot(initial))) {
        throw new Error('恢复快照与当前题库内容不符。');
      }
      save(initial);
      return initial;
    }
    function readImport(data) {
      if (data && data.v === 2) {
        if (!data.bank || data.bankId !== bank.bankId || data.bank.bankId !== bank.bankId ||
            canonical(data.bank.questions) !== bankContent) {
          throw new Error('备份题库与当前题库不同，已拒绝导入。请先恢复备份自带的题库，不能按数字 ID 猜测对应。');
        }
      } else if (!data || data.v !== 1 || legacyContent.indexOf(canonical(data.store)) < 0) {
        throw new Error('旧格式备份不含题目内容；仅接受本次已逐题核验的原始备份，其他旧格式已拒绝导入。');
      }
      return validate(data.store);
    }
    function merge(current, incoming) {
      var out = validate(current);
      var ext = validate(incoming);
      Object.keys(ext.records).forEach(function (id) {
        if (!out.records[id] || ext.records[id].ts > out.records[id].ts) out.records[id] = ext.records[id];
      });
      ext.stars.forEach(function (id) { if (out.stars.indexOf(id) < 0) out.stars.push(id); });
      out.wrongs = Object.keys(out.records).filter(function (id) { return !out.records[id].ok; });
      return validate(out);
    }
    return {
      key: key, load: load, save: save, readImport: readImport, merge: merge,
      export: function (store) {
        return { v: 2, ts: new Date().toISOString(), bankId: bank.bankId, bank: clone(bank), store: validate(store) };
      }
    };
  }
  return { create: create };
});
