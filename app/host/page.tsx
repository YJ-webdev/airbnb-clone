import getSession from "../lib/get-session";
import { redirect } from "next/navigation";
import { createNewListing } from "../action/create-listing";
import prisma from "../lib/db";
import { ListingCard } from "../components/listing-card";

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

  const userListings = await prisma.user.findUnique({
    where: { id: userId },
    include: { listings: true },
  });

  if (!userListings) {
    console.log("no listings");
    return null;
  }

  const data = userListings.listings;

  return (
    <div className="container relative mx-auto mt-10 px-5 lg:px-10">
      <header className="mb-8 flex flex-col items-baseline justify-center">
        <h1 className="text-2xl font-semibold">Your listings</h1>
        <p>
          This will be how customers will see your homes. make sure it looks
          good! You can edit anytime.
        </p>
      </header>
      <div className="mb-28 grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {data.map((item) => (
          <ListingCard
            key={item.id!}
            // imageSrc={item.imageSrc!}
            location={item.locationValue!}
            price={item.price!}
            country={item.country!}
            city={item.city!}
            category={item.category!}
            isHost={true}
          />
        ))}
      </div>
      <form
        action={createNewListingWithId}
        className="fixed right-16 top-28 z-30"
      >
        <button
          type="submit"
          className="rounded-full bg-white p-5 text-base font-bold shadow-sm transition-all hover:scale-95"
        >
          Create a new listing
        </button>
      </form>
    </div>
  );
}
