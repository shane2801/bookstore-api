import { z } from 'zod';

export const createUserSchema = z.object({
  // Ensures valid email format and non-empty
  email: z.email("Email is required"),
  
  // Enforces minimum 8 characters, at least one uppercase, lowercase, and number
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const signinSchema = z.object({
    email: z.email(),
    password: z.string()
});



