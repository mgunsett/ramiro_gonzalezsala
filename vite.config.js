import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// URL pública del sitio para index.html (canonical, Open Graph, Schema.org).
// Si VITE_SITE_URL no está definida en el entorno (Netlify/Vercel o .env),
// se usa el dominio del sitio para que el build no falle.
process.env.VITE_SITE_URL ||= 'https://ramirogonzalezdt.com'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './assets'),
    },
  },
})
