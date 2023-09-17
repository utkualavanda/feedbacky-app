import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/test/setupTest.ts", "src/test/testUtils.tsx"],
    coverage: {
      exclude: ['src/test/**']
    }
  },
});
