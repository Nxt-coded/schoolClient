import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      injectRegister: false,
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      workbox: {
        globPatterns: ['**/*'],
      },
      includeAssets: ['**/*'],
      manifest: {
        name: "Just Next",
        short_name: "Just Next",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#172554",
        description: "The Next Generation Tooling for Educators!",
      },
      // point to our custom service worker source (path is relative to `srcDir`)
      injectManifest: {
        // Use an absolute path for the service worker source so Rollup resolves it reliably
        // (some environments / plugin versions resolve differently if swSrc is relative)
        swSrc: path.resolve(__dirname, 'src', 'sw.js'),
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
