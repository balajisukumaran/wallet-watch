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
