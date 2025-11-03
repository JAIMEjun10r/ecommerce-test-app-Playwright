import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartFunctionality';

const test = base.extend<{ page: any }>({
  page: async ({ page }, use) => {
    page.loginPage = new LoginPage(page);
    page.productPage = new ProductPage(page);
    page.cartPage = new CartPage(page);
    await use(page);
  }
});

export { test }
