import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  readonly cartItem = '.cart_item';
  readonly cartBadge = '.shopping_cart_badge';
  readonly continueShoppingButton = '[data-test="continue-shopping"]';

  constructor(page: Page) {
    this.page = page;
  }

  // Шаг: переход в корзину по иконке
  async openCart() {
    await this.page.click('.shopping_cart_link');
  }

  // Результат: проверка количества товаров в корзине
  async assertItemsCount(expected: number) {
    const items = await this.page.locator(this.cartItem).all();
    expect(items.length).toBe(expected);
  }

  // Результат: проверка значка корзины
  async assertBadgeCount(expected: number) {
    if (expected === 0) {
      await expect(this.page.locator(this.cartBadge)).toHaveCount(0);
    } else {
      await expect(this.page.locator(this.cartBadge)).toHaveText(String(expected));
    }
  }

  // Шаг: нажать "Continue Shopping" (возврат в каталог)
  async continueShopping() {
    await this.page.locator(this.continueShoppingButton).click();
  }

  // Шаг: удалить товар по имени из корзины
  async removeItemByName(name: string) {
    await this.page
      .locator(`.cart_item:has-text("${name}") >> [data-test^="remove"]`)
      .click();
  }
}
