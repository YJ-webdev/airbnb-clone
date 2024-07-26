import { Listing, UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type UserWithRoleAndFavoriteIds = {
  role: UserRole;
  favoriteIds: string[];
} & DefaultSession["user"];

export type Width = "1400px" | "1088px" | "1280px";
