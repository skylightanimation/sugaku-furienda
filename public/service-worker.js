const cacheName = 'sugaku_furienda';

// List of assets to cache when the service worker is installed.
const cacheAssets = [
    './',
    './index.html',
    './assets/css/android.css',
    './assets/css/windows.css',
    './logo.png',
    './logo_x72.png',
    './logo_x512.png',
    // Add more paths to your application's assets here
];

// Install event: Caches assets when the service worker is installed.
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                return cache.addAll(cacheAssets);
            })
    );
});

// Activate event: Remove old caches when a new version of the service worker is activated.
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((name) => {
                        if (name !== cacheName) {
                            return caches.delete(name);
                        }
                    })
                );
            })
    );
});

// Fetch event: Intercept network requests and serve cached assets when available.
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return the cached response if it exists, or fetch from the network.
                return cachedResponse || fetch(event.request);
            })
    );
});