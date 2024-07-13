"use client";

import { createListing } from "@/app/action/create-listing";
import { User } from "next-auth";

interface AirbnbYourHomeButtonProps {
  user?: User;
}

export const AirbnbYourHomeButton = ({ user }: AirbnbYourHomeButtonProps) => {
  const createListingWithId = createListing.bind(null, {
    userId: user?.id as string,
  });

  return (
    <form action={createListingWithId}>
      <button
        type="submit"
        className="line-clamp-1 hidden cursor-pointer text-nowrap rounded-full py-3 text-center text-[15px] font-semibold transition hover:bg-neutral-100 md:block md:px-4 lg:mr-4"
      >
        Airbnb your home
      </button>
    </form>
  );
};
