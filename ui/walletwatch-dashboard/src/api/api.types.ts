export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  userName: string;
  password: string;
}

export type RegisterApiRequest = Partial<User>;

export type LoginApiRequest = {
  login: string;
  password: string;
};

export type UserApiResponse = Partial<
  User & {
    userId: number;
    resetToken: string;
  }
>;

export type BudgetApiRequest = {
  isPercentage: number;
  value: number;
  name: string;
  description: string;
  categoryId: {
    categoryId: number;
  };
  reminderTypeId: number;
  enableReminder: number;
  paymentDate: string;
  price: number;
};

export type BudgetApiResponse = Partial<{
  id: number;
  isPercentage: number;
  value: number;
  user: Partial<UserApiResponse>;
  name: string;
  description: string;
  categoryId: {
    categoryId: number;
    name: string;
  };
}>;

export type IncomeApiRequest = {
  name: string;
  description: string;
  value: number;
};

export type IncomeApiResponse = Partial<{
  id: number;
  value: number;
  user: Partial<UserApiResponse>;
  name: string;
  description: string;
}>;

export type TransactionApiRequest = {
  name: string;
  description: string;
  categoryId: number;
  reminderTypeId: number;
  enableReminder: number;
  paymentDate: string;
  price: number;
};

export type TransactionApiResponse = Partial<{
  transactionId: number;
  user: Partial<UserApiResponse>;
  name: string;
  description: string;
  categoryId: {
    categoryId: number;
    name: string;
  };
  reminder: {
    reminderTypeId: number;
    type: string;
  };
  enableReminder: number;
  paymentDate: number;
  price: number;
  url: string;
}>;
