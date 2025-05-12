import { defineConfig } from 'vite';

export default defineConfig({
  root: 'client',
  server: {
    hmr: {
      overlay: true,
    },
  },
  // ...existing code...
  resolve: {
alias: {
'@': path.resolve(__dirname, 'client/src'),
},
},
 build: {
 outDir: '../dist',
 emptyOutDir: true,
}, 
}); 
