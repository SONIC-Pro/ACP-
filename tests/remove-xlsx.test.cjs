const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const api = require('../progress.js');
const app = path.resolve(__dirname, '..');
const root = path.resolve(app, '..');
const backup = path.join(root, 'recovery-20261030', '删除XLSX前完整备份');
function jsData(folder, name) {
  const s = fs.readFileSync(path.join(folder, name), 'utf8');
  return JSON.parse(s.slice(s.indexOf('{'), s.lastIndexOf('}') + 1));
}
const oldBank = jsData(backup, 'data.js');
const oldSeed = jsData(backup, 'recovery-seed.js');
const original = JSON.parse(fs.readFileSync(path.join(backup, 'acp-quiz-20261029.json'), 'utf8'));
function memory() { const m = new Map(); return { getItem: k => m.get(k) ?? null, setItem: (k,v) => m.set(k,v), m }; }
test('备份可用 10 月 29 日原始 JSON 恢复完整题库与全部原记录', () => {
  const engine = api.create(oldBank, oldSeed, oldSeed.knownLegacy, memory());
  assert.equal(oldBank.questions.length, 2535);
  assert.deepEqual(engine.readImport(original), original.store);
  assert.deepEqual(engine.load(), original.store);
});
test('移除整个 XLSX 来源，其他题目内容、ID 和原始记录完全保留', () => {
  const bank = jsData(app, 'data.js');
  const seed = jsData(app, 'recovery-seed.js');
  const keep = oldBank.questions.filter(q => q.src !== 'bank553xlsx');
  assert.deepEqual(bank.questions, keep);
  assert.equal(bank.questions.length, 2007);
  assert.notEqual(bank.bankId, oldBank.bankId);
  assert.equal(bank.sources.some(s => s.id === 'bank553xlsx'), false);
  const ids = new Set(keep.map(q => q.id));
  const records = Object.fromEntries(Object.entries(original.store.records).filter(([id]) => ids.has(id)));
  assert.deepEqual(seed.store.records, records);
  assert.deepEqual(seed.store.stars, original.store.stars);
  assert.deepEqual(seed.store.wrongs, original.store.wrongs);
  assert.equal(Object.keys(records).length, 209);
  const engine = api.create(bank, seed, seed.knownLegacy, memory());
  assert.deepEqual(engine.load(), seed.store);
  assert.throws(() => engine.readImport(original), /旧格式/);
});
