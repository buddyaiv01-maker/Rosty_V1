import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served at https://buddyaiv01-maker.github.io/Rosty_V1/ via GitHub Pages.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/Rosty_V1/' : '/',
  plugins: [react()],
  server: {
    port: 5184,
    strictPort: false,
  },
}))
