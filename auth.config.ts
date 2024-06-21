import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { compare } from "bcryptjs";
import prisma from "./app/lib/db";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google,
    Github,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!credentials || !email || !password) {
          throw new Error("Invalid");
        }

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid email or password");
        }

        const isMatched = await compare(password, user.hashedPassword);

        if (!isMatched) {
          throw new Error("Password does not match");
        }

        const userData = {
          email: user.email,
          id: user.id,
        };

        return userData;
      },
    }),
  ],
} satisfies NextAuthConfig;
