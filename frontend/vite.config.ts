import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  //bind server host and port
  server: {
    host: '0.0.0.0',
    port: 3000, // Change this to your desired port
  },
  plugins: [react()],
})
