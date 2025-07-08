import { test, expect } from '@playwright/test';
// Pre-condition
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

// Variables
const password = "secret_sauce" 

test('Login under standard_user', async ({ page }) => {
  // Steps
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
   // Results
  await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
  await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
});


test('Login under locked_out_user', async ({ page }) => {
   // Steps
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();
  // Results
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
});
