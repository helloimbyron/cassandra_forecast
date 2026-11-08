import { defineConfig } from "@playwright/test";

const baseURL = "http://localhost:4321";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.e2e.ts",
  use: { baseURL, browserName: "chromium" },
  webServer: {
    command: "pnpm exec astro dev --host localhost --port 4321",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
