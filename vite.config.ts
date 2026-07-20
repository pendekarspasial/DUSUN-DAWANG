import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Fixed filenames (no content hash) so index.html always references
    // the same asset paths — prevents GitHub Pages CDN cache mismatches
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          // Keep images with their original names for easy debugging
          const name = assetInfo.name || '';
          if (/\.(png|jpg|jpeg|gif|svg|webp)$/.test(name)) {
            return `assets/${name}`;
          }
          // CSS gets a fixed name too
          if (/\.css$/.test(name)) {
            return 'assets/app.css';
          }
          return 'assets/[name]';
        },
      },
    },
  },
});
