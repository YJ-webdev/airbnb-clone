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
  } else if (!data.addedCategory) {
    return redirect(`become-a-host/${data.id}/structure`);
  } else if (data.addedCategory && !data.addedFloorPlan) {
    return redirect(`/become-a-host/${data.id}/floor-plan`);
  } else if (data.addedCategory && data.addedFloorPlan && !data.addedLocation) {
    return redirect(`/become-a-host/${data.id}/location`);
  } else if (
    data.addedCategory &&
    data.addedFloorPlan &&
    data.addedLocation &&
    !data.addedPhotos
  ) {
    return redirect(`/become-a-host/${data.id}/photos`);
  } else if (
    data.addedCategory &&
    data.addedLocation &&
    data.addedFloorPlan &&
    data.addedPhotos &&
    !data.addedDescription
  ) {
    return redirect(`/become-a-host/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedLocation &&
    data.addedPhotos &&
    data.addedFloorPlan &&
    data.addedDescription &&
    !data.addedPrice
  ) {
    return redirect(`/become-a-host/${data.id}/price`);
  } else if (
    data.addedCategory &&
    data.addedLocation &&
    data.addedPhotos &&
    data.addedFloorPlan &&
    data.addedDescription &&
    data.addedPrice
  ) {
    return redirect(`/become-a-host/${data.id}/review`);
  } else {
    redirect(`/become-a-host/${data.id}/structure`);
  }
}

export async function createStructure(formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const category = formData.get("category") as string;

  const data = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      category: category,
      addedCategory: true,
    },
  });

  return redirect(`/become-a-host/${listingId}/floor-plan`);
}

export async function createFloorPlan(formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const guestCount = formData.get("guestCount") as string;
  const roomCount = formData.get("roomCount") as string;
  const bedCount = formData.get("bedCount") as string;
  const bathroomCount = formData.get("bathroomCount") as string;

  const data = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      guestCount: Number(guestCount),
      roomCount: Number(roomCount),
      bedCount: Number(bedCount),
      bathroomCount: Number(bathroomCount),

      addedFloorPlan: true,
    },
  });

  return redirect(`/become-a-host/${listingId}/location`);
}

export async function createLocation(formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const locationValue = formData.get("locationValue") as string;

  const data = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      locationValue: locationValue,
      addedLocation: true,
    },
  });

  return redirect(`/become-a-host/${listingId}/photos`);
}

export async function createImages(formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const imageSrc = formData.get("imageSrc") as string;

  const data = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      imageSrc: imageSrc,
      addedPhotos: true,
    },
  });

  return redirect(`/become-a-host/${listingId}/description`);
}

export async function createDescription(formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const data = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      title: title,
      description: description,
      addedDescription: true,
    },
  });

  return redirect(`/become-a-host/${listingId}/price`);
}

export async function createPrice(formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const price = formData.get("price") as unknown as number;

  const data = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      price: Number(price),
      addedPrice: true,
    },
  });

  return redirect(`/become-a-host/${listingId}/review`);
}
