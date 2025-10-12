self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('mimi-pwa-v3').then((cache) =>
      cache.addAll([
        './',
        './index.html',
        './diapo.html',
        './manifest.json',
        './heart-192.png',
        './heart-512.png'
      ])
    )
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((r) => r || fetch(event.request)));
});