import { defineConfig } from 'vitest/config';
import path from 'node:path';
export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: ['tests/e2e/**', 'node_modules/**'],
    setupFiles: ['./tests/setup.ts'],
    coverage: { reporter: ['text', 'json'] },
  },
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
});
