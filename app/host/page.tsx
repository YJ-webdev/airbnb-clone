import { Button } from "@/components/ui/button";
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
    <div className="container mx-auto px-5 lg:px-10">
      <div>
        {data.map((item) => (
          <ListingCard
            key={item.id!}
            imageSrc={item.imageSrc!}
            location={item.locationValue!}
            price={item.price!}
            country={item.country!}
            city={item.city!}
          />
        ))}
      </div>
      <form action={createNewListingWithId}>
        <Button type="submit">Create a new listing</Button>
      </form>
    </div>
  );
}
