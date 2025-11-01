import { expect } from '@playwright/test';

export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.userButton = page.locator('.nav-link.dropdown-toggle');
    this.dropDownMenu = page.locator('.dropdown-menu:visible');
    this.buttonProfile = page.locator('.ion-person').locator('..');
    this.subMenu = (submenu) => page.locator(`a.dropdown-item:has-text('"${submenu}")`);
  }

  async pageProfileopen() {
    await this.userButton.click();
    await expect(this.dropDownMenu).toBeVisible();
    await this.buttonProfile.click();
  }

  /*async openProfileSubmenu(submenu) {
    await this.userButton.click();
    await expect(this.dropDownMenu).toBeVisible();
    await this.submenu(submenu).click();
  }*/
}
