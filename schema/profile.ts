import { z } from "zod";

export const UpdateProfileSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
});

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Wrong password"),
  newPassword: z.string().min(6, "At least 6 characters required"),
  confirmPassword: z.string().min(6, "Password should match"),
});

export type UpdateProfile = z.infer<typeof UpdateProfileSchema>;
export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>;
