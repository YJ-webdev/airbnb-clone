import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "⚠ Invalid email" }),
  password: z.string().min(1, { message: "⚠ Minimun 6 characters required" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "⚠ Invalid email" }),
  password: z.string().min(6, { message: "⚠ Minimun 6 characters required" }),
  name: z.string().min(1, { message: "⚠ Name is required" }),
});

export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;
