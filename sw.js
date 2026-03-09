
const CACHE_NAME = 'shlokas-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './rama/index.html',
  './rama/srirama-pattabhisheka.html',
  './css/style.css',
  './css/theme.js',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
            return response;
        }
        return fetch(event.request);
      })
  );
});
