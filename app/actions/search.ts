"use server";

import prisma from "../lib/db"; // Import Prisma for types
import { Prisma } from "@prisma/client";

export async function filterSearch(formData: FormData) {
  const destination = formData.get("destination") as string | null;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const guestCount = formData.get("guests")
    ? parseInt(formData.get("guests") as string, 10)
    : 1; // default to 1 guest if not provided

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  const destinationFilter = destination
    ? {
        OR: [
          {
            country: {
              contains: destination,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            state: {
              contains: destination,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            city: { contains: destination, mode: Prisma.QueryMode.insensitive },
          },
        ],
      }
    : {}; // If no destination is provided, skip filtering by destination

  const listings = await prisma.listing.findMany({
    where: {
      AND: [
        destinationFilter,
        {
          guestCount: {
            gte: guestCount,
          },
        },
        ...(start && end
          ? [
              {
                reservations: {
                  none: {
                    OR: [
                      {
                        startDate: {
                          lte: end,
                        },
                        endDate: {
                          gte: start,
                        },
                      },
                    ],
                  },
                },
              },
            ]
          : []),
      ],
    },
    include: {
      reservations: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return listings;
}
