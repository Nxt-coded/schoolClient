/*
  Simple offline queue using idb. Stores queued requests and retries them when online.
  Each entry: { id, url, method, headers, bodyType, body }
  bodyType: 'json' | 'formdata' | 'blob'
*/
import { openDB } from 'idb';

const DB_NAME = 'startschool-offline-queue';
const STORE_NAME = 'queue';

async function getDB() {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

export type QueueEntry = {
  id?: number;
  url: string;
  method: string;
  headers?: Record<string, string>;
  bodyType?: 'json' | 'formdata' | 'blob' | 'none';
  body?: any;
  encryptedBody?: { iv: number[]; data: number[] } | null;
  createdAt?: number;
  retryCount?: number;
  nextAttemptAt?: number;
  lastError?: string;
};

export async function enqueue(entry: QueueEntry) {
  const db = await getDB();
  entry.createdAt = Date.now();
  entry.retryCount = entry.retryCount || 0;
  entry.nextAttemptAt = entry.nextAttemptAt || Date.now();
  // For security, if body contains sensitive fields, encrypt it before storing.
  // Here we simply encrypt the body if it's sizable (e.g., formdata or json)
  if (entry.body) {
    try {
      const { encryptPayload } = await import('./queueCrypto');
      const encrypted = await encryptPayload(entry.body);
      entry.encryptedBody = encrypted;
      // clear plain body to avoid storing sensitive data in clear
      entry.body = null;
    } catch (err) {
      // fallback to storing body plaintext if crypto fails
      entry.encryptedBody = null;
    }
  }

  const id = await db.add(STORE_NAME, entry as any);

  // try to register background sync so the service worker will retry even if app closed
  try {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const reg: any = await navigator.serviceWorker.ready;
      if (reg && reg.sync && typeof reg.sync.register === 'function') {
        await reg.sync.register('process-queue');
      }
    }
  } catch (err) {
    // ignore: some browsers may not support background sync
    console.warn('Background sync registration failed', err);
  }

  return id;
}

export async function getAllQueued() {
  const db = await getDB();
  return await db.getAll(STORE_NAME) as QueueEntry[];
}

// expose a raw list for service worker to consume (including encrypted bodies)
export async function getAllQueuedRaw() {
  const db = await getDB();
  return await db.getAll(STORE_NAME) as any[];
}

export async function removeQueued(id: number) {
  const db = await getDB();
  return await db.delete(STORE_NAME, id);
}

export async function updateQueued(id: number, patch: Partial<QueueEntry>) {
  const db = await getDB();
  const item = await db.get(STORE_NAME, id as any);
  if (!item) return null;
  const updated = { ...item, ...patch };
  await db.put(STORE_NAME, updated as any);
  return updated;
}

export async function clearQueue() {
  const db = await getDB();
  return await db.clear(STORE_NAME);
}

export async function processQueue(processor: (entry: QueueEntry) => Promise<any>) {
  const items = await getAllQueued();
  const now = Date.now();
  const bc = new BroadcastChannel('ss-queue');
  for (const item of items) {
    try {
      // skip items scheduled for later
      if (item.nextAttemptAt && item.nextAttemptAt > now) continue;

      await processor(item);
  if (item.id) await removeQueued(item.id);
  // notify other tabs that an item was processed and include a suggested SWR key
  const { getSWRKeyForUrl } = await import('./swrKeys');
  const key = getSWRKeyForUrl(item.url as string);
  bc.postMessage({ type: 'processed', url: item.url, key });
    } catch (err: any) {
      console.error('Failed to process queued item', item, err);
      // update retry metadata and leave in queue
      if (item.id) {
        const retryCount = (item.retryCount || 0) + 1;
        const backoff = Math.min(60 * 60 * 1000, 1000 * Math.pow(2, retryCount));
        const nextAttemptAt = Date.now() + backoff; // exponential backoff capped at 1 hour
        await updateQueued(item.id, {
          retryCount,
          nextAttemptAt,
          lastError: err?.message || String(err),
        });
        const { getSWRKeyForUrl } = await import('./swrKeys');
        const key = getSWRKeyForUrl(item.url as string);
        bc.postMessage({ type: 'failed', id: item.id, error: err?.message || String(err), key });
      }
    }
  }
  bc.close();
}

// default processor: handles 'formdata' bodyType by reconstructing FormData and POSTing
export async function defaultProcessor(entry: QueueEntry) {
  if (entry.bodyType === 'formdata') {
    const fd = new FormData();
    for (const e of entry.body) {
      if (e.isFile) {
        // stored file blobs are already kept as Blob/File in idb
        fd.append(e.key, e.value as Blob, e.name);
      } else {
        fd.append(e.key, e.value);
      }
    }

    const res = await fetch(entry.url, {
      method: entry.method || 'POST',
      body: fd,
      // Note: do not set Content-Type for FormData; browser sets boundary
    });

    if (!res.ok) throw new Error('Failed to process queued formdata');
    return res;
  }

  if (entry.bodyType === 'json') {
    const res = await fetch(entry.url, {
      method: entry.method || 'POST',
      headers: { 'Content-Type': 'application/json', ...(entry.headers || {}) },
      body: JSON.stringify(entry.body),
    });

    if (!res.ok) throw new Error('Failed to process queued json');
    return res;
  }

  // fallback: attempt a fetch with raw body
  const res = await fetch(entry.url, {
    method: entry.method || 'POST',
    headers: entry.headers,
    body: entry.body,
  });

  if (!res.ok) throw new Error('Failed to process queued request');
  return res;
}
