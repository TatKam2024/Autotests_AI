import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

const password = 'secret_sauce';
const lockedOutErrorText = 'Epic sadface: Sorry, this user has been locked out.';

test.describe('Authorization tests for all users (POM)', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    // Вспомогательная функция
    const loginAndAssertSuccess = async (username: string) => {
        // Шаги
        await loginPage.login(username, password);

        // Результат: отображается страница товаров
        await inventoryPage.assertOpened();
    };

    test.beforeEach(async ({ page }) => {
        // Шаги
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goto();
    });

    // ✅ Проверка успешной авторизации под стандартным пользователем
    test('Login as standard_user', async () => {
        // Шаги
        await loginAndAssertSuccess('standard_user');
    });

    // ❌ Проверка, что заблокированный пользователь получает сообщение об ошибке
    test('Login as locked_out_user', async () => {
        // Шаги
        await loginPage.login('locked_out_user', password);

        // Результат: отображается сообщение об ошибке
        await loginPage.assertErrorMessage(lockedOutErrorText);
    });

    // ✅ Проверка авторизации под проблемным пользователем
    test('Login as problem_user', async () => {
        // Шаги
        await loginAndAssertSuccess('problem_user');
    });

    // ✅ Проверка авторизации с задержкой загрузки страницы
    test('Login as performance_glitch_user (check delay)', async () => {
        // Шаги
        await loginPage.login('performance_glitch_user', password);

        // Результат: после задержки отображается страница товаров
        await inventoryPage.waitForInventory();
        await inventoryPage.assertOpened();
    });

    // ✅ Проверка авторизации под error_user
    test('Login as error_user', async () => {
        // Шаги
        await loginAndAssertSuccess('error_user');
    });

    // ✅ Проверка авторизации под visual_user
    test('Login as visual_user', async () => {
        // Шаги
        await loginAndAssertSuccess('visual_user');
    });
});
