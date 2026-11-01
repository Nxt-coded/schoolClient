// swrConfig.ts
import { SWRConfiguration } from "swr";

export const localStorageProvider = (): Map<any, any> => {
  // Restore cache from localStorage
  const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));

  // Persist cache back to localStorage before leaving the page
  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("app-cache", appCache);
  });

  return map;
};

export const swrConfig: any = {
  provider: localStorageProvider,
};
