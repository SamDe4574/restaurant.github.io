var staticCacheName = "restaurant-reviews-v1";
var files = [
  "/",
  "/css/styles.css",
  "/js/dbhelper.js",
  "/js/main.js",
  "/js/restaurant_info.js",
  "/data/restaurants.json"
];

// Insttal Event Listener
self.addEventListener("install", function(event) {
  // here i used a loop to save all the images and all the restaurants
  for (let i = 1; i < 11; ++i) {
    files.push(`/restaurant.html?id=${i}`);
    files.push(`/img/${i}.jpg`);
  }
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    // here we open the cahes and add the array of the files in it .
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(files);
    })
  );
});

// this is the feach Event Listener
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
