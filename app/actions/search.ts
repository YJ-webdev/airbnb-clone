"use server";

import prisma from "../lib/db";

export async function filterSearch(formData: FormData) {
  const destination = formData.get("destination") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const guestCount = formData.get("guestCount") as string;
  const petCount = formData.get("petCount") as string;

  // const data = await prisma.listing.findMany({
  //     where: {
  //         OR: {
  //         destination: {
  //             contains: destination,
  //         },
  //         OR: {
  //             startDate: {
  //             gte: startDate,
  //             },
  //             endDate: {
  //             lte: endDate,
  //             },
  //         },
  //         },
  //     AND: {
  //         guests: {
  //         pets: {
  //             pets: {
  //             equals: petCount,
  //             },
  //         },
  //         adults: {
  //             adults: {
  //             equals: guestCount,
  //             },
  //             children: {
  //             equals: 0,
  //             },
  //         },
  //         }
  //     },
  //     orderBy: {
  //     price: "asc",
  //     }
  // })
}
