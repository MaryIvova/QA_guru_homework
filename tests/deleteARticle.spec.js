import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { ArticleCreation, MyArticlesPage, ArticleEdit, LogInPage } from '../src/pages/index';

const URL = 'https://realworld.qa.guru';

test.describe('Логин', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    const logInPage = new LogInPage(page);

    await logInPage.userLogIn();
  });

  test('Delete My articles', async ({ page }) => {
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
