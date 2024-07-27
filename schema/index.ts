import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Enter your password" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, { message: "Minimun 6 characters required" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const UpdateProfileSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  name: z.string().min(1, { message: "Name is required" }),
});

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(1, { message: "Wrong password" }),
  newPassword: z.string().min(6, { message: "At least 6 characters required" }),
  confirmPassword: z.string().min(6, { message: "Password should match" }),
});

export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;
export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;
export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>;
