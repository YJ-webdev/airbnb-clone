import { Filter } from "./components/navbar/filter";
import { ListingCard } from "./components/listing-card";
import prisma from "./lib/db";
import { Listing } from "@prisma/client";
import { Scroll } from "lucide-react";
import getSession from "./lib/get-session";
import { Navbar } from "./components/navbar/Navbar";
import Footer from "./components/footer";
import { filterSearch } from "./actions/search";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    destination?: string;
    startDate?: string;
    endDate?: string;
    guests?: string;
    filter?: string;
  };
}) {
  const formData = new FormData();
  if (searchParams?.destination)
    formData.set("destination", searchParams.destination);
  if (searchParams?.startDate)
    formData.set("startDate", searchParams.startDate);
  if (searchParams?.endDate) formData.set("endDate", searchParams.endDate);
  if (searchParams?.guests) formData.set("guests", searchParams.guests);
  if (searchParams?.filter) formData.set("filter", searchParams.filter);

  const session = await getSession();
  const user = session?.user;

  const listings: Listing[] = await filterSearch(formData);

  const categorizedListings = listings.filter((listing) =>
    searchParams?.filter ? listing.category === searchParams.filter : true,
  );

  return (
    <>
      <Navbar /> <Filter />
      <div className="container mt-28">
        {categorizedListings.length === 0 ? (
          <div className="mb-5 flex h-[70vh] w-full flex-1 items-center justify-center rounded-lg bg-zinc-50 text-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <Scroll strokeWidth={1.5} size={24} />
              <p className="text-lg font-semibold">
                No listings for this category.
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-20 grid grid-cols-1 justify-between gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {categorizedListings.map((item) => (
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
      <Footer />
    </>
  );
}
