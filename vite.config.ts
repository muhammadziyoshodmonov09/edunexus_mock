import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Fix: Use '.' instead of process.cwd() to resolve type error
  const env = loadEnv(mode, '.', '');

  // Priority: VITE_API_KEY (Netlify standard) -> API_KEY (Fallback) -> empty string
  const apiKey = env.VITE_API_KEY || env.API_KEY || process.env.VITE_API_KEY || process.env.API_KEY || '';

  return {
    plugins: [react()],
    define: {
      // Define `process.env` as an object to prevent "process is not defined" errors in browser
      'process.env': {
        API_KEY: apiKey,
        NODE_ENV: process.env.NODE_ENV || 'development'
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
            charts: ['recharts'],
            ui: ['lucide-react']
          }
        }
      },
      chunkSizeWarningLimit: 1000
    }
  };
});