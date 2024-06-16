"use server";

import { z } from "zod";
import { loginSchema } from "@/schema";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedfields = loginSchema.safeParse(values);

  if (!validatedfields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Email sent!" };
};
