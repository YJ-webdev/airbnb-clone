"use client";

import { UserWithRoleAndFavoriteIds } from "@/types";
import { Listing } from "@prisma/client";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { SharedCounter } from "./shared-count";
import { Counter } from "@/app/(become-a-host)/become-a-host/[id]/floor-plan/counter";

interface ReservePanelProps {
  user?: UserWithRoleAndFavoriteIds;
  data: Listing;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const AdultAndChildren = ({ data, user }: ReservePanelProps) => {
  const [count, setCount] = useState(0);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

  const total = adultCount + childCount;
  const left = data?.guestCount! - total;
  const [remaining, setRemaining] = useState(left);

  useEffect(() => {
    setRemaining(data?.guestCount! - total);
  }, [adultCount, childCount, data?.guestCount, total]);
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
          total={total}
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
          total={total}
        />
      </div>

      <div className="flex items-center justify-between py-2">
        Pet <Counter small name="Pet" setCount={setCount} min={0} max={1} />
      </div>
    </div>
  );
};
