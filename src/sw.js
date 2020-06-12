const { assets } = global.serviceWorkerOption

const CACHE_NAME = "tesv4"

let assetsToCache = [
  ...assets,
  './',
  '/src/pages/home.html',
  "/src/script/component/competition-list.js",
  "/src/script/component/competition-item.js",
  "/src/script/data/football.js",
  "/src/assets/landing.png",
  "/src/assets/icon.png",
  "/src/manifest.json",
]

console.log(assetsToCache)

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('ini install sw')
      return cache.addAll(assetsToCache)
    })
  )
})

self.addEventListener("fetch", function(event) {
  const base_url = "https://api.football-data.org/"
  if(event.request.url.indexOf(base_url) > -1){
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return fetch(event.request).then(response => {
          cache.put(event.request.url, response.clone())
          return response
        })
      })
    )
  }else{
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
          return response || fetch (event.request)
      })
    )
  }
})

self.addEventListener('fetch', event => {
  event.respondWith(
      caches
      .match(event.request, { cacheName : CACHE_NAME })
      .then(response => {
          if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
 
        console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
        return fetch(event.request);
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
      caches.keys().then(cacheNames => {
          return Promise.all(
              cacheNames.map(cacheName => {
                  if (cacheName != CACHE_NAME) {
                      console.log("ServiceWorker: cache " + cacheName + " dihapus");
                      return caches.delete(cacheName);
                  }
              })
          )
      })
  )
})