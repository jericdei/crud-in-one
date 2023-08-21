import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    https: false,
    host: true,
    strictPort: true,
    port: 5174,
    hmr: {
        host: "localhost",
        protocol: "ws",
    },
    watch: {
        usePolling: true,
    },
},
})
