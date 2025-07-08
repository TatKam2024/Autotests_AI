import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Переход на страницу логина
    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    // Авторизация с заданным логином и паролем
    async login(username: string, password: string) {
        await this.page.locator('[data-test="username"]').fill(username);
        await this.page.locator('[data-test="password"]').fill(password);
        await this.page.locator('[data-test="login-button"]').click();
    }

    // Проверка, отображается ли страница инвентаря
    async isInventoryVisible() {
        return this.page.locator('[data-test="inventory-container"]').isVisible();
    }

    // Проверка URL после входа
    async isOnInventoryPage() {
        return this.page.url().includes('inventory.html');
    }

    // Получение текста ошибки при неудачном входе
    async getErrorMessage() {
        return this.page.locator('[data-test="error"]').innerText();
    }

    // Явное ожидание появления инвентаря (для замедленного входа)
    async waitForInventory(timeout = 10000) {
        await this.page.locator('[data-test="inventory-container"]').waitFor({ timeout });
    }
}
