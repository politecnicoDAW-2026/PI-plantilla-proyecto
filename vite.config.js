import { defineConfig } from 'vite';

export default defineConfig({
  // En GitHub Pages la web vive en /<nombre-del-repositorio>/: el workflow de Pages pasa VITE_BASE.
  // En local, en la raíz.
  base: process.env.VITE_BASE ?? '/',
  test: {
    // Vitest solo mira test/: los de e2e/ son de Playwright
    include: ['test/**/*.test.js'],
  },
});
