var CACHE = "noten-lernen-cache-1";
var precacheFiles = ["index.html"];

self.addEventListener("install", function(evt) {
  evt.waitUntil(
    precache().then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function(event) {
  return self.clients.claim();
});

self.addEventListener("fetch", function(evt) {
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});

function precache() {
  return caches.open(CACHE).then(function(cache) {
    return cache.addAll(precacheFiles);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function(cache) {
    return cache.match(request).then(function(matching) {
      return matching || Promise.reject("no-match");
    });
  });
}

function update(request) {
  return caches.open(CACHE).then(function(cache) {
    return fetch(request).then(function(response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request) {
  return fetch(request).then(function(response) {
    return response;
  });
}
