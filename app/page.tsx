import { Filter } from "./components/navbar/filter";
import { ListingCard } from "./components/listing-card";
import prisma from "./lib/db";
import { Listing } from "@prisma/client";
import { FolderSearch } from "lucide-react";
import getSession from "./lib/get-session";
import Navbar from "./components/navbar/navbar";

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

  const session = await getSession();
  const user = session?.user;

  return (
    <>
      <Navbar />
      <div className="container">
        <Filter />

        {listings.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="absolute top-1/2 flex -translate-y-1/2 flex-col space-y-8">
              <FolderSearch strokeWidth={1.5} size={36} className="mx-auto" />
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold">
                  No listings yet for this category.
                </h1>
                <p className="text-foreground/50">
                  Please try searching for a city or other category.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-28 grid grid-cols-1 justify-between gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((item) => (
              <ListingCard
                key={item.id!}
                user={user!}
                data={item}
                searchParams={searchParams}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
