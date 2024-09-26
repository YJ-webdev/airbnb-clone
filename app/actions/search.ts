"use server";

import prisma from "../lib/db";
import { isBefore, isAfter } from "date-fns";

export async function filterSearch(formData: FormData) {
  const destination = formData.get("destination") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const guestCount = parseInt(formData.get("guestCount") as string, 10);

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  const listings = await prisma.listing.findMany({
    where: {
      OR: [
        { country: destination },
        { state: destination },
        { city: destination },
      ],
      guestCount: {
        gte: guestCount,
      },
    },
    include: {
      reservations: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const filteredListings = listings.filter((listing) => {
    if (start && end) {
      const hasConflictingReservation = listing.reservations.some(
        (reservation) => {
          const reservationStart = new Date(reservation.startDate);
          const reservationEnd = new Date(reservation.endDate);

          return (
            (isBefore(start, reservationEnd) &&
              isAfter(start, reservationStart)) ||
            (isBefore(end, reservationEnd) && isAfter(end, reservationStart)) ||
            (isAfter(start, reservationStart) && isBefore(end, reservationEnd))
          );
        },
      );

      return !hasConflictingReservation;
    }

    return true;
  });

  return filteredListings;
}
