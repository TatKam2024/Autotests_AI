import { test, expect } from '../fixtures/baseTest';

const password = 'secret_sauce';
const lockedOutErrorText = 'Epic sadface: Sorry, this user has been locked out.';

test.describe('Authorization tests for all users (POM + fixtures)', () => {
    // Вспомогательная функция
    const loginAndAssertSuccess = async (loginPage, inventoryPage, username: string) => {
        // Шаги
        await loginPage.login(username, password);

        // Результат: отображается страница товаров
        await inventoryPage.assertOpened();
    };

    // ✅ Проверка успешной авторизации под стандартным пользователем
    test('Login as standard_user', async ({ loginPage, inventoryPage }) => {
        // Шаги
        await loginAndAssertSuccess(loginPage, inventoryPage, 'standard_user');
    });

    // ❌ Проверка, что заблокированный пользователь получает сообщение об ошибке
    test('Login as locked_out_user', async ({ loginPage }) => {
        // Шаги
        await loginPage.login('locked_out_user', password);

        // Результат: отображается сообщение об ошибке
        await loginPage.assertErrorMessage(lockedOutErrorText);
    });

    // ✅ Проверка авторизации под проблемным пользователем
    test('Login as problem_user', async ({ loginPage, inventoryPage }) => {
        // Шаги
        await loginAndAssertSuccess(loginPage, inventoryPage, 'problem_user');
    });

    // ✅ Проверка авторизации с задержкой загрузки страницы
    test('Login as performance_glitch_user (check delay)', async ({ loginPage, inventoryPage }) => {
        // Шаги
        await loginPage.login('performance_glitch_user', password);

        // Результат: после задержки отображается страница товаров
        await inventoryPage.waitForInventory();
        await inventoryPage.assertOpened();
    });

    // ✅ Проверка авторизации под error_user
    test('Login as error_user', async ({ loginPage, inventoryPage }) => {
        // Шаги
        await loginAndAssertSuccess(loginPage, inventoryPage, 'error_user');
    });

    // ✅ Проверка авторизации под visual_user
    test('Login as visual_user', async ({ loginPage, inventoryPage }) => {
        // Шаги
        await loginAndAssertSuccess(loginPage, inventoryPage, 'visual_user');
    });
});
