/* PWA Service Worker - ACP刷题离线缓存 */
const CACHE_NAME = 'acp-quiz-v7';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './style.css',
  './data.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

/* 安装：预缓存核心资源
   关键：用带 sw=版本 参数的 URL 请求资源，再以干净 URL 存入缓存。
   原因：install 阶段的请求会被仍在控制页面的旧 SW 拦截，旧 SW 的
   stale-while-revalidate 会用旧缓存响应 → 新 SW 缓存被旧代码"投毒"，
   导致 SW 升级后永远拿不到新文件。带随机参数的 URL 不在任何旧缓存中，
   强制走网络。 */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const url of ASSETS) {
        const bust = url + (url.includes('?') ? '&' : '?') + 'sw=' + CACHE_NAME;
        const resp = await fetch(bust, { cache: 'reload' });
        if (!resp.ok) throw new Error('precache failed: ' + bust);
        await cache.put(url, resp);
      }
    }).then(() => self.skipWaiting())
  );
});

/* 激活：清理旧缓存 */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* 拦截请求：stale-while-revalidate 策略
   先返回缓存（秒开），同时后台拉取更新（下次生效）。
   关键：网络拉取一律带时间戳参数 —— 中间人（卡巴斯基）按 URL 缓存且
   无视 Cache-Control，裸 URL 的后台更新会被喂回任意旧版本内容，
   连 SW 缓存都会被二次投毒（2026-09-16 实录：v4 缓存被写回古董 data.js）。
   缓存仍以原始 URL 为 key 存放，不影响命中与离线可用。 */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const bust = e.request.url + (url.search ? '&' : '?') + '_swb=' + Date.now();
      const fetchPromise = fetch(bust, { cache: 'reload' }).then(resp => {
        if (resp && resp.ok && resp.type === 'basic') {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return resp;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
