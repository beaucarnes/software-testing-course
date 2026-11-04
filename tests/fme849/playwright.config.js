// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright configuration for TechMart e-commerce automated tests (fme849)
 * Priority features:
 * - Auto-waiting enabled by default on all Web-first assertions
 * - Resilient user-facing locators
 * - Trace Viewer capture on failure or on first retry for debugging
 * - Failure screenshots & video
 */
module.exports = defineConfig({
  testDir: './test-scripts',
  
  // Run tests sequentially to preserve in-memory session and stock state
  fullyParallel: false,
  workers: 1,

  // Test timeout (30 seconds)
  timeout: 30000,
  
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list']
  ],

  use: {
    baseURL: 'http://localhost:3000',
    
    // Playwright strength features:
    // 1. Trace Viewer: full DOM snapshots, network, console logs & action timeline
    trace: 'retain-on-failure',
    
    // 2. Failure screenshots
    screenshot: 'only-on-failure',
    
    // 3. Failure video recording
    video: 'retain-on-failure',

    // 4. Action & navigation timeouts
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Automatically start TechMart server if not already running
  webServer: {
    command: 'cd ../../sample-app && npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
