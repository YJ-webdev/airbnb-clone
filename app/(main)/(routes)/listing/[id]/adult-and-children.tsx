"use client";

import { UserWithRoleAndFavoriteIds } from "@/types";
import { Listing } from "@prisma/client";
import { Montserrat } from "next/font/google";
import { SharedCounter } from "./shared-count";
import { Counter } from "@/app/components/counter";
import { useGuestCount } from "@/app/context/guest-count-context";

interface ReservePanelProps {
  user?: UserWithRoleAndFavoriteIds;
  data: Listing;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const AdultAndChildren = ({ data, user }: ReservePanelProps) => {
  const {
    adultCount,
    childCount,
    petCount,
    totalGuests,
    remainingGuests,
    setAdultCount,
    setChildCount,
    setPetCount,
  } = useGuestCount();

  return (
    <div className="mx-1 flex flex-col gap-4">
      <div className="flex items-center justify-between py-2">
        Adults{" "}
        <SharedCounter
          small
          name="Guests"
          setCount={setAdultCount}
          count={adultCount}
          min={1}
          max={data?.guestCount!}
          total={totalGuests}
        />
      </div>
      <div className="flex items-center justify-between py-2">
        Children{" "}
        <SharedCounter
          small
          name="Children"
          setCount={setChildCount}
          count={childCount}
          min={0}
          max={data?.guestCount!}
          total={totalGuests}
        />
      </div>

      <div className="flex items-center justify-between py-2">
        Pet{" "}
        <Counter
          small
          name="Pet"
          setCount={setPetCount}
          min={0}
          max={1}
          initialCount={petCount}
        />
      </div>
    </div>
  );
};
