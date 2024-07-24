import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type UserWithRoleAndFavoriteIds = DefaultSession["user"] & {
  role: UserRole;
  favoriteIds: string[];
};
