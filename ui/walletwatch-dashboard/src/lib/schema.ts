import { z } from "zod";

export const loginSchema = z.object({
  userName: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50, {
      message: "Username should not exceed 50 characters.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(256, {
      message: "Password should not exceed 256 characters.",
    }),
});

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(50, {
      message: "First nameshould not exceed 50 characters.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(50, {
      message: "Last name should not exceed 50 characters.",
    }),
  phone: z
    .string()
    .min(10, { message: "Enter a valid phone number" })
    .max(15, { message: "Enter a valid phone number" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  userName: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50, {
      message: "Username should not exceed 50 characters.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(256, {
      message: "Password should not exceed 256 characters.",
    }),
});

export const budgetSchema = z.object({
  isPercentage: z.number().default(0),
  value: z.number(),
  name: z
    .string()
    .min(3, {
      message: "name should be at least 3 characters.",
    })
    .max(50, {
      message: "name should not exceed 50 characters.",
    }),
  description: z
    .string()
    .min(3, {
      message: "name should be at least 3 characters.",
    })
    .max(100, {
      message: "name should not exceed 100 characters.",
    }),
  categoryId: z.object({
    categoryId: z.number().default(1),
    name: z.string(),
  }),
  reminderTypeId: z.number().default(1),
  enableReminder: z.number().default(1),
  paymentDate: z.string(),
  price: z.number().min(1, { message: "Price should be greater than 0" }),
});

export const incomeSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "name should be at least 3 characters.",
    })
    .max(50, {
      message: "name should not exceed 50 characters.",
    }),
  description: z
    .string()
    .min(3, {
      message: "name should be at least 3 characters.",
    })
    .max(100, {
      message: "name should not exceed 100 characters.",
    }),
  value: z.number().min(0, { message: "Value should be greater that 0." }),
});

export const transactionSchema = z.object({
  transactionId: z.number().readonly().optional(),
  name: z
    .string()
    .min(3, {
      message: "name should be at least 3 characters.",
    })
    .max(50, {
      message: "name should not exceed 50 characters.",
    }),
  description: z
    .string()
    .min(3, {
      message: "name should be at least 3 characters.",
    })
    .max(100, {
      message: "name should not exceed 100 characters.",
    }),
  categoryId: z.number().default(1),
  reminderTypeId: z.number().default(1),
  enableReminder: z.number().default(1),
  paymentDate: z.string(),
  price: z.number().min(1, { message: "Price should be greater than 0" }),
});
