"use server";

import { redirect } from "next/navigation";
import prisma from "../lib/db";

export async function createReserevation(formData: FormData) {
  const userId = formData.get("userId") as string;
  const listingId = formData.get("listingId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const totalPrice = formData.get("totalPrice") as string;
  const adultCount = formData.get("adultCount") as string;
  const childCount = formData.get("childCount") as string;
  const petCount = formData.get("petCount") as string;
  const stayingNights = formData.get("stayingNights") as string;

  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      listingId: listingId,
      startDate: startDate,
      endDate: endDate,
      totalPrice: Number(totalPrice),
      adults: Number(adultCount),
      children: Number(childCount),
      pets: Number(petCount),
      stayingNights: Number(stayingNights),
    },
  });

  return redirect("/reservations");
}
