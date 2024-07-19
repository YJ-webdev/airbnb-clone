import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {}

  interface Account {}

  interface Session {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    role: UserRole;
  }
}
