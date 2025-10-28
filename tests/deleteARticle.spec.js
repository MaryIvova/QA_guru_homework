import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { ArticleCreation, MyArticlesPage, ArticleEdit, LogInPage } from '../../src/pages/index';

// Or create the file '../src/pages/mainPage.js' if it does not exist.

const URL = 'https://realworld.qa.guru';

test.describe('Логин', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    const logInPage = new LogInPage(page);
    //const yourFeed = page.getByRole('button', { name: 'Your Feed' });

    await logInPage.userLogIn();
    await expect(page).toHaveURL('https://realworld.qa.guru/#/');
  });

  test.only('Delete My articles', async ({ page }) => {
    const article = {
      title: faker.word.adjective(),
      description: faker.word.adjective(),
      text: faker.lorem.lines(3),
      tags: faker.word.adjective(),
    };

    const newArticle = new ArticleCreation(page);
    await newArticle.createArticle(article);

    const myArticlesPage = new MyArticlesPage(page);
    await myArticlesPage.checkCreatedArticle(article);

    const editArticte = new ArticleEdit(page);
    await editArticte.deleteArticle(article);
    await editArticte.checkDeletedArticle(article);
  });
});
