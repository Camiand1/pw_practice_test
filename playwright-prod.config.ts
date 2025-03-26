import { defineConfig, devices } from '@playwright/test';
import type {TestOptions} from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  use: {
    globalsQAURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: 'https://practicetestautomation.com/practice-test-login/'
    },

  projects: [
    {
      name: 'chromium',
    }
  ],
});  

// to execute this config file, we execute in the terminal:
// npx playwright test --config=playwright-prod.config.ts
