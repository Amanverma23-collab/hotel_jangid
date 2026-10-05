import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-canonical-plugin',
      transformIndexHtml(html) {
        const isPreview = process.env.VERCEL_ENV === 'preview' || (process.env.VERCEL_URL && !process.env.VERCEL_URL.includes('hoteljangid.in'));
        const canonicalUrl = isPreview && process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}/`
          : 'https://hoteljangid.in/';
        return html.replace(/__CANONICAL_URL__/g, canonicalUrl);
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    legalComments: 'none',
    drop: ['console', 'debugger'],
  },
  build: {
    minify: 'esbuild',
    target: 'es2020',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-animation': ['gsap', 'framer-motion'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true
  }
});

