"use server";

import { signIn, auth } from "@/auth";
import { Login, LoginSchema } from "@/schema";
import { AuthError } from "next-auth";

export const login = async (values: Login) => {
  const validatedfields = LoginSchema.safeParse(values);

  if (!validatedfields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedfields.data;

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        case "CallbackRouteError":
          return { error: "Incorrect email or password." };
        default:
          return {
            error: "Sorry, something went wrong. please try later again.",
          };
      }
    }
    throw error;
  }
};

export const socialLogIn = async (provider: "google" | "github") => {
  await signIn(provider);
  const session = await auth();
  if (!session?.user) return null;
  return session.user;
};
