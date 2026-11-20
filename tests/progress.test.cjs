const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const dir = path.resolve(__dirname, '..');
const root = path.resolve(dir, '..');
const dataText = fs.readFileSync(path.join(root, 'recovery-20261030/candidate-september.js'), 'utf8');
const bank = JSON.parse(dataText.slice(dataText.indexOf('{'), dataText.lastIndexOf('}') + 1));
bank.bankId = 'september-test-bank';
const original = JSON.parse(fs.readFileSync(path.join(root, 'acp-quiz-20261029.json'), 'utf8'));
const earlier = JSON.parse(fs.readFileSync(path.join(root, '刷题/acp-quiz-20260917.json'), 'utf8'));
const seed = { v: 2, bankId: bank.bankId, store: original.store };
let api;
try { api = require('../progress.js'); } catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') throw e;
  api = { create() { throw new Error('尚未实现题库绑定与恢复存储'); } };
}
function memoryStorage() {
  const map = new Map([['acp_quiz_v1', '{"polluted":true}']]);
  return { getItem: k => map.has(k) ? map.get(k) : null, setItem: (k, v) => map.set(k, v), map };
}
function setup() {
  const storage = memoryStorage();
  return { storage, engine: api.create(bank, seed, [original.store, earlier.store], storage) };
}
test('真实事故备份恢复 213 作答、20 收藏、41 错题，保持每项原值', () => {
  const { engine } = setup();
  assert.deepEqual(engine.load(), original.store);
  const qm = new Map(bank.questions.map(q => [q.id, q]));
  for (const [id, r] of Object.entries(engine.load().records)) {
    assert.equal(qm.get(id).chap, '2.1');
    assert.equal(r.my === qm.get(id).ans, r.ok, id);
  }
});
test('新存储与错位的 acp_quiz_v1 隔离，刷新保留新作答', () => {
  const { engine, storage } = setup();
  const store = engine.load();
  store.records['ex0-0'] = { my: 'A', ok: false, ts: Date.now() };
  if (!store.wrongs.includes('ex0-0')) store.wrongs.push('ex0-0');
  engine.save(store);
  assert.equal(engine.load().records['ex0-0'].my, 'A');
  assert.equal(storage.getItem('acp_quiz_v1'), '{"polluted":true}');
});
test('导出携带完整题库快照并可原样重新导入', () => {
  const { engine } = setup();
  const exported = engine.export(engine.load());
  assert.deepEqual(exported.bank.questions, bank.questions);
  assert.equal(exported.bankId, bank.bankId);
  assert.deepEqual(engine.readImport(JSON.parse(JSON.stringify(exported))), original.store);
});
test('同 ID 但题干或选项不同的备份被拒绝，不能靠数字 ID 对齐', () => {
  const { engine } = setup();
  for (const mutate of [q => q.q += ' changed', q => q.opts.reverse()]) {
    const exported = engine.export(engine.load());
    mutate(exported.bank.questions[0]);
    assert.throws(() => engine.readImport(exported), /题库/);
  }
});
test('已核验的旧备份可导入，未经核验的无题库备份拒绝且不改存储', () => {
  const { engine, storage } = setup();
  assert.deepEqual(engine.readImport(original), original.store);
  assert.deepEqual(engine.readImport(earlier), earlier.store);
  const before = JSON.stringify([...storage.map]);
  const guessed = structuredClone(original);
  guessed.store.stars.push('ex0-0');
  assert.throws(() => engine.readImport(guessed), /旧格式/);
  assert.equal(JSON.stringify([...storage.map]), before);
});
test('合并按时间保留较新作答，旧错题集合不能把已答对题重新变为错题', () => {
  const { engine } = setup();
  const current = structuredClone(original.store);
  const incoming = structuredClone(original.store);
  current.records['ex0-0'] = { my: 'C', ok: true, ts: 9999 };
  current.wrongs = current.wrongs.filter(id => id !== 'ex0-0');
  incoming.records['ex0-0'] = { my: 'A', ok: false, ts: 1000 };
  if (!incoming.wrongs.includes('ex0-0')) incoming.wrongs.push('ex0-0');
  const merged = engine.merge(current, incoming);
  assert.equal(merged.records['ex0-0'].my, 'C');
  assert.equal(merged.wrongs.includes('ex0-0'), false);
  assert.deepEqual(current.records['ex0-0'], { my: 'C', ok: true, ts: 9999 });
});
test('存储损坏或题库发生变化时停止，不回退重置成 213 条掩盖问题', () => {
  const { engine, storage } = setup();
  engine.load();
  storage.setItem(engine.key, '{broken');
  assert.throws(() => engine.load());
  storage.setItem(engine.key, JSON.stringify({ bankId: 'other', store: original.store }));
  assert.throws(() => engine.load(), /题库/);
});
test('导出对象独立，修改备份不改变运行中的题库或种子', () => {
  const { engine } = setup();
  const a = engine.export(engine.load());
  a.bank.questions[0].opts.reverse();
  a.store.stars.length = 0;
  assert.deepEqual(engine.load(), original.store);
  assert.notDeepEqual(a.bank.questions[0].opts, bank.questions[0].opts);
});
