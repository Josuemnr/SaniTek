import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  'global': {}, // Esto es para evitar errores relacionados con 'global' en algunas bibliotecas
  },
})
