import { redirect } from "next/navigation";
import { Listing } from "@prisma/client";
import getSession from "@/app/lib/get-session";
import prisma from "@/app/lib/db";

import {
  continueListing,
  createNewListing,
} from "@/app/actions/create-listing";
import { ListingCard } from "@/app/components/listing-card";

export default async function HostPage() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id as string;

  if (!user) {
    redirect("/");
  }

  const createNewListingWithId = createNewListing.bind(null, userId);

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

  return (
    <div className="container relative mt-10">
      <header className="mb-8 flex flex-col items-baseline justify-center">
        <h1 className="text-2xl font-semibold">
          Your listings
          <span>({data.length})</span>
        </h1>
        <p>
          This will be how customers will see your homes. make sure it looks
          good! You can edit anytime.
        </p>
      </header>
      <div className="mb-28 grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
        {data.map((item: any) => (
          <ListingCard key={item.id!} data={item} isHost={true} user={user} />
        ))}
      </div>
      <form
        action={createNewListingWithId}
        className="fixed right-[8px] top-[100px] z-20 lg:right-[5%]"
      >
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-rose-500 to-[#e3326d] p-5 text-base font-bold text-white shadow-sm transition-all hover:scale-95"
        >
          {latestListing && !latestListing.approved
            ? "Continue with the leftover"
            : "Create a new listing"}
        </button>
      </form>
    </div>
  );
}
