/* PWA Service Worker - ACP刷题离线缓存 */
const CACHE_NAME = 'acp-quiz-v2';
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

/* 安装：预缓存核心资源 */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
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
   先返回缓存（秒开），同时后台拉取更新（下次生效） */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(resp => {
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
