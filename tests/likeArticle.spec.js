import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { LogInPage, HomePage, FavoritesPage, ProfilePage } from '../src/pages/index';

const URL = 'https://realworld.qa.guru';
const lastPage = 20;
const articleTitle = 'Здесь могла бы быть ваша реклама';

test.describe('Логин', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
    const logInPage = new LogInPage(page);

    await logInPage.userLogIn();
  });

  test.only('Like article from tags', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openTag('реклама');
    await homePage.openPage(lastPage, articleTitle);
    await homePage.likeArticle(articleTitle);

    const profile = new ProfilePage(page);
    await profile.pageProfileopen();

    const favorites = new FavoritesPage(page);
    await favorites.checkFavorites(articleTitle);
    await expect(favorites.likeButton(articleTitle)).toHaveClass(/active/);
  });

  test.afterEach('unlike article', async ({ page }) => {
    const notFavorites = new FavoritesPage(page);
    await notFavorites.unLikeArticle(articleTitle);
    await expect(notFavorites.likeButton(articleTitle)).not.toHaveClass(/active/);
  });
});
