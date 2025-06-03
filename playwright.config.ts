import { EyesFixture } from '@applitools/eyes-playwright/fixture';
import { defineConfig, devices } from '@playwright/test';
import type {TestOptions} from './test-options';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<EyesFixture>({
  //timeout: 10000,
  //globalTimeout:60000,
 /** expect:{
    timeout: 5000
  },*/ 
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: ['html', 'allure-playwright'],
  // it can also be: reporter: 'list', reporter: 'json', 
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,
        // Set your Argos token (required if not using GitHub Actions).
        //token: "<YOUR-ARGOS-TOKEN>",
      },
    ],
    ['json', {outputFile: 'test-results/jsonResport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.jxml'}],
    ['allure-playwright'],
    ['html']
],  


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Configuration for Eyes VisualAI */
    eyesConfig: {
      /* The following and other configuration parameters are documented at: https://applitools.com/tutorials/playwright/api/overview */
      apiKey: 'camila-applotool-playwright', // alternatively, set this via environment variable APPLITOOLS_API_KEY
      // serverUrl: 'https://eyes.applitools.com',

      // failTestsOnDiff: false,
      // appName: 'My App',
      // matchLevel: 'Strict',
      // batch: { name: 'My Batch' },
      // proxy: {url: 'http://127.0.0.1:8888'},
      // stitchMode: 'CSS',
      // matchTimeout: 0,
      // waitBeforeScreenshots: 50,
      // saveNewTests: true,
    },

    /* Base URL to use in actions like `await page.goto('/')`. */
    //baseURL: 'https://demoqa.com/automation-practice-form',
    globalsQAURL: 'https://demoglobalsqa.com/automation-practice-form',
    //Execute a env depending the command that is sent as DEV = 1
    baseURL: process.env.DEV ==='1' ? 'https://practicetestautomation.com/practice-test-login/'
          : process.env.STAGGING == '1' ? 'https://demostagging.com/automation-practice-form'
          : 'https://demodev.com/automation-practice-form',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    //actionTimeout: 5000,
    navigationTimeout: 5000,
    video: {
      mode: 'on',
      size: {width: 1920, height:1080}
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'https://demodev.com/automation-practice-form'
       },
    },
    {
      name: 'stagging',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'https://demostagging.com/automation-practice-form'
      },
    },
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: { 
        browserName: 'firefox' //better use
       },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
    {name: 'pageObjectFullScreen',
      testMatch: 'usePagePbject.spec.ts',
      use: {
        viewport: {width: 1920, height: 1080}
      }// now I can execute from the testing section
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spect.ts',
      use: {
        ...devices['iPhone 13 Pro']
      }
    }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
