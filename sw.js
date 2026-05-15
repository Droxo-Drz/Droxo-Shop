const CACHE_NAME = 'droxo-cache-v1';
// حط هنا غير الملفات اللي متأكد بلي كاينة وبنفس الحروف
const assets = [
  './',
  './index.html',
  './style.css',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});