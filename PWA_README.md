This project has basic PWA/offline support and mobile-first setup.

What was added

- Vite PWA plugin already present; configured runtime caching for API and images in `vite.config.ts`.
- `OfflineIndicator` component (`src/components/static/OfflineIndicator.tsx`) to display a small banner when the app is offline.
- `OfflineIndicator` is mounted in `App.tsx` so it's visible globally.
- Service worker registration already exists in `src/main.tsx` via `virtual:pwa-register`.

How to test locally

1. Install dependencies and run dev server:

```bash
npm install
npm run dev
```

2. Open the app in Chrome. Use DevTools > Application > Service Workers to confirm the service worker is registered.

3. In DevTools > Network, set "Offline" or "Slow 3G" and interact with the app. The Offline banner will display when offline.

4. Build and preview production:

```bash
npm run build
npm run preview
```

Notes & next steps

- The Workbox runtime caching configured is minimal. For more advanced offline flows, consider:
  - Adding indexedDB caching for API responses (e.g., using idb or localforage) and serving from the cache when offline.
  - Adding optimistic UI updates for write operations (so changes appear immediately while offline) and queueing sync when back online.
  - Adding an explicit "Sync queued changes" UI and background sync using service worker Background Sync.

If you want, I can implement queued offline write support (local queue + background sync) or expand caching rules. Let me know which you'd prefer next.
