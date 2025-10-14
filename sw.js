// sw.js — auto refresh à chaque déploiement
const CACHE_NAME = 'mimi-cache-v' + Date.now(); // change à chaque build

const ASSETS = [
  '/', // si ton site est à la racine du domaine
  '/index.html',
  '/diapo.html',
  '/manifest.json',
  '/anniversaire_lingala_96kbps.mp3',
  '/icon-192.png',
  '/icon-512.png'
];

// Installation → met en cache la nouvelle version
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // active immédiatement le nouveau SW
});

// Activation → supprime les anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim(); // recharge toutes les pages ouvertes
});

// Fetch → réseau prioritaire, cache si hors ligne
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
