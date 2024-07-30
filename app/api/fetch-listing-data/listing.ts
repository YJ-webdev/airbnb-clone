"use server";

import prisma from "@/app/lib/db";

export async function getListingData(id: string) {
  const listingData = await prisma.listing.findUnique({
    where: {
      id,
    },
  });

  return { listingData };
}
