import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  webServer: {
    command:
      "NEXT_PUBLIC_BASE_PATH='' NEXT_PUBLIC_SITE_URL='http://localhost:3100' pnpm dev --port 3100",
    url: 'http://localhost:3100',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  use: { baseURL: 'http://localhost:3100', trace: 'on-first-retry' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'], browserName: 'chromium' } },
  ],
});
