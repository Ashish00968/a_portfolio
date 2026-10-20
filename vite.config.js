import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404-for-gh-pages',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist')
        const indexHtml = path.join(distDir, 'index.html')
        const notFoundHtml = path.join(distDir, '404.html')
        if (fs.existsSync(indexHtml)) {
          fs.copyFileSync(indexHtml, notFoundHtml)
        }
      },
    },
  ],
  base:
    process.env.VITE_BASE ||
    (process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_PAGES === 'true'
      ? '/a_portfolio/'
      : '/'),
})
