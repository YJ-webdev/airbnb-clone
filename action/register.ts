"use server";

import { z } from "zod";
import { registerSchema } from "@/schema";
import { hash } from "bcryptjs";
import db from "@/app/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedfields = registerSchema.safeParse(values);

  if (!validatedfields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedfields.data;
  const hashedPassword = await hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  //TODO: send verification email.

  return { success: "User created!" };
};
