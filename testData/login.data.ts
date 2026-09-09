export const loginData = {
  invalidCredentials: {
    email: 'not-an-email',
    password: 'incorrect-password',
  },
  passwordVisibility: {
    password: 'secret-value',
  },
};

export type LoginCredentials = {
  email: string;
  password: string;
};
