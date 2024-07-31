"use server";

import { redirect } from "next/navigation";
import prisma from "../lib/db";

export async function createReserevation(formData: FormData) {
  const userId = formData.get("userId") as string;
  const listingId = formData.get("listingId") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const totalPrice = formData.get("totalPrice") as unknown as number;

  const data = await prisma.reservation.create({
    data: {
      userId: userId,
      listingId: listingId,
      startDate: startDate,
      endDate: endDate,
      totalPrice: totalPrice,
    },
  });

  return redirect("/reservations");
}
