import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite configuration - check their docs if you need to change this
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
