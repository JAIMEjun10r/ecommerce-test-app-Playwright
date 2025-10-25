import { test } from '../../support/index';

test.describe('Products page - filters and listing (page object style)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/products');
  });

  test('should display product list', async ({ page }) => {
    await page.produtosPage.ensureProductListVisible();
  });

  test('should filter by category', async ({ page }) => {
    await page.produtosPage.applyCategoryFilterAndValidate('Eletrônicos');
  });

  test('should filter by price range', async ({ page }) => {
    await page.produtosPage.applySortOrderAndValidate('price-asc');
  });

  test('should combine category and price filters', async ({ page }) => {
    await page.produtosPage.combineCategoryAndSortAndValidate('Acessórios', 'price-asc');
  });

  test('should clear filters and restore full list', async ({ page }) => {
    await page.produtosPage.clearFiltersAndValidateRestore();
  });
});
