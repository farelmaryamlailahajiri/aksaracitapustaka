// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // vite.config.js - OPSI A
    // vite.config.js - UPDATE UNTUK LOKASI BARU
    // ...
    proxy: {
      "/api": {
        target: "http://localhost", // Target server backend (misal: port 80)
        changeOrigin: true,
        rewrite: (path) =>
          // Ganti ke base path baru tempat API Anda berada
          path.replace(
            /^\/api/,
            "/aksaracitapustaka/backend/api"
            // Permintaan: /api/auth/login.php
            // Hasil: http://localhost/aksaracitapustaka/backend/api/auth/login.php
          ),
      },
     "/file.php": {
        target: "http://localhost", // Target ke server backend
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/file\.php/,
            "/aksaracitapustaka/frontend/public/file.php"
          ),
      },
    },
  },
  clearScreen: false,
});
