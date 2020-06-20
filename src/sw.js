const { assets } = global.serviceWorkerOption

const CACHE_NAME = "tesv4"

const urlToCache = [
  ...assets,
  "./",
  "/src/pages/home.html",
  "/src/pages/matches.html",
  "/src/pages/standings.html",
  "/src/pages/liked.html",
  "/src/pages/likedDetail.html",
  "/src/assets/landing.png",
  "/src/assets/icon.svg",
  "/src/assets/like.png",
  "/src/assets/trash.png",
  "/src/db.js",
  "/src/manifest.json",
]

const base_url = 'https://api.football-data.org/v2'
const base_url_img = 'https://upload.wikimedia.org/wikipedia'

self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
          return cache.addAll(urlToCache)
      })
  )
})

self.addEventListener('fetch', event => {
  if (event.request.url.indexOf(base_url) > -1|| event.request.url.indexOf(base_url_img) > -1){
      event.respondWith(
          (async () => {
              const cache = await caches.open(CACHE_NAME)
              const res = await fetch(event.request)
              cache.put(event.request.url, res.clone())
              return res
          })()
      )
  } else {
      event.respondWith(
          (async () => {
              return await caches.match(event.request.url, {
                  ignoreSearch: true
              }) || await fetch(event.request)
          })()
      )
  }
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log(`cache ${cacheName} dihapus`)
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})