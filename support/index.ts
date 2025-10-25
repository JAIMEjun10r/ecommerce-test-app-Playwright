import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProdutosPage } from '../pages/produtos/ProdutosPage';

const test = base.extend<{ page: any }>({
  page: async ({ page }, use) => {
    page.loginPage = new LoginPage(page);
    page.produtosPage = new ProdutosPage(page);
    await use(page);
  }
});

export { test }
