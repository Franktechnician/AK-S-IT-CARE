const CACHE_NAME = 'aks-it-care-v9';
const ASSETS = ['./', './index.html', './services.html', './about.html', './areas.html', './contact.html', './booking.html', './assets/site.css', './assets/site.js', './assets/chip.svg', './assets/laptop.svg', './assets/printer.svg', './logo.png', './icon-192.png', './icon-512.png', './manifest.json'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', event => { if (event.request.method !== 'GET') return; event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request))); });
