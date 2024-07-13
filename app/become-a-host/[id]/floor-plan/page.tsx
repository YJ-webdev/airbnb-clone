"use client";

import { createFloorPlan } from "@/app/action/create-listing";
import { Counter } from "@/app/become-a-host/[id]/floor-plan/counter";
import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { PersonStanding } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloorPlanRoute({ params }: { params: { id: string } }) {
  const [dataLogged, setDataLogged] = useState(false);

  const [guestCount, setGuestCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [bedCount, setBedCount] = useState(0);
  const [bathroomCount, setBathroomCount] = useState(0);

  useEffect(() => {
    if (guestCount > 0 && bathroomCount > 0) {
      setDataLogged(true);
    } else {
      setDataLogged(false);
    }
    console.log(guestCount);
  }, [guestCount, bathroomCount]);

  return (
    <>
      <h2 className="mx-auto max-w-2xl pl-6 pr-6 pt-6 text-2xl font-semibold transition-colors md:pl-0 md:pr-0 md:pt-5 md:text-3xl">
        Let&apos;s start with the basics!
        <span className="text-[20px] font-medium text-muted-foreground">
          {" "}
          —You&apos;ll add more details later,
        </span>
      </h2>
      <form action={createFloorPlan}>
        <input type="hidden" name="listingId" value={params.id} />
        <div className="mx-auto max-w-2xl pl-6 pr-6 pt-5 md:pl-0 md:pr-0 md:text-3xl">
          <div className="mt-8 flex flex-col gap-y-5 border-b pb-5">
            <div className="flex items-center justify-between">
              <div className="flex-flex-col">
                <h3 className="flex gap-2 text-lg font-semibold">
                  Guests
                  <div className="flex">
                    <PersonStanding />
                    <PersonStanding />
                  </div>
                </h3>
                <p className="text-[16px] text-muted-foreground">
                  How many guests fit comfortably in your place?
                </p>
              </div>
              <Counter name="guestCount" setCount={setGuestCount} />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-5 border-b pb-8">
            <div className="flex items-center justify-between">
              <div className="flex-flex-col">
                <h3 className="text-lg font-semibold">Bedrooms</h3>
              </div>
              <Counter name="roomCount" setCount={setRoomCount} />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-5 border-b pb-8">
            <div className="flex items-center justify-between">
              <div className="flex-flex-col">
                <h3 className="text-lg font-semibold">Beds</h3>
              </div>
              <Counter name="bedCount" setCount={setBedCount} />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-5 border-b pb-8">
            <div className="flex items-center justify-between">
              <div className="flex-flex-col">
                <h3 className="text-lg font-semibold">Bathrooms</h3>
              </div>
              <Counter name="bathroomCount" setCount={setBathroomCount} />
            </div>
          </div>
        </div>
        <ActionBar dataLogged={dataLogged} />
      </form>
    </>
  );
}
