import { Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  readonly inventoryContainer = '[data-test="inventory-container"]';
  readonly inventoryUrlPattern = /.*inventory\.html/;

  constructor(page: Page) {
    this.page = page;
  }

  // Шаг: ожидание загрузки страницы каталога
  async waitForInventory(timeout = 10000) {
    await this.page.locator(this.inventoryContainer).waitFor({ timeout });
  }

  // Результат: проверка, что открыта страница каталога
  async assertOpened() {
    await expect(this.page).toHaveURL(this.inventoryUrlPattern);
    await expect(this.page.locator(this.inventoryContainer)).toBeVisible();
  }

  // Шаг: добавить товар по названию (только на странице каталога)
  addItemByName(name: string) {
    return this.page.locator(`.inventory_item:has-text("${name}") >> [data-test^="add-to-cart"]`).click();
  }

  // Шаг: удалить товар по названию (только на странице каталога)
  removeItemByName(name: string) {
    return this.page.locator(`.inventory_item:has-text("${name}") >> [data-test^="remove"]`).click();
  }
}

