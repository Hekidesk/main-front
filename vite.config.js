import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  resolve: {
    alias: {
      HEKIDESK: path.resolve(
        path.dirname(fileURLToPath(import.meta.url)),
        "src"
      ),
    },
  },
  define: {
    "process.env": {
      REACT_APP_BASE_URL: "",
      REACT_APP_SITE_TOKEN: "https://api.hekidesk.com/",
    },
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
});
