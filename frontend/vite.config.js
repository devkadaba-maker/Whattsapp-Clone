import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Add the specific Replit host to the allowedHosts array
    allowedHosts: [
      'cb378054-078b-4d30-a41a-2135c7a4caff-00-2uq7d29wzoour.picard.replit.dev',
      '.replit.dev' // You can also use a wildcard for all Replit subdomains
    ]
  }
})