import getSession from "../lib/get-session";
import { redirect } from "next/navigation";
import { createNewListing } from "../action/create-listing";
import prisma from "../lib/db";
import { ListingCard } from "../components/listing-card";
import { Listing } from "@prisma/client";

export default async function HostPage() {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id as string;

  if (!user) {
    redirect("/");
  }

  const createNewListingWithId = createNewListing.bind(null, {
    userId: userId as string,
  });

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
    <div className="container relative mx-auto mt-10 px-5 lg:px-10">
      <header className="mb-8 flex flex-col items-baseline justify-center">
        <h1 className="text-2xl font-semibold">
          Your listings
          <span>({approvedListingsForUser.length})</span>
        </h1>
        <p>
          This will be how customers will see your homes. make sure it looks
          good! You can edit anytime.
        </p>
      </header>
      <div className="mb-28 grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {data.map((item) => (
          <ListingCard key={item.id!} data={item} isHost={true} />
        ))}
      </div>
      <form
        action={createNewListingWithId}
        className="fixed right-16 top-28 z-30"
      >
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-rose-500 to-[#e3326d] p-5 text-base font-bold text-white shadow-sm transition-all hover:scale-95"
        >
          {latestListing && !latestListing.approved
            ? "Continue your unfinished listing?"
            : "Create a new listing"}
        </button>
      </form>
    </div>
  );
}
