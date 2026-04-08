import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/marvel-heroes-omega-note/',
  build: {
    outDir: 'dist',
  },
});
