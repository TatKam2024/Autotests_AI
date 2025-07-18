
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

// Типы фикстур
type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  standardUser: void;
};

// Расширяем Playwright test
export const test = base.extend<Fixtures>({
  // Инициализация страницы логина
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  // Инициализация страницы каталога
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  // Инициализация страницы корзины
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  // Авторизация стандартным пользователем
  standardUser: async ({ loginPage }, use) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await use(); // ничего не возвращает — только выполняет вход
  },
});

export { expect };
