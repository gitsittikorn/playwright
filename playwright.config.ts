import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import path from "path";
// dotenv.config({ path: path.resolve(__dirname, '.env') });

dotenv.config({
  path: path.join(
    process.cwd(),
    "./environments",
    `.env.${process.env.NODE_ENV ?? "qa"}`
  ),
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests/",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // playwright.config.ts
  reporter: [
    ["html", { open: "never" }],
    ["allure-playwright"],
    ["json", { outputFile: "playwright-report/data/test-results.json" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on", // 'on' = always, 'on-first-retry' = only on first retry, 'off' = never
    actionTimeout: 10_000, // 10 seconds for each action such as click, fill, etc.
    navigationTimeout: 15_000, // 15 seconds for navigation actions such as page.goto()
    headless: true, // false = เปิด browser ขึ้นมาให้เห็น , true = run headless
    screenshot: "on", //  'off' = ไม่ถ่ายภาพเลย, 'on' = ถ่ายภาพทุก step , 'only-on-failure' = ถ่ายเฉพาะเมื่อเทสต์ล้มเหลว (แนะนำ)
    video: "on", // (optional) ถ้าอยากได้ video ด้วย  , retain-on-failure = ถ่ายเฉพาะเมื่อเทสต์ล้มเหลว (แนะนำ)
  },
  timeout: 300_000, // 5 minutes for each test
  expect: {
    timeout: 18000, // default timeout สำหรับ expect()
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Desktop - Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "Desktop - chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Desktop - safari",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Desktop - Microsoft Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "Desktop - firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
