import analog from '@analogjs/platform';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => ({
  root: __dirname,
  publicDir: 'src/public',
  build: {
    outDir: '../../dist/apps/docs-app/client',
    emptyOutDir: true,
    reportCompressedSize: true,
    target: ['es2024'],
  },
  plugins: [analog(), tailwindcss()],
}));
