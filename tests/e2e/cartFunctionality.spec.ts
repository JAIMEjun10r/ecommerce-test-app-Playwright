import { test } from '../../support/index';

test.describe('Cart Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });

  test('should add item to cart', async ({ page }) => {
    await page.cartPage.addItemToCart();
  });

  test('should update item quantity in cart', async ({ page }) => {
    const productId = '1';
    await page.cartPage.addItemToCart();
    await page.cartPage.goToCheckout();
    await page.cartPage.updateItemQuantity(productId, 'increase');
    await page.cartPage.updateItemQuantity(productId, 'decrease');
  });

  test('should remove item from cart', async ({ page }) => {
    const productId = '1';
    await page.cartPage.addItemToCart();
    await page.cartPage.goToCheckout();
    await page.cartPage.removeItem(productId);
  });

  test('should apply valid coupon', async ({ page }) => {
    await page.cartPage.addItemToCart();
    await page.cartPage.goToCheckout();
    await page.cartPage.applyCoupon('DEZOFF');
    await page.cartPage.verifyCouponDiscount();
  });

  test('should show error for invalid coupon', async ({ page }) => {
    await page.cartPage.addItemToCart();
    await page.cartPage.goToCheckout();
    await page.cartPage.applyCoupon('INVALID');
    await page.cartPage.verifyInvalidCouponError();
  });

  test('should remove applied coupon', async ({ page }) => {
    await page.cartPage.addItemToCart();
    await page.cartPage.goToCheckout();
    await page.cartPage.applyCoupon('DEZOFF');
    await page.cartPage.verifyCouponDiscount();
    await page.cartPage.removeCoupon();
  });

  test('should verify cart total calculation', async ({ page }) => {
    await page.cartPage.addItemToCart();
    await page.cartPage.goToCheckout();
    await page.cartPage.verifyCartTotal();
  });
});