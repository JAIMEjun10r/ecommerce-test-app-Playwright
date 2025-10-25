import { test } from '../../support/index';

test.beforeEach(async ({ page }) => {
    await page.goto('/login');
})

test.describe('Admin login tests', () => {

    test('should  login successfully as admin', async ({ page }) => {
        await page.loginPage.sucessfulLogin('user@test.com', 'password123', 'Jaime Tester');

    })

    test('should have access to admin features', async ({ page }) => {
        await page.loginPage.sucessfulLogin('user@test.com', 'password123', 'Jaime Tester')
        await page.loginPage.confirmAdminDashboardAccess();
    })

})

test.describe('Customer login tests', () => {

    test('should login successfully as customer', async ({ page }) => {
        await page.loginPage.sucessfulLogin('cliente@test.com', 'password456', 'Cliente Comum');
    })

    test('should not have access to admin features', async ({ page }) => {
        await page.loginPage.sucessfulLogin('cliente@test.com', 'password456', 'Cliente Comum');
        await page.loginPage.notHaveAdminDashboardAccess();
    })



})

test.describe('Validation and Error Handling Tests', () => {
    test('should show error with wrong password', async ({ page }) => {
        await page.loginPage.failedLogin('user@test.com', 'wrongpassword');
        await page.loginPage.msgFailedLogin();
    })

    test('should show error with non-existent email', async ({ page }) => {
        await page.loginPage.failedLogin('nonexistent@example.com', 'Test@123');
        await page.loginPage.msgFailedLogin();
    })

    test('should validate email format', async ({ page }) => {
        // await page.loginPage.failedLogin('invalid.email', 'Test23');
        await page.loginPage.validateEmailFormat('itest.com');
    })

    test('should display required field messages when fields are empty', async ({ page }) => {
        await page.loginPage.validateRequiredFieldMessages();
        
    })

})