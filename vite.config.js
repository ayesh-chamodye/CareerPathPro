import { defineConfig } from 'vite';
import {fileURLToPath} from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


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
