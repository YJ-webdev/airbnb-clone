"use server";

import { hash } from "bcryptjs";

import prisma from "@/app/lib/db";
import { Register, RegisterSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: Register) => {
  const validatedfields = RegisterSchema.safeParse(values);

  if (!validatedfields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedfields.data;
  const hashedPassword = await hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  return { success: "Confirmation email sent!" };
};
