import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/main-front/",
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
    },
  },
  define: {
    "process.env": { REACT_APP_BASE_URL: "/main-front" },
  },
  build: {
    rollupOptions: {
      external: ['primereact/Dropdown'],
    },
  },
});
