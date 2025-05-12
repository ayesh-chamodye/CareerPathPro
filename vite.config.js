import { defineConfig } from 'vite';
import {fileURLToPath} from 'url';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';



const __dirname = path.dirname(fileURLToPath(import.meta.url));


export default defineConfig({
  root: 'client',
  plugins: [tsconfigPaths()],
  server: {
    hmr: {
      overlay: true,
    },
  },
  // ...existing code...
  resolve: {
alias: {
'@': path.resolve(__dirname, 'client/src'),
  '@shared': path.resolve(__dirname, 'shared'),
},
},
 build: {
 outDir: '../dist',
 emptyOutDir: true,
}, 
}); 
