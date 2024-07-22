"use server";

import prisma from "../lib/db";

export async function toggleFavorite(userId: string, listingId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { favoriteIds: true },
  });

  if (!user) {
    //TO-DO: open login modal
    console.log("No user found");
    return;
  }

  let updatedFavorites;

  if (user.favoriteIds.includes(listingId)) {
    updatedFavorites = user.favoriteIds.filter((id) => id !== listingId);
  } else {
    updatedFavorites = [...user.favoriteIds, listingId];
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      favoriteIds: updatedFavorites,
    },
  });
}
