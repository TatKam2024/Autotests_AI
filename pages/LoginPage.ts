import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  // Селекторы
  readonly usernameInput = '[data-test="username"]';
  readonly passwordInput = '[data-test="password"]';
  readonly loginButton = '[data-test="login-button"]';
  readonly inventoryContainer = '[data-test="inventory-container"]';
  readonly errorMessage = '[data-test="error"]';
  readonly inventoryUrlPattern = /.*inventory\.html/;

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

  // Результат: проверка успешного входа и отображения страницы с товарами
  async assertSuccessfulLogin() {
    await expect(this.page).toHaveURL(this.inventoryUrlPattern);
    await expect(this.page.locator(this.inventoryContainer)).toBeVisible();
  }

  // Результат: проверка текста ошибки на странице
  async assertErrorMessage(expectedText: string) {
    await expect(this.page.locator(this.errorMessage)).toContainText(expectedText);
  }

  // Шаги: явное ожидание загрузки страницы с товарами
  async waitForInventory(timeout = 10000) {
    await this.page.locator(this.inventoryContainer).waitFor({ timeout });
  }
}
