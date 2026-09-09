import { Locator, Page } from '@playwright/test';
import { solveSecurityQuestion } from '../utils/security-question';

export class SignupPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly securityAnswerInput: Locator;
  readonly termsCheckbox: Locator;
  readonly createAccountButton: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Create Account' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name *' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name *' });
    this.emailInput = page.getByRole('textbox', { name: 'Email Address *' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *', exact: true });
    this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password *' });
    this.securityAnswerInput = page.getByRole('spinbutton', { name: /Security Check:/i });
    this.termsCheckbox = page.getByRole('checkbox', { name: /Terms of Service and Privacy Policy/i });
    this.createAccountButton = page.getByRole('button', { name: /Create Account/i });
    this.loginLink = page.getByRole('link', { name: 'Login', exact: true }).first();
  }

  async goto(): Promise<void> {
    await this.page.goto('/signup', { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async fillAccount(details: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }): Promise<void> {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.emailInput.fill(details.email);
    await this.passwordInput.fill(details.password);
    await this.confirmPasswordInput.fill(details.confirmPassword);
  }

  async answerSecurityQuestion(): Promise<void> {
    const securityQuestion = await this.securityAnswerInput.getAttribute('aria-label');
    const arithmetic = securityQuestion?.match(/What is (.+?) \?/i)?.[1];
    if (!arithmetic) {
      throw new Error('Unable to read the Signup security question.');
    }
    await this.securityAnswerInput.fill(String(solveSecurityQuestion(arithmetic)));
  }
}
