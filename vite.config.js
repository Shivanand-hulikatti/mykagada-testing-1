import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: '/mykagada-testing-1/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into a separate chunk
          vendor: ['react', 'react-dom'],
          // Remove or correct the largeModule chunk if not needed
          // largeModule: ['./src/largeModule.js']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Adjust the chunk size warning limit
  }
})
