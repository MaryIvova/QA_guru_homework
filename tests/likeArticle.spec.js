import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { LogInPage } from '../../src/pages/logIn.Page';
import { HomePage } from '../../src/pages/index';

// Or create the file '../src/pages/mainPage.js' if it does not exist.

const URL = 'https://realworld.qa.guru';

test.describe('Логин', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    const logInPage = new LogInPage(page);

    await logInPage.userLogIn();
    await expect(page).toHaveURL('https://realworld.qa.guru/#/');
  });

  test('Like article from tags', async ({ page }) => {});
});
