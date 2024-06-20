"use server";

import { signIn, auth, signOut } from "@/auth";
import { Login, LoginSchema } from "@/schema";

export const login = async (values: Login) => {
  const validatedfields = LoginSchema.safeParse(values);

  if (!validatedfields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Email sent!" };
};

export const socialLogIn = async (provider: "google" | "github") => {
  await signIn(provider);
  const session = await auth();
  if (!session?.user) return null;
  return session.user;
};

export const logOut = async () => {
  await signOut();
};
