import { test, expect } from '../fixtures/baseTest';

// Группа тестов для проверки функциональности корзины
test.describe('Cart functionality (POM + standardUser fixture)', () => {
  
  // ✅ Добавление одного товара в корзину
  test('Add one item to cart', async ({ standardUser, inventoryPage, cartPage }) => {
    // Шаги
    await inventoryPage.addItemByName('Sauce Labs Backpack');
    await cartPage.assertBadgeCount(1);
    await cartPage.openCart();

    // Результат: в корзине 1 товар
    await cartPage.assertItemsCount(1);
  });

  // ✅ Удаление одного товара из корзины
  test('Remove item from cart', async ({ standardUser, inventoryPage, cartPage }) => {
    // Шаги
    await inventoryPage.addItemByName('Sauce Labs Backpack');
    await cartPage.openCart();
    await cartPage.removeItemByName('Sauce Labs Backpack');

    // Результат: корзина пуста
    await cartPage.assertItemsCount(0);
    await cartPage.assertBadgeCount(0);
  });

  // ✅ Добавление нескольких товаров и проверка счётчика
  test('Add multiple items and check counter', async ({ standardUser, inventoryPage, cartPage }) => {
    // Шаги
    await inventoryPage.addItemByName('Sauce Labs Backpack');
    await inventoryPage.addItemByName('Sauce Labs Bike Light');
    await cartPage.assertBadgeCount(2);
    await cartPage.openCart();

    // Результат: 2 товара в корзине
    await cartPage.assertItemsCount(2);
  });

  // ✅ Удаление нескольких товаров и проверка обнуления
  test('Remove multiple items and check counter', async ({ standardUser, inventoryPage, cartPage }) => {
    // Шаги
    await inventoryPage.addItemByName('Sauce Labs Backpack');
    await inventoryPage.addItemByName('Sauce Labs Bike Light');
    await cartPage.openCart();
    await cartPage.removeItemByName('Sauce Labs Backpack');
    await cartPage.removeItemByName('Sauce Labs Bike Light');

    // Результат: корзина пуста
    await cartPage.assertItemsCount(0);
    await cartPage.assertBadgeCount(0);
  });

  // ✅ Сохранение корзины после Continue Shopping
  test('Cart persists after Continue Shopping', async ({ standardUser, inventoryPage, cartPage }) => {
    // Шаги
    await inventoryPage.addItemByName('Sauce Labs Backpack');
    await cartPage.openCart();
    await cartPage.continueShopping();

    // Результат: товар по-прежнему в корзине
    await cartPage.assertBadgeCount(1);
    await cartPage.openCart();
    await cartPage.assertItemsCount(1);
  });
});
