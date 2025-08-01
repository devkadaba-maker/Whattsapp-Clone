import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: "cb378054-078b-4d30-a41a-2135c7a4caff-00-2uq7d29wzoour.picard.replit.dev" ,
        changeOrigin: true,
        },
    },
    allowedHosts: ['cb378054-078b-4d30-a41a-2135c7a4caff-00-2uq7d29wzoour.picard.replit.dev']
  }
})