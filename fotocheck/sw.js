// Service Worker — Fotocheck PANASUR Hanaqpampa
// v1.0.0 — 2026-05-05

const CACHE_NAME = 'panasur-fotocheck-v1';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js'
];

// Install: precache shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_FILES).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

// Activate: limpiar caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first para shell, network-first para Supabase API
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Supabase API y Storage: network-first (datos siempre frescos)
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(JSON.stringify({ error: 'offline', message: 'Sin conexión — guardado en cola local' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        })
      )
    );
    return;
  }

  // Shell y CDN: cache-first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        // Cachear nuevos recursos GET exitosos
        if (event.request.method === 'GET' && resp.status === 200) {
          const respClone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, respClone)).catch(() => {});
        }
        return resp;
      }).catch(() => {
        // Fallback offline para HTML
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// Background sync placeholder para futuro
self.addEventListener('sync', event => {
  if (event.tag === 'sync-fotochecks') {
    // En producción: leer IndexedDB queue y reenviar a Supabase
    console.log('[SW] Sync triggered');
  }
});
