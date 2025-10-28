import { expect } from '@playwright/test';
import { title } from 'process';

export class HomePage {
  constructor(page) {
    this.signupLink = page.getByRole('link', { name: 'Sign up' });
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.navBar = page.getByRole('navigation', { name: 'Paginaton' });
    this.lastPage = page.getByRole('button', { name: 'Page 20' });
    this.like = page.locator('.ion-heart').click();
    this.userButton = page.locator('//*[@class="nav-link dropdown-toggle cursor-pointer"]');
    this.dropDownProfile = page.locator('//*[@class="dropdown-menu"]');
    this.buttonProfile = page.locator('.ion-person').locator('..');
    this.favoritesButton = page.locator('//*[text()="Favorited Articles"]');
  }
  getTags = (tag) => {
    return this.page.locator(`.tag-list .tag-pill:contains("реклама")`);
  };
  async likeArticle(article, tag) {
    const tags = this.getTags(tag);
    await tags.click();
    await expect(this.navBar).toBeVisible();
    await this.lastPage.click();
    await this.like.click();
    await this.userButton.click();
    await expect(this.dropDownProfile).toBeVisible();
    await this.buttonProfile.click();
    await this.favoritesButton.click();
  }
}
