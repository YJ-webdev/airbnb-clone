import { Filter } from "./components/navbar/filter";
import { ListingCard } from "./components/listing-card";
import prisma from "./lib/db";
import { Listing } from "@prisma/client";

export default async function Home({
  searchParams,
}: {
  searchParams?: { filter: string };
}) {
  const listings: Listing[] = await prisma.listing.findMany({
    where: {
      approved: true,
      category: searchParams?.filter ?? undefined,
    },
  });

  if (!listings) {
    return null;
  }

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <Filter />
      <div className="mb-28 grid grid-cols-1 justify-between gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {listings.length === 0
          ? "No results found"
          : listings.map((item) => (
              <ListingCard
                key={item.id!}
                data={item}
                searchParams={searchParams}
              />
            ))}
      </div>
    </div>
  );
}
