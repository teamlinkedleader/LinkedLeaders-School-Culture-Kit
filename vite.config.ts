import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // `host: true` binds all interfaces, which WebContainer-based
    // environments like Bolt need in order to reach the dev server.
    host: true,
    // Deliberately no `strictPort`. With it, a port already in use is a fatal
    // error rather than a prompt to try the next one, which is what broke
    // Bolt previews: a leftover dev process holding 5173 made every
    // subsequent start fail instead of quietly moving to 5174.
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
