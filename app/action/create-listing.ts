"use server";

import prisma from "@/app/lib/db";
import { JsonArray } from "@prisma/client/runtime/library";
import { redirect } from "next/navigation";

export async function createNewListing(userId: string) {
  const data = await prisma.listing.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (data === null || !data.addedCategory) {
    return redirect(`/become-a-host`);
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
    data.addedPrice &&
    !data.approved
  ) {
    return redirect(`/become-a-host/${data.id}/review`);
  } else {
    return redirect(`/become-a-host`);
  }
}

export async function continueListing(userId: string) {
  const userWithListings = await prisma.user.findUnique({
    where: { id: userId },
    include: { listings: true },
  });

  if (!userWithListings) {
    return redirect("/");
  }

  const latestListing = await prisma.listing.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (userWithListings.listings.length > 1) {
    return redirect("/host");
  } else if (latestListing === null) {
    return redirect(`/become-a-host`);
  } else {
    // Further redirection based on the latest listing's state
    if (!latestListing.addedCategory) {
      return redirect(`/become-a-host/${latestListing.id}`);
    } else if (!latestListing.addedFloorPlan) {
      return redirect(`/become-a-host/${latestListing.id}/floor-plan`);
    } else if (!latestListing.addedLocation) {
      return redirect(`/become-a-host/${latestListing.id}/location`);
    } else if (!latestListing.addedPhotos) {
      return redirect(`/become-a-host/${latestListing.id}/photos`);
    } else if (!latestListing.addedDescription) {
      return redirect(`/become-a-host/${latestListing.id}/description`);
    } else if (!latestListing.addedPrice) {
      return redirect(`/become-a-host/${latestListing.id}/price`);
    } else if (!latestListing.approved) {
      return redirect(`/become-a-host/${latestListing.id}/review`);
    } else {
      return redirect("/host");
    }
  }
}

export async function updateCategory(userId: string, formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const category = formData.get("category") as string;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return redirect("/login");
  }

  const listing = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      userId: userId,
      category: category,
      addedCategory: true,
    },
  });

  return redirect(`/become-a-host/${listing.id}/floor-plan`);
}

export async function createCategory(userId: string, formData: FormData) {
  const category = formData.get("category") as string;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return redirect("/login");
  }

  const listing = await prisma.listing.create({
    data: {
      userId: userId,
      category: category,
      addedCategory: true,
    },
  });

  return redirect(`/become-a-host/${listing.id}/floor-plan`);
}

export async function createFloorPlan(userId: string, formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const guestCount = formData.get("guestCount") as string;
  const roomCount = formData.get("roomCount") as string;
  const bedCount = formData.get("bedCount") as string;
  const bathroomCount = formData.get("bathroomCount") as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return redirect("/login");
  }

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

export async function createLocation(userId: string, formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const locationValue = formData.get("street") as string;
  const country = formData.get("country") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const postalCode = formData.get("postalCode") as string;
  const lat = formData.get("lat") as string;
  const lng = formData.get("lng") as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return redirect("/login");
  }

  const data = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      locationValue: locationValue,
      country: country,
      city: city,
      state: state,
      addedLocation: true,
      postalCode: postalCode,
      lat: Number(lat),
      lng: Number(lng),
    },
  });

  return redirect(`/become-a-host/${listingId}/photos`);
}

export async function createImages(userId: string, formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const imageSrc = formData.get("imageSrc") as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return redirect("/login");
  }

  const data = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      imageSrc: imageSrc.split(","),
      addedPhotos: true,
    },
  });

  return redirect(`/become-a-host/${listingId}/description`);
}

export async function createDescription(userId: string, formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return redirect("/login");
  }

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

export async function createPrice(userId: string, formData: FormData) {
  const listingId = formData.get("listingId") as string;
  const guestPrice = formData.get("guestPrice") as string;
  const enteredPrice = formData.get("enteredPrice") as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return redirect("/login");
  }

  const data = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      guestPrice: Number(guestPrice),
      enteredPrice: Number(enteredPrice),
      addedPrice: true,
    },
  });

  return redirect(`/become-a-host/${listingId}/review`);
}

export async function createApproval(userId: string, formData: FormData) {
  const listingId = formData.get("listingId") as string;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return redirect("/login");
  }

  const data = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      approved: true,
    },
  });

  return redirect(`/become-a-host/${listingId}/congratulations`);
}
