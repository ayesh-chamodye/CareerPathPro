import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "server/index.ts"),
      formats: ["cjs"],
    },
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      external: ["express", "axios", "cheerio", "fsevents", "lightningcss", "http", "node:path", "node:fs"],
    },
  },
});
