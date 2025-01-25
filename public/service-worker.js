const CACHE_NAME = 'my-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  // '/assets/images/default.jpg',
  // Add more URLs to cache here
];

// Cache specific files during the installation phase
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Check if the request is for a JS, CSS, or image file
  if (
    requestUrl.pathname.endsWith('.js') ||
    requestUrl.pathname.endsWith('.css') ||
    requestUrl.pathname.endsWith('.png') ||
    requestUrl.pathname.endsWith('.jpg') ||
    requestUrl.pathname.endsWith('.jpeg') ||
    requestUrl.pathname.endsWith('.svg')
  ) {
    event.respondWith(
      // Try to find the requested file in the cache
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // If the file is found in the cache, return it
          return cachedResponse;
        }

        // If the file is not found in the cache, fetch it from the network
        return caches.open(CACHE_NAME).then((cache) => {
          return fetch(event.request).then((response) => {
            // Check if the response is valid and if the request URL scheme is supported
            if (
              !response ||
              response.status !== 200 ||
              response.type !== 'basic' ||
              !['http:', 'https:'].includes(requestUrl.protocol)
            ) {
              return response;
            }

            // Clone the response to store it in the cache
            const responseToCache = response.clone();
            cache.put(event.request, responseToCache);

            return response;
          });
        });
      })
    );
  } else {
    // For non-JS, non-CSS, and non-image requests, proceed with the normal fetch operation
    event.respondWith(fetch(event.request));
  }
});