import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  workers: 2,
  timeout: 60000,
  use: { baseURL: "http://127.0.0.1:3000", trace: "retain-on-failure", channel: process.env.PLAYWRIGHT_CHANNEL, reducedMotion: "reduce" },
  projects: [{ name: "desktop", use: { ...devices['Desktop Chrome'] } }, { name: "mobile", use: { ...devices['iPhone 13'], defaultBrowserType: "chromium", deviceScaleFactor: 1 } }],
  webServer: { command: "npm start", url: `http://127.0.0.1:3000${process.env.NEXT_PUBLIC_BASE_PATH || ''}/`, reuseExistingServer: !process.env.CI, timeout: 120000 }
});
