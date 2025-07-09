import { test, expect } from '@playwright/test';

// Данные и селекторы
const password = 'secret_sauce';
const loginUrl = 'https://www.saucedemo.com/';
const inventoryUrlPattern = /.*inventory\.html/;
const lockedOutErrorText = 'Epic sadface: Sorry, this user has been locked out.';

const usernameInput = '[data-test="username"]';
const passwordInput = '[data-test="password"]';
const loginButton = '[data-test="login-button"]';
const inventoryContainer = '[data-test="inventory-container"]';
const errorMessage = '[data-test="error"]';

// Универсальный шаг логина
async function login(page, username: string) {
  await page.locator(usernameInput).fill(username);
  await page.locator(passwordInput).fill(password);
  await page.locator(loginButton).click();
}

// Открытие страницы перед каждым тестом
test.beforeEach(async ({ page }) => {
  await page.goto(loginUrl);
});

// Группа тестов
test.describe('Authorization tests for all users', () => {

  test('Login as standard_user', async ({ page }) => {
    // Авторизация
    await login(page, 'standard_user');

    // Проверка успешного входа
    await expect(page).toHaveURL(inventoryUrlPattern);
    await expect(page.locator(inventoryContainer)).toBeVisible();
  });

  test('Login as locked_out_user', async ({ page }) => {
    // Авторизация
    await login(page, 'locked_out_user');

    // Проверка сообщения об ошибке
    await expect(page.locator(errorMessage)).toContainText(lockedOutErrorText);
  });

  test('Login as problem_user', async ({ page }) => {
    // Авторизация
    await login(page, 'problem_user');

    // Проверка успешного входа
    await expect(page).toHaveURL(inventoryUrlPattern);
    await expect(page.locator(inventoryContainer)).toBeVisible();
  });

  test('Login as performance_glitch_user (check delay)', async ({ page }) => {
    // Авторизация
    await login(page, 'performance_glitch_user');

    // Проверка задержки и успешного входа
    await page.locator(inventoryContainer).waitFor({ timeout: 10000 });
    await expect(page).toHaveURL(inventoryUrlPattern);
    await expect(page.locator(inventoryContainer)).toBeVisible();
  });

  test('Login as error_user', async ({ page }) => {
    // Авторизация
    await login(page, 'error_user');

    // Проверка успешного входа
    await expect(page).toHaveURL(inventoryUrlPattern);
    await expect(page.locator(inventoryContainer)).toBeVisible();
  });

  test('Login as visual_user', async ({ page }) => {
    // Авторизация
    await login(page, 'visual_user');

    // Проверка успешного входа
    await expect(page).toHaveURL(inventoryUrlPattern);
    await expect(page.locator(inventoryContainer)).toBeVisible();
  });

});