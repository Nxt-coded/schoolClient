// vite.config.ts
import { defineConfig } from "file:///C:/Users/Eduvas/Documents/project/startSchoolFe/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Eduvas/Documents/project/startSchoolFe/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/Eduvas/Documents/project/startSchoolFe/node_modules/vite-plugin-pwa/dist/index.js";
import path from "node:path";
var __vite_injected_original_dirname = "C:\\Users\\Eduvas\\Documents\\project\\startSchoolFe";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: false,
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      workbox: {
        globPatterns: ["**/*"]
      },
      includeAssets: ["**/*"],
      manifest: {
        name: "Just Next",
        short_name: "Just Next",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#172554",
        description: "The Next Generation Tooling for Educators!"
      },
      // point to our custom service worker source (path is relative to `srcDir`)
      injectManifest: {
        // Use an absolute path for the service worker source so Rollup resolves it reliably
        // (some environments / plugin versions resolve differently if swSrc is relative)
        swSrc: path.resolve(__vite_injected_original_dirname, "src", "sw.js")
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxFZHV2YXNcXFxcRG9jdW1lbnRzXFxcXHByb2plY3RcXFxcc3RhcnRTY2hvb2xGZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcRWR1dmFzXFxcXERvY3VtZW50c1xcXFxwcm9qZWN0XFxcXHN0YXJ0U2Nob29sRmVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0VkdXZhcy9Eb2N1bWVudHMvcHJvamVjdC9zdGFydFNjaG9vbEZlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuXHJcbiAgICBWaXRlUFdBKHtcclxuICAgICAgaW5qZWN0UmVnaXN0ZXI6IGZhbHNlLFxyXG4gICAgICBzdHJhdGVnaWVzOiAnaW5qZWN0TWFuaWZlc3QnLFxyXG4gICAgICBzcmNEaXI6ICdzcmMnLFxyXG4gICAgICBmaWxlbmFtZTogJ3N3LmpzJyxcclxuICAgICAgd29ya2JveDoge1xyXG4gICAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qJ10sXHJcbiAgICAgIH0sXHJcbiAgICAgIGluY2x1ZGVBc3NldHM6IFsnKiovKiddLFxyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIG5hbWU6IFwiSnVzdCBOZXh0XCIsXHJcbiAgICAgICAgc2hvcnRfbmFtZTogXCJKdXN0IE5leHRcIixcclxuICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwiL3B3YS0xOTJ4MTkyLnBuZ1wiLFxyXG4gICAgICAgICAgICBzaXplczogXCIxNDR4MTQ0XCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIHB1cnBvc2U6IFwiYW55XCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwiL3B3YS0xOTJ4MTkyLnBuZ1wiLFxyXG4gICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIHB1cnBvc2U6IFwiYW55XCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwiL3B3YS01MTJ4NTEyLnBuZ1wiLFxyXG4gICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIHB1cnBvc2U6IFwiYW55XCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwiL3B3YS1tYXNrYWJsZS0xOTJ4MTkyLnBuZ1wiLFxyXG4gICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogXCIvcHdhLW1hc2thYmxlLTUxMng1MTIucG5nXCIsXHJcbiAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHN0YXJ0X3VybDogXCIvXCIsXHJcbiAgICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXHJcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjRkZGRkZGXCIsXHJcbiAgICAgICAgdGhlbWVfY29sb3I6IFwiIzE3MjU1NFwiLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlRoZSBOZXh0IEdlbmVyYXRpb24gVG9vbGluZyBmb3IgRWR1Y2F0b3JzIVwiLFxyXG4gICAgICB9LFxyXG4gICAgICAvLyBwb2ludCB0byBvdXIgY3VzdG9tIHNlcnZpY2Ugd29ya2VyIHNvdXJjZSAocGF0aCBpcyByZWxhdGl2ZSB0byBgc3JjRGlyYClcclxuICAgICAgaW5qZWN0TWFuaWZlc3Q6IHtcclxuICAgICAgICAvLyBVc2UgYW4gYWJzb2x1dGUgcGF0aCBmb3IgdGhlIHNlcnZpY2Ugd29ya2VyIHNvdXJjZSBzbyBSb2xsdXAgcmVzb2x2ZXMgaXQgcmVsaWFibHlcclxuICAgICAgICAvLyAoc29tZSBlbnZpcm9ubWVudHMgLyBwbHVnaW4gdmVyc2lvbnMgcmVzb2x2ZSBkaWZmZXJlbnRseSBpZiBzd1NyYyBpcyByZWxhdGl2ZSlcclxuICAgICAgICBzd1NyYzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycsICdzdy5qcycpLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJVLFNBQVMsb0JBQW9CO0FBQ3hXLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUVOLFFBQVE7QUFBQSxNQUNOLGdCQUFnQjtBQUFBLE1BQ2hCLFlBQVk7QUFBQSxNQUNaLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxRQUNQLGNBQWMsQ0FBQyxNQUFNO0FBQUEsTUFDdkI7QUFBQSxNQUNBLGVBQWUsQ0FBQyxNQUFNO0FBQUEsTUFDdEIsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1g7QUFBQSxRQUNGO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWCxTQUFTO0FBQUEsUUFDVCxrQkFBa0I7QUFBQSxRQUNsQixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsTUFDZjtBQUFBO0FBQUEsTUFFQSxnQkFBZ0I7QUFBQTtBQUFBO0FBQUEsUUFHZCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxPQUFPLE9BQU87QUFBQSxNQUMvQztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
