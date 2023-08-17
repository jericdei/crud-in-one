import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    https: false,
    host: true,
    strictPort: true,
    port: 5173,
    hmr: {
        host: "localhost",
        protocol: "ws",
    },
    watch: {
        usePolling: true,
    },
},
})
