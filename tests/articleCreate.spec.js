import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { LogInPage, ArticleCreation, MyArticlesPage, ProfilePage } from '../src/pages/index';

const URL = 'https://realworld.qa.guru';

test.describe('Логин', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    const logInPage = new LogInPage(page);
    await logInPage.userLogIn();
  });

  test('New Article', async ({ page }) => {
    const article = {
      title: faker.word.adjective(),
      description: faker.word.adjective(),
      text: faker.lorem.lines(3),
      tags: faker.word.adjective(),
    };

    const newArticle = new ArticleCreation(page);
    await newArticle.createArticle(article);
    expect(newArticle.articleTT).toBeVisible;
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

    const profile = new ProfilePage(page);
    await profile.pageProfileopen();

    const myArticlesPage = new MyArticlesPage(page);
    await myArticlesPage.checkCreatedArticle(article);
    const locator = myArticlesPage.getArticlePreview(article.title);
    await expect(locator).toHaveText(article.title);
  });
});
