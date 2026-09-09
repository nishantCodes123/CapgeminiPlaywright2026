import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMe: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signInButton: Locator;
  readonly passwordToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Welcome Back' });
    this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true });
    this.rememberMe = page.locator('#remember_me');
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password?' });
    this.signInButton = page.getByRole('button', { name: /Sign In to your account/i });
    this.passwordToggle = page.locator('#toggle-password');
  }

  async goto(): Promise<void> {
    await this.page.goto('/login', { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async enableRememberMe(): Promise<void> {
    await this.rememberMe.evaluate((element: HTMLInputElement) => {
      element.checked = true;
      element.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  async showPassword(): Promise<void> {
    await this.passwordToggle.evaluate((element: HTMLElement) => element.click());
  }
}
