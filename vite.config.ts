import type { UserConfig as VitestUserConfig } from "vitest/config";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { compression } from "vite-plugin-compression2"

const vitestConfig: VitestUserConfig = {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), compression({
    algorithm: "brotliCompress",
  })],
  ...vitestConfig,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
