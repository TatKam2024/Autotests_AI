import { Page, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;

    readonly inventoryContainer = '[data-test="inventory-container"]';
    readonly inventoryUrlPattern = /.*inventory\.html/;

    constructor(page: Page) {
        this.page = page;
    }

    // Шаги
    async waitForInventory(timeout = 10000) {
        await this.page.locator(this.inventoryContainer).waitFor({ timeout });
    }

    // Результат: отображается страница товаров
    async assertOpened() {
        await expect(this.page).toHaveURL(this.inventoryUrlPattern);
        await expect(this.page.locator(this.inventoryContainer)).toBeVisible();
    }
}
