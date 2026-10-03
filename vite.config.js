import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    modulePreload: false,
    rollupOptions: {
      input: {
        index: resolve(rootDir, 'dev.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('node_modules/@react-three')) return 'r3f'
          if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) return 'motion'
          return undefined
        },
      },
    },
    assetsDir: 'assets',
    sourcemap: false,
  },
})
