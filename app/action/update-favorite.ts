"use server";

import prisma from "../lib/db";

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
