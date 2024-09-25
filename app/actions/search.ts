"use server";

import prisma from "../lib/db";

export async function filterSearch(formData: FormData) {
  const destination = formData.get("destination") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const guestCount = parseInt(formData.get("guestCount") as string, 10);

  const data = await prisma.listing.findMany({
    where: {
      locationValue: {
        contains: destination,
      },
      // availableDates: {
      //   gte: startDate,
      //   lte: endDate,
      // },
      guestCount: {
        gte: guestCount,
      },
    },
    orderBy: {
      guestPrice: "asc",
    },
  });

  return data;
}
