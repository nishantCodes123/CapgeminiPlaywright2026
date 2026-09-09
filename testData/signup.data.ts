export const signupData = {
  invalidAccount: {
    firstName: 'Test',
    lastName: 'User',
    email: 'invalid-email',
    password: 'short',
    confirmPassword: 'different',
    securityAnswer: '8',
  },
  validAccount: {
    firstName: 'Playwright',
    lastName: 'User',
    password: 'Playwright123!',
    confirmPassword: 'Playwright123!',
  },
};

export type SignupAccount = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function createUniqueSignupEmail(): string {
  return `playwright-${Date.now()}@example.com`;
}
