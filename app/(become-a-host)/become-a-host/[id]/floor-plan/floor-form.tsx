"use client";

import { createFloorPlan } from "@/app/action/create-listing";
import { Counter } from "@/app/(become-a-host)/become-a-host/[id]/floor-plan/counter";
import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { useProgress } from "@/app/context/progress-context";
import { Bath, BedSingle, DoorOpen, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

export const FloorFrom = ({ params }: { params: { id: string } }) => {
  const [dataLogged, setDataLogged] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [bedCount, setBedCount] = useState(0);
  const [bathroomCount, setBathroomCount] = useState(0);

  const { progress, setProgress } = useProgress();

  useEffect(() => {
    setProgress(28);
  }, [setProgress]);

  useEffect(() => {
    if (guestCount > 0 && bathroomCount > 0) {
      setDataLogged(true);
    } else {
      setDataLogged(false);
    }
  }, [guestCount, bathroomCount]);

  return (
    <form action={createFloorPlan}>
      <input type="hidden" name="listingId" value={params.id} />

      <div className="container flex min-h-[80vh] max-w-2xl flex-col gap-5 pt-28">
        {" "}
        <h2 className="max-w-2xl flex-1 text-2xl font-semibold md:text-3xl">
          Let&apos;s start with the basics!
        </h2>
        <div className="flex-grow" />
        <div className="flex-1">
          <div className="mt-8 flex flex-col gap-y-5 border-b pb-5">
            <div className="flex items-center justify-between">
              <div className="flex-flex-col">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <UserCheck size={20} />
                  Guests
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
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <DoorOpen size={20} />
                  Bedrooms
                </h3>
              </div>
              <Counter name="roomCount" setCount={setRoomCount} />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-5 border-b pb-8">
            <div className="flex items-center justify-between">
              <div className="flex-flex-col">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <BedSingle size={20} />
                  Beds
                </h3>
              </div>
              <Counter name="bedCount" setCount={setBedCount} />
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-y-5 border-b pb-8">
            <div className="flex items-center justify-between">
              <div className="flex-flex-col">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Bath size={20} />
                  Bathrooms
                </h3>
              </div>
              <Counter name="bathroomCount" setCount={setBathroomCount} />
            </div>
          </div>
        </div>
        <div className="flex-gow" />
      </div>

      <ActionBar
        dataLogged={dataLogged}
        prevHref={`/become-a-host/${params.id}/structure`}
        currentStep={progress}
      />
    </form>
  );
};