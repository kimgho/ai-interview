import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/shared/lib/setup.ts',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/ui': path.resolve(__dirname, './src/components/ui'),
        },
    },
})