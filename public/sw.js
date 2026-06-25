const CACHE_NAME = 'nafshe-image-cache-v1';

// Install event: skip waiting to activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: intercept and cache images
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  const url = request.url;

  // Identify images by destination, file extension, or domain
  const isImage = 
    request.destination === 'image' ||
    url.match(/\.(png|jpe?g|gif|svg|webp|avif|bmp|tiff)($|\?)/i) ||
    url.includes('images.unsplash.com') ||
    url.includes('vercel-storage.com');

  if (isImage) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          // Return cached response if found (Cache-First)
          if (cachedResponse) {
            return cachedResponse;
          }

          // Otherwise, fetch from network
          return fetch(request).then((networkResponse) => {
            // Only cache valid successful responses (status 200 or 0 for opaque cross-origin requests)
            if (networkResponse && (networkResponse.status === 200 || networkResponse.status === 0)) {
              // Store clone in cache
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch((error) => {
            console.error('Fetch failed for image:', url, error);
            // Fallback could go here if we wanted an offline placeholder image
          });
        });
      })
    );
  }
});
