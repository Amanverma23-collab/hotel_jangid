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
        // Priority for Canonical Domain:
        // 1. Explicit CUSTOM_DOMAIN environment variable (e.g. hoteljangid.in)
        // 2. VERCEL_PROJECT_PRODUCTION_URL (set by Vercel to 'hoteljangid.vercel.app' or custom production domain)
        // 3. Default to 'hoteljangid.vercel.app'
        const domain = process.env.CUSTOM_DOMAIN || process.env.VERCEL_PROJECT_PRODUCTION_URL || 'hoteljangid.vercel.app';
        const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/+$/, '');
        const canonicalUrl = `https://${cleanDomain}/`;
        let transformed = html.replace(/__CANONICAL_URL__/g, canonicalUrl);
        if (!domain.includes('hoteljangid.in')) {
          transformed = transformed.replace(/https:\/\/hoteljangid\.in\//g, canonicalUrl);
        }
        return transformed;
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

