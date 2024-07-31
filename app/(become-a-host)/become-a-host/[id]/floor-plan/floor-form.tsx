"use client";

import { createFloorPlan } from "@/app/action/create-listing";
import { Counter } from "@/app/(become-a-host)/become-a-host/[id]/floor-plan/counter";
import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { useProgress } from "@/app/context/progress-context";
import { Bath, BedSingle, DoorOpen, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";

type FloorFromProps = {
  params: { id: string };
  userId: string;
  initialGuestCount?: number;
  initialRoomCount?: number;
  initialBedCount?: number;
  initialBathroomCount?: number;
};

export const FloorFrom = ({
  params,
  userId,
  initialGuestCount,
  initialRoomCount,
  initialBedCount,
  initialBathroomCount,
}: FloorFromProps) => {
  const [dataLogged, setDataLogged] = useState(false);
  const [guestCount, setGuestCount] = useState(initialGuestCount);
  const [roomCount, setRoomCount] = useState(initialRoomCount);
  const [bedCount, setBedCount] = useState(initialBedCount);
  const [bathroomCount, setBathroomCount] = useState(initialBathroomCount);

  const createFloorPlanWithId = createFloorPlan.bind(null, userId);

  const { progress, setProgress } = useProgress();

  useEffect(() => {
    if (
      guestCount !== undefined &&
      guestCount > 0 &&
      bathroomCount !== undefined &&
      bathroomCount > 0
    ) {
      setDataLogged(true);
    } else {
      setDataLogged(false);
    }
    setProgress(28);
  }, [setProgress, guestCount, bathroomCount]);

  return (
    <form action={createFloorPlanWithId}>
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
              <Counter
                name="guestCount"
                setCount={setGuestCount}
                initialCount={initialGuestCount}
                min={1}
              />
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
              <Counter
                name="roomCount"
                setCount={setRoomCount}
                initialCount={initialRoomCount}
              />
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
              <Counter
                name="bedCount"
                setCount={setBedCount}
                initialCount={initialBedCount}
              />
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
              <Counter
                name="bathroomCount"
                setCount={setBathroomCount}
                initialCount={initialBathroomCount}
                min={1}
              />
            </div>
          </div>
        </div>
        <div className="flex-gow" />
      </div>

      <ActionBar
        dataLogged={dataLogged}
        prevHref={`/become-a-host/${params.id}/category`}
        currentStep={progress}
      />
    </form>
  );
};
