var CACHE = 'core-cache';

self.addEventListener('install', e => {
  console.log('Service worker is installed');
  e.waitUntil(precache())
})

self.addEventListener('fetch', e => {
  const request = e.request
  e.respondWith(caches
    .open(CACHE)
    .then(cache => cache.match(request))
    .then(res => {
      if (res) {
        console.log('got item from cache');
        return res
      } else {
        console.log('got item from server');
        return fetch(request)
          .then(response => caches
            .open(CACHE)
            .then(cache => cache.put(request, response.clone()))
            .then(() => response)
          )
          .catch(err => caches
            .open(CACHE)
            .then(cache => cache.match('/offline')
              .then(res => res)
            )
          )
      }
    })
  )
})

function precache() {
  return caches.open(CACHE)
    .then(cache => cache
      .addAll([
        '/'
      ])
    )
    .then(() => self.skipWaiting())
}
