/// <reference lib="webworker" />
/* Service Worker for background sync and queue processing */
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { NetworkFirst, CacheFirst } from "workbox-strategies";
import { clientsClaim } from "workbox-core";

declare const self: ServiceWorkerGlobalScope;

// Enable immediate claim of clients
self.skipWaiting();
clientsClaim();

// Cache version - increment this when deploying new version
const CACHE_VERSION = new Date().getTime().toString();

// self.__WB_MANIFEST will be injected by the plugin when using injectManifest
precacheAndRoute((self as any).__WB_MANIFEST || []);

// Clear old caches when a new service worker is activated
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches except the current version
          if (cacheName !== CACHE_VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Common cache update notification function
const notifyClientsOfUpdate = async (type: string) => {
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({ type });
  });
};

// Default network-first handler for all navigation requests
const defaultNavigationHandler = async ({ event, request }) => {
  // Use NetworkFirst strategy with common configuration
  const networkFirst = new NetworkFirst({
    cacheName: CACHE_VERSION,
    plugins: [
      {
        cacheDidUpdate: async () => {
          await notifyClientsOfUpdate("CACHE_UPDATED");
        },
      },
    ],
  });

  return networkFirst.handle({ event, request });
};

// Register routes with specific strategies
registerRoute(
  new NavigationRoute(defaultNavigationHandler) // This handles all navigation requests
);

// API routes with network-first strategy
registerRoute(
  /\/api\//,
  new NetworkFirst({
    cacheName: CACHE_VERSION,
    plugins: [
      {
        cacheDidUpdate: async () => {
          await notifyClientsOfUpdate("API_CACHE_UPDATED");
        },
      },
    ],
  })
);

// Static assets with cache-first strategy
registerRoute(
  /\.(?:js|css|html)$/,
  new NetworkFirst({
    cacheName: CACHE_VERSION + "-assets",
    plugins: [
      {
        cacheDidUpdate: async () => {
          await notifyClientsOfUpdate("ASSETS_CACHE_UPDATED");
        },
      },
    ],
  })
);

// Images with cache-first strategy
registerRoute(
  /\.(?:png|jpg|jpeg|svg|webp|gif|ico)$/,
  new CacheFirst({
    cacheName: CACHE_VERSION + "-images",
  })
);

// Font files with cache-first strategy
registerRoute(
  /\.(?:woff|woff2|ttf|otf|eot)$/,
  new CacheFirst({
    cacheName: CACHE_VERSION + "-fonts",
  })
);

// IndexedDB utilities inside SW
async function openDB(name, version = 1) {
  return new Promise<any>((resolve, reject) => {
    const req: any = indexedDB.open(name, version);
    req.onupgradeneeded = () => {
      const db: any = req.result;
      if (!db.objectStoreNames.contains("queue"))
        db.createObjectStore("queue", { keyPath: "id", autoIncrement: true });
      if (!db.objectStoreNames.contains("crypto-store"))
        db.createObjectStore("crypto-store");
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getAllQueuedFromIDB() {
  const db: any = await openDB("startschool-offline-queue");
  return new Promise<any[]>((resolve, reject) => {
    const tx: any = db.transaction("queue", "readonly");
    const store: any = tx.objectStore("queue");
    const req: any = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getKeyFromIDB() {
  const db: any = await openDB("startschool-offline-queue");
  return new Promise<any>((resolve, reject) => {
    const tx: any = db.transaction("crypto-store", "readonly");
    const store: any = tx.objectStore("crypto-store");
    const req: any = store.get("queue-encryption-key");
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function decryptPayloadWithRawKey(payload: any) {
  try {
    const raw: any = await getKeyFromIDB();
    if (!raw) throw new Error("no raw key");
    const key = await crypto.subtle.importKey(
      "raw",
      raw as ArrayBuffer,
      { name: "AES-GCM" },
      true,
      ["decrypt"]
    );
    const iv = new Uint8Array(payload.iv);
    const data = new Uint8Array(payload.data).buffer;
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );
    return JSON.parse(new TextDecoder().decode(decrypted));
  } catch (err) {
    console.error("Failed to decrypt payload in SW", err);
    throw err;
  }
}

async function removeQueuedFromIDB(id: any) {
  const db: any = await openDB("startschool-offline-queue");
  return new Promise<boolean>((resolve, reject) => {
    const tx: any = db.transaction("queue", "readwrite");
    const store: any = tx.objectStore("queue");
    const req: any = store.delete(id);
    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

async function updateQueuedInIDB(id: any, patch: any) {
  const db: any = await openDB("startschool-offline-queue");
  return new Promise<any>((resolve, reject) => {
    const tx: any = db.transaction("queue", "readwrite");
    const store: any = tx.objectStore("queue");
    const getReq: any = store.get(id);
    getReq.onsuccess = () => {
      const item = getReq.result;
      const updated = { ...item, ...patch };
      const putReq: any = store.put(updated);
      putReq.onsuccess = () => resolve(updated);
      putReq.onerror = () => reject(putReq.error);
    };
    getReq.onerror = () => reject(getReq.error);
  });
}

// Process all queued entries directly in the service worker
async function processQueueInSW() {
  const items: any[] = (await getAllQueuedFromIDB()) as any[];
  const clientsList: any[] = await (self as any).clients.matchAll({
    includeUncontrolled: true,
  });
  for (const item of items) {
    try {
      // if scheduled for future, skip
      if (item.nextAttemptAt && item.nextAttemptAt > Date.now()) continue;

      let body = null;
      if (item.encryptedBody) {
        body = await decryptPayloadWithRawKey(item.encryptedBody);
      } else if (item.body) {
        body = item.body;
      }

      if (item.bodyType === "formdata" && Array.isArray(body)) {
        const fd = new FormData();
        for (const e of body) {
          if (e.isFile) {
            // stored file objects in IDB should be available as Blobs
            fd.append(e.key, e.value, e.name);
          } else {
            fd.append(e.key, e.value);
          }
        }

        const res = await fetch(item.url, {
          method: item.method || "POST",
          body: fd,
        });
        if (!res.ok) throw new Error("Server rejected formdata");
      } else if (item.bodyType === "json" && body) {
        const res = await fetch(item.url, {
          method: item.method || "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Server rejected json");
      } else {
        // fallback raw
        const res = await fetch(item.url, {
          method: item.method || "POST",
          body: body,
        });
        if (!res.ok) throw new Error("Server rejected request");
      }

      await removeQueuedFromIDB(item.id);
      // notify clients
      for (const client of clientsList)
        (client as any).postMessage({
          type: "processed",
          url: item.url,
          id: item.id,
        });
    } catch (err) {
      console.error("SW processing failed for item", item, err);
      if (item.id) {
        const retryCount = (item.retryCount || 0) + 1;
        const backoff = Math.min(
          60 * 60 * 1000,
          1000 * Math.pow(2, retryCount)
        );
        const nextAttemptAt = Date.now() + backoff;
        await updateQueuedInIDB(item.id, {
          retryCount,
          nextAttemptAt,
          lastError: err?.message || String(err),
        });
        for (const client of clientsList)
          (client as any).postMessage({
            type: "failed",
            id: item.id,
            error: err?.message || String(err),
          });
      }
    }
  }
}

self.addEventListener("sync", (event: any) => {
  if (event.tag === "process-queue") {
    event.waitUntil(processQueueInSW());
  }
});

self.addEventListener("message", (evt: any) => {
  if (evt.data && evt.data.type === "process-queue") {
    evt.waitUntil(processQueueInSW());
  }
});
