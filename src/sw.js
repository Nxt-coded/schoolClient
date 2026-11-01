// Wrapper to ensure tooling that expects a JS entry can resolve the service worker.
// It simply re-exports the TypeScript service worker so bundlers that look for a .js entry find it.
import './sw.ts';
