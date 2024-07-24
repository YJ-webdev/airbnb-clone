import getSession from "../lib/get-session";
import { redirect } from "next/navigation";
import { createNewListing } from "../action/create-listing";
import prisma from "../lib/db";
import { ListingCard } from "../components/listing-card";
import { Listing } from "@prisma/client";
import { ClientPage } from "./client-page";

export default async function HostPage() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id as string;

  if (!user) {
    redirect("/");
  }

  // show only approved listings on the page
  const approvedListingsForUser: Listing[] = await prisma.listing.findMany({
    where: {
      userId: userId,
      approved: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  if (!approvedListingsForUser) {
    return null;
  }
  const data = approvedListingsForUser;

  // check if there is uncompleted listing
  const latestListing = await prisma.listing.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!latestListing) {
    return null;
  }

  return <ClientPage data={data} user={user} latestListing={latestListing} />;
}
