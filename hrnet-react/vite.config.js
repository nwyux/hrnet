import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // The modal package (../hrnet-modal) has its own node_modules for its build:
    // always use the app's single copy of React.
    dedupe: ['react', 'react-dom'],
  },
})
