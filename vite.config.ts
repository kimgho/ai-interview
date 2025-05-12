import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { compression } from "vite-plugin-compression2"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), compression({
    algorithm: "brotliCompress",
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})