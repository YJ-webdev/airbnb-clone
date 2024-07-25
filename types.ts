import { Listing, UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type UserWithRoleAndFavoriteIds = {
  role: UserRole;
  favoriteIds: string[];
} & DefaultSession["user"];
