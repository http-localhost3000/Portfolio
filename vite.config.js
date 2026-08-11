import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // If the request is exactly '/contact', rewrite it internally to serve the contact page
          if (req.url === '/contact') {
            req.url = '/contact/index.html';
          } else if (req.url === '/contact/') {
            req.url = '/contact/index.html';
          }
          next();
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
      },
    },
  },
})
