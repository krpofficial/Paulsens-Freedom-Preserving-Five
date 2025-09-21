import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@core': path.resolve(__dirname, '../src/core'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@types': path.resolve(__dirname, '../src/types'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, '../src/index.ts'),
      name: 'ConstitutionalHandshakeProtocol',
      fileName: 'chp',
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: [],
      output: {
        globals: {},
      },
    },
  },
})
