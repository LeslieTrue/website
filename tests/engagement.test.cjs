const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const source = readFileSync('public/blogs/scaling/engagement.js', 'utf8');
const prefix = 'scaling-engagement-v1:';
function setup(saved = {}) {
  const storage = new Map(Object.entries(saved).map(([k,v]) => [prefix+k, typeof v === 'string' ? v : JSON.stringify(v)]));
  const nodes = new Map();
  const node = key => { if (!nodes.has(key)) nodes.set(key, { textContent: '', handlers: {}, setAttribute() {}, addEventListener(k,f) { this.handlers[k] = f; } }); return nodes.get(key); };
  const root = node('root'); root.querySelector = node;
  const requests = [];
  vm.runInNewContext(source, { document: { documentElement: {lang:'en'}, querySelector: () => root }, localStorage: { getItem: k=>storage.get(k)||null, setItem:(k,v)=>storage.set(k,v) }, crypto: {randomUUID:()=> '00000000-0000-4000-8000-000000000001'}, AbortSignal, Date, window: {addEventListener() {}}, fetch: (url,options) => new Promise((resolve,reject)=>requests.push({ options, reject, finish: data=>resolve({ok:true,json:async()=>data}) })) });
  return {node, requests, storage};
}
const flush = () => new Promise(resolve => setImmediate(resolve));
test('saved counts display before either network request completes', () => {
  const app=setup({counts:{views:31,likes:2,savedAt:Date.now()}});
  assert.equal(app.node('[data-view-count]').textContent, '31');
  assert.equal(app.node('[data-like-count]').textContent, '2');
});
test('first visit reads counts without waiting for registration, then caches confirmation', async () => {
  const app=setup();
  const get=app.requests.find(r=>r.options.method==='GET');
  const post=app.requests.find(r=>r.options.method==='POST');
  assert.ok(get); assert.ok(post);
  get.finish({views:31,likes:2}); await flush();
  assert.equal(app.node('[data-view-count]').textContent,'31');
  assert.equal(JSON.parse(app.storage.get(prefix+'view')).recorded,undefined);
  post.finish({views:32,likes:2}); await flush();
  assert.equal(JSON.parse(app.storage.get(prefix+'view')).recorded,true);
  assert.equal(JSON.parse(app.storage.get(prefix+'counts')).views,32);
});
test('confirmed visit does not submit another view and late responses never lower counts', async () => {
  const app=setup({view:{id:'existing',expires:Date.now()+60000,recorded:true},counts:{views:32,likes:3,savedAt:Date.now()}});
  assert.equal(app.requests.length,1); assert.equal(app.requests[0].options.method,'GET');
  app.requests[0].finish({views:31,likes:2}); await flush();
  assert.equal(app.node('[data-view-count]').textContent,'32');
});
test('network failure retains cached totals and failed view remains retryable', async () => {
  const app=setup({counts:{views:31,likes:2,savedAt:Date.now()}});
  for(const r of app.requests) r.reject(new Error('offline'));
  await flush();
  assert.equal(app.node('[data-like-count]').textContent,'2');
  assert.equal(JSON.parse(app.storage.get(prefix+'view')).recorded,undefined);
  assert.match(app.node('[data-stats-status]').textContent,/saved/i);
});
test('like only becomes confirmed after success; failure supports idempotent retry', async () => {
  const app=setup({view:{id:'existing',expires:Date.now()+60000,recorded:true}});
  app.requests[0].finish({views:31,likes:2}); await flush();
  const button=app.node('[data-like-button]');
  let click=button.handlers.click();
  const first=app.requests[1]; first.reject(new Error('offline')); await click;
  assert.notEqual(app.storage.get(prefix+'liked'),'true'); assert.equal(button.disabled,false);
  click=button.handlers.click(); const second=app.requests[2];
  assert.equal(first.options.body,second.options.body);
  second.finish({views:31,likes:3}); await click;
  assert.equal(app.storage.get(prefix+'liked'),'true'); assert.equal(button.disabled,true);
});
test('invalid or expired caches are ignored', () => {
  for (const counts of [{views:-1,likes:2,savedAt:Date.now()},{views:1,likes:2,savedAt:0}]) {
    const app=setup({counts}); assert.equal(app.node('[data-view-count]').textContent,'');
  }
});
