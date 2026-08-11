import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works from a GitHub Pages project path
// (user.github.io/for-you/) as well as from any other host or a local file.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2018',
    assetsInlineLimit: 8192,
  },
});
