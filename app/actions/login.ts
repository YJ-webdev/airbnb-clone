"use server";

import { signIn } from "@/auth";

import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { isRedirectError } from "next/dist/client/components/redirect";
import { Login, LoginSchema } from "@/schema/auth";
import { sendVerificationEmail } from "@/lib/send";

export const login = async (values: Login) => {
  const validatedfields = LoginSchema.safeParse(values);

  if (!validatedfields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = validatedfields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
    return {
      error: "Invalid email or password",
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/settings",
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        case "CallbackRouteError":
          return { error: "Incorrect email or password." };
        default:
          return {
            error: "Sorry, something went wrong. please try again.",
          };
      }
    }
    throw error;
  }
};
