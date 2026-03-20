const CACHE = 'bezoekersapp-v2';
const FILES = [
  './',
  './index.html',
  './mobacc.svg',
  './manifest.webmanifest',
  './apple-touch-icon.png',
  './Cereslaan 9 Beganegrond vluchtroute 02-2025.PDF'
];

// Installatie: sla alle bestanden op in de cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

// Activatie: verwijder oude caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serveer altijd vanuit cache (offline-first)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
