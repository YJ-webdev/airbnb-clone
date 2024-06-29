"use server";

import prisma from "@/app/lib/db";
import { redirect } from "next/navigation";

export async function createListing({ userId }: { userId: string }) {
  const data = await prisma.listing.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (data === null) {
    const data = await prisma.listing.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`become-a-host/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`become-a-host/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/become-a-host/${data.id}/description`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const category = formData.get("category") as string;
  const listingId = formData.get("listingId") as string;

  const data = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      category: category,
      addedCategory: true,
    },
  });

  return redirect(`/become-a-host/${listingId}/description`);
}
