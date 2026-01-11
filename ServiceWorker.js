const cacheName = "Evoweb-SortingGame-0.1.2";
const contentToCache = [
    "Build/83425ef3cf16b50e8bca71600da9b1e6.loader.js",
    "Build/12dc5f413d3cf85f85b8b30737c69a75.framework.js.unityweb",
    "Build/8cc620e8e39697a09691e40481c107de.data.unityweb",
    "Build/6dd3e76b4756a6d91fbb60ebb6947dcc.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
