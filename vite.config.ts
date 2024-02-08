import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import aliases from './aliases'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: aliases,
  },
  plugins: [react()],
})
