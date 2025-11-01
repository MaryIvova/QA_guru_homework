import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { LogInPage, SettingsPage } from '../src/pages/index';

// Or create the file '../src/pages/mainPage.js' if it does not exist.

const URL = 'https://realworld.qa.guru';

test.describe('Логин', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    const logInPage = new LogInPage(page);

    await logInPage.userLogIn();
    await expect(page).toHaveURL('https://realworld.qa.guru/#/');
  });
  test('Edit Profile', async ({ page }) => {
    const settingsPage = new SettingsPage(page);
    await settingsPage.profileEdit();
  });
});
