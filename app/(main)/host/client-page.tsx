"use client";

import { createNewListing } from "@/app/action/create-listing";
import { ListingCard } from "@/app/components/listing-card";
import { useContentWidth } from "@/app/context/ContentWidthContext";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { useEffect } from "react";

interface ClientPageProps {
  data: any;
  latestListing: any;
  user: UserWithRoleAndFavoriteIds;
}

export const ClientPage = ({ data, user, latestListing }: ClientPageProps) => {
  const userId = user?.id as string;
  const createNewListingWithId = createNewListing.bind(null, {
    userId: userId as string,
  });

  const { setContentWidth } = useContentWidth();

  useEffect(() => {
    setContentWidth("1400px"); // Example width for max-w-7xl

    return () => {
      setContentWidth("100%"); // Reset to default width on unmount
    };
  }, [setContentWidth]);

  return (
    <div className="container relative mx-auto mt-10">
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
      <div className="mb-28 grid grid-cols-1 justify-center gap-5 sm:grid-cols-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {data.map((item: any) => (
          <ListingCard key={item.id!} data={item} isHost={true} user={user} />
        ))}
      </div>
      <form
        action={createNewListingWithId}
        className="fixed right-[8px] top-24 z-20 lg:right-[5%]"
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
};
