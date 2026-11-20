/* 数据防丢失外层防护（不改动 progress.js 核心校验语义）：
   水位线骤降拦截、空档识别、备份文件轮转、导出提醒。纯逻辑、无 DOM 依赖，可在 node 下测试。 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.QuizGuard = factory();
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  var BACKUP_PREFIX = 'acp-quiz-backup-';
  var BACKUP_RE = /^acp-quiz-backup-\d{8}-\d{6}\.json$/;
  var DAY_MS = 86400000;
  var KEEP_BACKUPS = 10;
  var EXPORT_STALE_DAYS = 7;
  var EXPORT_STALE_COUNT = 50;

  function pad(n) { return String(n).padStart(2, '0'); }
  // 备份文件名含时间戳，字典序 == 时间序，轮转直接 sort 即可
  function backupName(date) {
    return BACKUP_PREFIX + date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate()) +
      '-' + pad(date.getHours()) + pad(date.getMinutes()) + pad(date.getSeconds()) + '.json';
  }
  // 返回应删除的旧备份名（最旧的超出 keep 部分）；非备份格式文件名忽略
  function planRotation(names, keep) {
    var valid = names.filter(function (n) { return BACKUP_RE.test(n); });
    valid.sort();
    return valid.slice(0, Math.max(0, valid.length - keep));
  }

  function create(storage, bankId) {
    var wmKey = 'acp_guard_wm_' + bankId;
    var exKey = 'acp_guard_lastexport_' + bankId;
    function watermark() {
      var raw = storage.getItem(wmKey);
      if (raw === null) return null;
      var n = parseInt(raw, 10);
      return isNaN(n) ? null : n;
    }
    function markSaved(count) { storage.setItem(wmKey, String(count)); }
    // 场景 b：运行中记录数低于水位线视为异常骤降；显式操作（重做/重置/导入合并）由调用方 bypass
    function checkSave(count) {
      var prev = watermark();
      if (prev !== null && count < prev) return { ok: false, prev: prev, count: count };
      return { ok: true, prev: prev, count: count };
    }
    // 场景 a：进度键消失（整站数据被清）→ 返回警告信息供 UI 拦截，绝不静默播种
    function detectEmpty(progressKey, hasSeed) {
      if (storage.getItem(progressKey) !== null) return null;
      return { empty: true, hasSeed: !!hasSeed, lastWatermark: watermark() };
    }
    function markExported(count, now) {
      storage.setItem(exKey, JSON.stringify({ ts: now, count: count }));
    }
    function exportReminder(now, count) {
      var raw = storage.getItem(exKey);
      if (!raw) return { show: true, reason: '还没有任何手动导出记录，数据只存在于浏览器里' };
      var d;
      try { d = JSON.parse(raw); } catch (e) { return { show: true, reason: '导出时间记录损坏，请手动导出一次' }; }
      var days = Math.floor((now - d.ts) / DAY_MS);
      if (days >= EXPORT_STALE_DAYS) return { show: true, reason: '距上次手动导出已超过 ' + days + ' 天' };
      if (count - d.count >= EXPORT_STALE_COUNT) return { show: true, reason: '上次导出以来累计新增 ' + (count - d.count) + ' 条作答' };
      return { show: false, reason: '' };
    }
    return {
      wmKey: wmKey, exKey: exKey,
      watermark: watermark, markSaved: markSaved, checkSave: checkSave,
      detectEmpty: detectEmpty, markExported: markExported, exportReminder: exportReminder
    };
  }
  return {
    create: create, backupName: backupName, planRotation: planRotation,
    BACKUP_PREFIX: BACKUP_PREFIX, KEEP_BACKUPS: KEEP_BACKUPS
  };
});
