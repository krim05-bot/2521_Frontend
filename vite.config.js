export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://13.124.245.13:8080/',  // ✅ 새 서버 IP
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'