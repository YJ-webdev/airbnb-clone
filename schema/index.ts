import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "⚠ Invalid email" }),
  password: z.string().min(1, { message: "⚠ Minimun 6 characters required" }),
});

export const registerSchema = z.object({
  email: z.string().email({ message: "⚠ Invalid email" }),
  password: z.string().min(6, { message: "⚠ Minimun 6 characters required" }),
  name: z.string().min(1, { message: "⚠ Name is required" }),
});
