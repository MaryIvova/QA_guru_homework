import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { LogInPage } from '../../src/pages/logIn.Page';
import { ArticleCreation, MyArticlesPage } from '../../src/pages/index';

// Or create the file '../src/pages/mainPage.js' if it does not exist.

const URL = 'https://realworld.qa.guru';

test.describe('Логин', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    const logInPage = new LogInPage(page);

    await logInPage.userLogIn();
    await expect(page).toHaveURL('https://realworld.qa.guru/#/');
  });

  test('New Article', async ({ page }) => {
    const article = {
      title: faker.word.adjective(),
      description: faker.word.adjective(),
      text: faker.lorem.lines(3),
      tags: faker.word.adjective(),
    };
    const articleTT = page.locator('//*[class="col-md-12"]');

    const newArticle = new ArticleCreation(page);
    await newArticle.createArticle(article);

    expect(articleTT).toBeVisible;
  });

  test('Check My articles', async ({ page }) => {
    const article = {
      title: faker.word.adjective(),
      description: faker.word.adjective(),
      text: faker.lorem.lines(3),
      tags: faker.word.adjective(),
    };
    const newArticle = new ArticleCreation(page);
    await newArticle.createArticle(article);

    const myArticlesPage = new MyArticlesPage(page);
    await myArticlesPage.checkCreatedArticle(article.title);
  });
});
