import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// URL pública del sitio para index.html (canonical, Open Graph, Schema.org).
// Si VITE_SITE_URL no está definida en el entorno (Netlify/Vercel o .env),
// se usa la de Netlify para que el build no falle.
process.env.VITE_SITE_URL ||= 'https://ramirogonzalezsales.netlify.app'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './assets'),
    },
  },
})
