import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: 'chatbot',
  plugins: [react()],
  build: {
    outDir: 'dist', // Explicitly set output directory to match vercel.json
    emptyOutDir: true, // Clears the directory before each build
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]' // Better asset handling
      }
    }
  },
  server: {
    open: true // Optional: opens browser on dev server start
  }
})
