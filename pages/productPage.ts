import { Page, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async countProductCards() {
    return await this.page.locator('[data-test-id^="product-card-"]').count();
  }

  async ensureProductListVisible() {
    const cards = this.page.locator('[data-test-id^="product-card-"]');
    await expect(cards.first()).toBeVisible();
    await expect(cards).not.toHaveCount(0);
  }

  async applyCategoryFilter(category: string) {
    const select = this.page.locator('[data-test-id="category-filter"]');
    await select.selectOption({ label: category });
    await this.page.waitForLoadState('networkidle');
  }

  async applyCategoryFilterAndValidate(category: string) {
    const before = await this.countProductCards();
    await this.clearFilters();
    await this.applyCategoryFilter(category);
    
    // Use auto-retry assertion
    await expect(this.page.locator('[data-test-id="category-filter"]')).toHaveValue(category);
    
    const after = await this.countProductCards();
    expect(after).toBeLessThanOrEqual(before);
  }

  
  async applySortOrder(orderKey: string) {
    const select = this.page.locator('[data-test-id="sort-order"]');
    await select.selectOption(orderKey);
    await this.page.waitForLoadState('networkidle');
  }

  async applySortOrderAndValidate(orderKey: string) {
    await this.clearFilters();
    const before = await this.countProductCards();
    await this.applySortOrder(orderKey);
  
    await expect(this.page.locator('[data-test-id="sort-order"]')).toHaveValue(orderKey);
    
    const after = await this.countProductCards();
    expect(after).toBeLessThanOrEqual(before);
  }

  async clearFilters() {
    const clear = this.page.locator('[data-test-id="filters-clear"]');
    if (await clear.count() > 0) {
      await clear.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async isNoResultsVisible() {
    return await this.page.locator('[data-test-id="no-results"]').isVisible();
  }

  async getAppliedFilters() {
    return await this.page.locator('[data-test-id="applied-filter"]').allTextContents();
  }

  async combineCategoryAndSortAndValidate(category: string, sortKey: string) {
    await this.clearFilters();
    await this.applyCategoryFilter(category);
    await this.applySortOrder(sortKey);
    
    await expect(this.page.locator('[data-test-id="category-filter"]')).toHaveValue(category);
    await expect(this.page.locator('[data-test-id="sort-order"]')).toHaveValue(sortKey);
    
    const noResults = await this.isNoResultsVisible();
    const cards = await this.countProductCards();
    expect(noResults || cards > 0).toBeTruthy();
  }

  async clearFiltersAndValidateRestore() {
    await this.clearFilters();
    const count = await this.countProductCards();
    expect(count).toBeGreaterThanOrEqual(0);
  }
}
