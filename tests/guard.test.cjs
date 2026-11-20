/* 外层防丢失逻辑测试：骤降拦截、空档识别触发条件、备份轮转、导出提醒 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const guard = require(path.join(__dirname, '..', 'guard.js'));

function memoryStorage() {
  const map = new Map();
  return {
    getItem: k => map.has(k) ? map.get(k) : null,
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: k => map.delete(k),
    map
  };
}
const DAY = 86400000;

test('水位线骤降拦截：低于水位线拒绝，等于/高于放行，markSaved 后水位线前移', () => {
  const g = guard.create(memoryStorage(), 'bankX');
  g.markSaved(10);
  assert.deepEqual(g.checkSave(8), { ok: false, prev: 10, count: 8 });
  assert.equal(g.checkSave(10).ok, true);
  assert.equal(g.checkSave(12).ok, true);
  g.markSaved(12);
  assert.equal(g.watermark(), 12);
  assert.equal(g.checkSave(11).ok, false); // 水位线已前移到 12
});

test('首次启用防护：无水位线时任何保存都放行', () => {
  const g = guard.create(memoryStorage(), 'bankX');
  assert.equal(g.watermark(), null);
  assert.equal(g.checkSave(0).ok, true);
});

test('空档识别：进度键消失才报警告；键存在返回 null；种子与水位线信息透传', () => {
  const st = memoryStorage();
  const g = guard.create(st, 'bankX');
  const key = 'acp_quiz_v2_bankX';
  const info = g.detectEmpty(key, true); // 存储全空 + 有恢复种子 → 事故场景 a
  assert.equal(info.empty, true);
  assert.equal(info.hasSeed, true);
  assert.equal(info.lastWatermark, null);
  g.markSaved(353);
  st.setItem(key, '{"bankId":"bankX"}');
  assert.equal(g.detectEmpty(key, true), null); // 数据健在 → 不打扰
  st.removeItem(key); // 模拟整站清除：水位线同归于尽
  const info2 = g.detectEmpty(key, true);
  assert.equal(info2.lastWatermark, 353); // 水位线幸存场景（仅进度键被删）仍报出旧值
});

test('备份文件名：格式固定、字典序即时间序', () => {
  const d = new Date(2026, 10, 13, 9, 5, 3);
  assert.equal(guard.backupName(d), 'acp-quiz-backup-20261113-090503.json');
  const d2 = new Date(2026, 10, 13, 10, 0, 0);
  assert.ok(guard.backupName(d) < guard.backupName(d2));
});

test('备份轮转：13 份留 10 删最旧 3，非法文件名不碰', () => {
  const names = [];
  for (let i = 1; i <= 13; i++) names.push('acp-quiz-backup-20261113-' + String(i).padStart(6, '0') + '.json');
  names.push('notes.txt', 'acp-quiz-backup-badname.json', 'acp-quiz-20261110.json'); // 手动导出文件绝不能进删除名单
  const doomed = guard.planRotation(names, 10);
  assert.deepEqual(doomed, [
    'acp-quiz-backup-20261113-000001.json',
    'acp-quiz-backup-20261113-000002.json',
    'acp-quiz-backup-20261113-000003.json'
  ]);
  assert.deepEqual(guard.planRotation(names.slice(0, 5), 10), []); // 未超限不删
});

test('导出提醒：从未导出 / 超 7 天 / 新增满 50 条触发，导出后消失', () => {
  const st = memoryStorage();
  const g = guard.create(st, 'bankX');
  const now = Date.UTC(2026, 10, 13);
  assert.equal(g.exportReminder(now, 100).show, true); // 从未导出
  g.markExported(100, now - 8 * DAY);
  assert.equal(g.exportReminder(now, 100).show, true); // 8 天未导出
  g.markExported(100, now - DAY);
  assert.equal(g.exportReminder(now, 149).show, false); // 新增 49 条
  assert.equal(g.exportReminder(now, 150).show, true);  // 新增 50 条
  g.markExported(150, now);
  assert.equal(g.exportReminder(now, 150).show, false); // 刚导出 → 消失
});
