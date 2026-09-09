import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { loginData } from '../../testData';
import { dismissDemoModal } from '../../utils/test-helpers';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await dismissDemoModal(page);
    await expect(loginPage.heading).toBeVisible();
  });

  test('shows the login form and related navigation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.rememberMe).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('rejects empty and invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.signInButton.click({ force: true });
    await expect(loginPage.emailInput).toBeFocused();
    await loginPage.signIn(loginData.invalidCredentials.email, loginData.invalidCredentials.password);
    await expect(page).toHaveURL(/\/login$/);
    await expect(loginPage.emailInput).toHaveValue(loginData.invalidCredentials.email);
    await expect(loginPage.signInButton).toBeVisible();
  });

  test('supports Remember Me and password visibility controls', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    await loginPage.enableRememberMe();
    await expect(loginPage.rememberMe).toBeChecked();
    await loginPage.passwordInput.fill(loginData.passwordVisibility.password);
    await loginPage.showPassword();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');
  });

  test('opens Forgot Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL(/\/forgot-password$/);
  });

  test('logs in with configured credentials when explicitly enabled', async ({ page }) => {
    test.skip(process.env.RUN_AUTH_TESTS !== 'true' || !process.env.PHPTRAVELS_EMAIL || !process.env.PHPTRAVELS_PASSWORD, 'Set RUN_AUTH_TESTS=true, PHPTRAVELS_EMAIL, and PHPTRAVELS_PASSWORD to run authenticated tests.');
    const loginPage = new LoginPage(page);
    await loginPage.signIn(process.env.PHPTRAVELS_EMAIL!, process.env.PHPTRAVELS_PASSWORD!);
    await expect(page).not.toHaveURL(/\/login$/);
  });
});
