import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const password = 'secret_sauce';

test.describe('Authorization tests for all users (POM)', () => {
    let loginPage: LoginPage;

    // beforeEach выполнится перед каждым тестом внутри describe
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);  // создаём объект LoginPage
        await loginPage.goto();           // переходим на страницу логина
    });

    test('Login as standard_user', async () => {
        // Шаги
        await loginPage.login('standard_user', password);

        // Результат
        expect(await loginPage.isOnInventoryPage()).toBeTruthy(); 
        expect(await loginPage.isInventoryVisible()).toBeTruthy(); 
    });

    test('Login as locked_out_user', async () => {
        // Шаги
        await loginPage.login('locked_out_user', password);

        // Результат
        const errorText = await loginPage.getErrorMessage();
        expect(errorText).toContain('Sorry, this user has been locked out.');
    });

    test('Login as problem_user', async () => {
        // Шаги
        await loginPage.login('problem_user', password);

        // Результат
        expect(await loginPage.isOnInventoryPage()).toBeTruthy();
        expect(await loginPage.isInventoryVisible()).toBeTruthy();
    });

    test('Login as performance_glitch_user (check delay)', async () => {
        // Шаги
        await loginPage.login('performance_glitch_user', password);

        // Результат
        await loginPage.waitForInventory(); // ждём появление товаров
        expect(await loginPage.isOnInventoryPage()).toBeTruthy();
        expect(await loginPage.isInventoryVisible()).toBeTruthy();
    });

    test('Login as error_user', async () => {
        // Шаги
        await loginPage.login('error_user', password);

        // Результат
        expect(await loginPage.isOnInventoryPage()).toBeTruthy();
        expect(await loginPage.isInventoryVisible()).toBeTruthy();
    });

    test('Login as visual_user', async () => {
        // Шаги
        await loginPage.login('visual_user', password);

        // Результат
        expect(await loginPage.isOnInventoryPage()).toBeTruthy();
        expect(await loginPage.isInventoryVisible()).toBeTruthy();
    });
});
