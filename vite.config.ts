import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// Served from https://<user>.github.io/namibia-wildlife/
const BASE = "/namibia-wildlife/";

export default defineConfig({
  base: BASE,
  // Pin PostCSS so Vite doesn't walk up and pick a stray parent-dir config.
  css: { postcss: {} },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "Namibia Wildlife",
        short_name: "Namibia",
        description: "Naturalist field guide for a trip to Namibia",
        start_url: BASE,
        scope: BASE,
        display: "standalone",
        background_color: "#f4ecd8",
        theme_color: "#f4ecd8",
        icons: [
          { src: "icon.svg", sizes: "any", type: "image/svg+xml" },
          {
            src: "icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        // Precache the whole app + bundled animal images & fonts → full offline.
        globPatterns: ["**/*.{js,css,html,svg,png,jpg,jpeg,webp,woff,woff2}"],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
