import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async sucessfulLogin(email: string, password: string, username: string) {
    await this.page.fill('[data-test-id="login-email"]', email);
    await this.page.fill('[data-test-id="login-password"]', password);
    await this.page.click('button[type="submit"]');
    await expect(this.page).toHaveURL('/account/profile');
    await expect(this.page.getByRole('main')).toContainText(`Bem-vindo, ${username}!`)
    await expect(this.page.getByRole('main')).toMatchAriaSnapshot(`
    - text: Bem-vindo, ${username}!
    - paragraph:
      - strong: "Email:"
      - text: ${email}
    - separator
    - paragraph: Aqui você poderá ver seu histórico de pedidos e gerenciar seus dados.
    - button "Meus Pedidos"
    - button "Sair (Logout)"
    `);

  }

  async failedLogin(email: string, password: string) {
    await this.page.goto('/login');
    await this.page.fill('[data-test-id="login-email"]', email);
    await this.page.fill('[data-test-id="login-password"]', password);
    await this.page.click('button[type="submit"]');
  }

      async msgFailedLogin() {
        await expect(this.page.locator('[data-test-id="login-error"]')).toHaveText('Credenciais inválidas. Tente novamente.');
      
  }

  async confirmAdminDashboardAccess() {
    await this.page.locator('[data-test-id="admin-link"]').click();
    await expect(this.page).toHaveURL('/admin/orders');
    await expect(this.page.getByRole('heading', { name: 'Todos os Pedidos' })).toBeVisible();

  }

  async notHaveAdminDashboardAccess() {
    await expect(this.page.locator('[data-test-id="admin-link"]')).toHaveCount(0);
    await expect(this.page).not.toHaveURL('/admin/orders');
  }

  async validateEmailFormat(email: string) {
  const emailInput = this.page.locator('[data-test-id="login-email"]');
  await emailInput.fill(email);
  await this.page.click('button[type="submit"]');

  // Use auto-retry assertion with custom matcher
  await expect(async () => {
    const validationMessage = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).toContain("@");
    // Accept both English and Portuguese validation messages
    expect(validationMessage.toLowerCase()).toMatch(/email|e-mail/);
  }).toPass();
}

async validateRequiredFieldMessages() {
  const emailInput = this.page.locator('[data-test-id="login-email"]');
  await emailInput.fill('');
  await this.page.click('button[type="submit"]');
  
  // Use auto-retry assertion
  await expect(async () => {
    const validationMessage = await emailInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    // Accept both English and Portuguese validation messages
    expect(validationMessage.toLowerCase()).toMatch(/fill|preencha/);
  }).toPass();
  }





  
}