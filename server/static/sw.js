var CACHE = 'network-or-cache';

self.addEventListener('install', e => {
  console.log('Service worker is being installed');

  e.waitUntil(precache())
})

self.addEventListener('fetch', e => {
  console.log('Service worker is called because a fetch request was send');
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
}
