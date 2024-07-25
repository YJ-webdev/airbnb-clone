"use server";

import prisma from "../lib/db";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { revalidatePath } from "next/cache";

export async function updateFavorite(userId: string, listingId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { favoriteIds: true },
    });

    if (!user) {
      //TO-DO: open login modal
      console.log("No user found");
      return null; // Return null or some indicator of failure
    }

    revalidatePath("/favorites");

    const updatedFavorites = user.favoriteIds.includes(listingId)
      ? user.favoriteIds.filter((id) => id !== listingId)
      : [...user.favoriteIds, listingId];

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        favoriteIds: updatedFavorites,
      },
    });

    return updatedUser; // Ensure the updated user is returned
  } catch (error) {
    console.error("Failed to update favorite status:", error);
    throw new Error("Failed to update favorite status");
  }
}

export default async function getFavoriteListings(
  user: UserWithRoleAndFavoriteIds,
) {
  const favorites = await prisma.listing.findMany({
    where: {
      id: {
        in: [...user.favoriteIds],
      },
    },
  });

  return favorites;
}
