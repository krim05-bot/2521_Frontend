export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://minsaengcheck.syu-likelion.org',  // ✅ 새 서버 IP
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'