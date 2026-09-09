import { expect, test } from '@playwright/test';
import { SignupPage } from '../../pages/signup.page';
import { createUniqueSignupEmail, signupData } from '../../testData';
import { dismissDemoModal } from '../../utils/test-helpers';

test.describe('Signup', () => {
  test.beforeEach(async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.goto();
    await dismissDemoModal(page);
    await expect(signupPage.heading).toBeVisible();
  });

  test('shows the account creation form', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await expect(signupPage.heading).toBeVisible();
    await expect(signupPage.firstNameInput).toBeVisible();
    await expect(signupPage.lastNameInput).toBeVisible();
    await expect(signupPage.emailInput).toBeVisible();
    await expect(signupPage.passwordInput).toBeVisible();
    await expect(signupPage.confirmPasswordInput).toBeVisible();
    await expect(signupPage.securityAnswerInput).toBeVisible();
    await expect(signupPage.termsCheckbox).toBeVisible();
    await expect(signupPage.createAccountButton).toBeVisible();
  });

  test('requires valid values and consent', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.createAccountButton.click({ force: true });
    await expect(signupPage.firstNameInput).toBeFocused();
    await expect(page.getByText(/at least 6 characters/i)).toBeVisible();
    await signupPage.fillAccount({ firstName: signupData.invalidAccount.firstName, lastName: signupData.invalidAccount.lastName, email: signupData.invalidAccount.email, password: signupData.invalidAccount.password, confirmPassword: signupData.invalidAccount.confirmPassword });
    await signupPage.securityAnswerInput.fill(signupData.invalidAccount.securityAnswer);
    await signupPage.createAccountButton.click();
    await expect(page.getByText(/valid email|invalid|password|correct answer|agree/i).first()).toBeVisible();
  });

  test('navigates to Login', async ({ page }) => {
    const signupPage = new SignupPage(page);
    await signupPage.loginLink.click({ force: true });
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  });

  test('creates a new account when explicitly enabled', async ({ page }) => {
    test.skip(process.env.RUN_MUTATING_TESTS !== 'true', 'Set RUN_MUTATING_TESTS=true to create demo data.');
    const email = createUniqueSignupEmail();
    const signupPage = new SignupPage(page);
    await signupPage.fillAccount({ firstName: signupData.validAccount.firstName, lastName: signupData.validAccount.lastName, email, password: signupData.validAccount.password, confirmPassword: signupData.validAccount.confirmPassword });
    await signupPage.answerSecurityQuestion();
    await signupPage.termsCheckbox.check();
    await signupPage.createAccountButton.click();
    await expect(page).not.toHaveURL(/\/signup$/);
  });
});
