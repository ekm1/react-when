import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@ekm1/react-when': path.resolve(__dirname, '../src/index.ts')
    }
  },
  optimizeDeps: {
    exclude: ['@ekm1/react-when']
  }
})
