import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly usernameInput = '[data-test="username"]';
  readonly passwordInput = '[data-test="password"]';
  readonly loginButton = '[data-test="login-button"]';
  readonly errorMessage = '[data-test="error"]';

  constructor(page: Page) {
    this.page = page;
  }

  // Шаги
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Шаги
  async login(username: string, password: string) {
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  // Результат: отображается сообщение об ошибке
  async assertErrorMessage(expectedText: string) {
    await expect(this.page.locator(this.errorMessage)).toContainText(expectedText);
  }
}
