// queueCrypto.ts - provides simple AES-GCM encryption/decryption utilities for queue payloads
import { openDB } from 'idb';

const KEY_STORE = 'crypto-store';
const KEY_NAME = 'queue-encryption-key';
const DB_NAME = 'startschool-offline-queue';

async function getDB() {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(KEY_STORE)) {
        db.createObjectStore(KEY_STORE);
      }
    },
  });
}

async function generateKey() {
  const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
  const raw = await crypto.subtle.exportKey('raw', key);
  const db = await getDB();
  await db.put(KEY_STORE, raw, KEY_NAME);
  return key;
}

async function getKey(): Promise<CryptoKey> {
  const db = await getDB();
  const raw = await db.get(KEY_STORE, KEY_NAME);
  if (raw) {
    return await crypto.subtle.importKey('raw', raw, 'AES-GCM', true, ['encrypt', 'decrypt']);
  }
  return await generateKey();
}

export async function encryptPayload(obj: any) {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = new TextEncoder().encode(JSON.stringify(obj));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
  return { iv: Array.from(iv), data: Array.from(new Uint8Array(encrypted)) };
}

export async function decryptPayload(payload: { iv: number[]; data: number[] }) {
  const key = await getKey();
  const iv = new Uint8Array(payload.iv);
  const data = new Uint8Array(payload.data).buffer;
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
  const txt = new TextDecoder().decode(decrypted);
  return JSON.parse(txt);
}

export async function clearCryptoKey() {
  const db = await getDB();
  return db.delete(KEY_STORE, KEY_NAME);
}

export default { encryptPayload, decryptPayload, clearCryptoKey };
