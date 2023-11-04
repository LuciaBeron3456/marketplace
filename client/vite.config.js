import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'simple-peer': 'simple-peer/simplepeer.min.js'
    }
  },
  server: {
    hmr: false
  }
});