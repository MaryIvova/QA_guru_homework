import { expect } from '@playwright/test';
import { title } from 'process';

export class MyArticlesPage {
  constructor(page) {
    this.page = page;
    this.userButton = page.locator('//*[@class="nav-link dropdown-toggle cursor-pointer"]');
    this.dropDownProfile = page.locator('//*[@class="dropdown-menu"]');
    this.buttonProfile = page.locator('.ion-person').locator('..');
  }
  getArticlePreview = () => {
    return this.page.locator(`//*[text()='${text}']`);
  };
  async checkCreatedArticle(article) {
    await this.userButton.click();
    await expect(this.dropDownProfile).toBeVisible();
    await this.buttonProfile.click();
    const locator = this.getArticlePreview(article.title);
    await expect(locator).toHaveText(article.title);
  }
}
