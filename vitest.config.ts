import { defineConfig } from 'vitest/config';
import aliases from './aliases';

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [
      "src/tests/**/helpers/**/*",
    ],
    include: [
      "src/tests/**/*",
    ],
  },
  resolve: {
    alias: aliases,
  },
});
