const CACHE_NAME = 'aks-it-care-v8';
const ASSETS = [
  '/AK-S-IT-CARE/index.html',
  '/AK-S-IT-CARE/logo.png',
  '/AK-S-IT-CARE/icon-192.png',
  '/AK-S-IT-CARE/icon-512.png',
  '/AK-S-IT-CARE/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
