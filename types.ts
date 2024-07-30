import { Listing, UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type UserWithRoleAndFavoriteIds = {
  role: UserRole;
  favoriteIds: string[];
} & DefaultSession["user"];

export type Width = "68rem" | "1280px" | "42rem" | "1400px";

export type mapLocation = {
  latitude: number;
  longitude: number;
};
