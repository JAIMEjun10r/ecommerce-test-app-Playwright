import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addItemToCart() {
    const firstProduct = this.page.locator('[data-test-id^="product-card-"]').first();
    const addButton = firstProduct.locator('[data-test-id^="add-to-cart-"]');
    const productName = await firstProduct.locator('.card-title').textContent();
    
    await addButton.click();
    
    const toast = this.page.locator('[data-test-id="toast-notification"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText(`${productName} foi adicionado ao carrinho`);

    return productName;
  }

  async getCartCount() {
    const cartCount = await this.page.locator('[data-test-id="cart-item-count"]').textContent();
    return parseInt(cartCount || '0');
  }

  async goToCheckout() {
    await this.page.locator('[data-test-id="checkout-link"]').click();
    await expect(this.page).toHaveURL('/checkout');
  }

  async updateItemQuantity(productId: string, action: 'increase' | 'decrease') {
    const buttonSelector = action === 'increase' ? 
      `[data-test-id="increase-quantity-${productId}"]` : 
      `[data-test-id="decrease-quantity-${productId}"]`;
    
    const quantityBefore = await this.getItemQuantity(productId);
    await this.page.locator(buttonSelector).click();
    const quantityAfter = await this.getItemQuantity(productId);

    if (action === 'increase') {
      expect(quantityAfter).toBe(quantityBefore + 1);
    } else if (quantityBefore > 1) {
      expect(quantityAfter).toBe(quantityBefore - 1);
    }
  }

  async getItemQuantity(productId: string) {
    const quantityText = await this.page.locator(`[data-test-id="item-quantity-${productId}"]`).inputValue();
    return parseInt(quantityText);
  }

  async removeItem(productId: string) {
    const itemCountBefore = await this.getCartCount();
    await this.page.locator(`[data-test-id="remove-item-${productId}"]`).click();
    
    const itemCountAfter = await this.getCartCount();
    expect(itemCountAfter).toBe(itemCountBefore - 1);
  }

  async getSubtotal() {
    const subtotalText = await this.page.locator('[data-test-id="summary-subtotal"]').textContent();
    return parseFloat(subtotalText?.replace('R$ ', '') || '0');
  }

  async applyCoupon(code: string) {
    await this.page.locator('[data-test-id="coupon-input"]').fill(code);
    await this.page.locator('[data-test-id="apply-coupon-button"]').click();
  }

  async verifyCouponDiscount() {
    const discount = await this.page.locator('[data-test-id="summary-discount"]').textContent();
    expect(discount).toBeTruthy();
    expect(discount).toContain('R$');
  }

  async verifyInvalidCouponError() {
    const toast = this.page.locator('[data-test-id="toast-notification"]');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('Cupom inválido');
  }

  async removeCoupon() {
    await this.page.getByText('Remover Cupom').click();
    const discount = await this.page.locator('[data-test-id="summary-discount"]').count();
    expect(discount).toBe(0);
  }

  async verifyEmptyCart() {
    await expect(this.page.getByText('Seu carrinho está vazio')).toBeVisible();
    await expect(this.page.locator('[data-test-id="browse-products-link"]')).toBeVisible();
  }

  async verifyCartTotal() {
    const subtotal = await this.getSubtotal();
    const total = parseFloat((await this.page.locator('[data-test-id="summary-total"]').textContent())?.replace('R$ ', '') || '0');
    const discount = await this.page.locator('[data-test-id="summary-discount"]').count() > 0 ? 
      parseFloat((await this.page.locator('[data-test-id="summary-discount"]').textContent())?.replace('- R$ ', '') || '0') : 0;
    const shipping = parseFloat((await this.page.locator('[data-test-id="summary-shipping"]').textContent())?.replace('R$ ', '') || '0');

    const expectedTotal = subtotal - discount + shipping;
    expect(total).toBe(expectedTotal);
  }
}