import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * The site is published by GitHub Pages straight off the `main` branch
 * (Settings → Pages → Deploy from a branch → main / root), so the build has
 * to land at the repository root and be committed alongside the source.
 *
 * Sources therefore live in app/, and the build writes index.html + assets/
 * one level up.
 */
export default defineConfig({
  root: 'app',
  // Relative asset paths — works from the /For-you/ project path, from any
  // other host, and straight off the filesystem.
  base: './',
  plugins: [react()],
  build: {
    outDir: '..',
    // Critical: outDir is the repo root. Emptying it would delete the
    // sources, package.json and .git housekeeping alongside them.
    emptyOutDir: false,
    target: 'es2018',
    assetsInlineLimit: 8192,
  },
});
