const CACHE_NAME = 'kerosinka-v1';
const urlsToCache = [
    '/coffee/',
    '/coffee/index.html',
    '/coffee/coffee.html',
    '/coffee/sandwiches.html',
    '/coffee/lemonade.html',
    '/coffee/contacts.html',
    '/coffee/style.css',
    '/coffee/logo_coffee.jpg',
    '/coffee/images/cappuccino.jpg',
    '/coffee/images/latte.jpg',
    '/coffee/images/americano.jpg',
    '/coffee/images/matcha_latte.jpg',
    '/coffee/images/ceasar_roll.jpg',
    '/coffee/images/tuna_roll.jpg',
    '/coffee/images/chicken_pita.jpg',
    '/coffee/images/orange_juice.jpg',
    '/coffee/images/mango_matcha.jpg',
    '/coffee/images/raspberry_mint.jpg',
    '/coffee/images/coffee_shop1.jpg',
    '/coffee/images/coffee_shop2.jpg',
    '/coffee/manifest.json'
];

// Установка Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Активация Service Worker
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Перехват запросов и ответ из кеша
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
