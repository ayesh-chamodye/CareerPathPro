import { defineConfig } from 'vite';

export default defineConfig({
  root: 'client',
  server: {
    hmr: {
      overlay: true,
    },
  },
  // ...existing code...
 build: {
 outDir: '../dist',
 emptyOutDir: true,
}, 
}); 
