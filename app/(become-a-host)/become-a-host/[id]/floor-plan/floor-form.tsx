"use client";

import { createFloorPlan } from "@/app/actions/create-listing";

import { ActionBar } from "@/app/components/become-a-host/action-bar";
import { Counter } from "@/app/components/counter";
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
  const [dataLogged, setDataLogged] = useState(true);
  const [guestCount, setGuestCount] = useState(initialGuestCount);
  const [roomCount, setRoomCount] = useState(initialRoomCount);
  const [bedCount, setBedCount] = useState(initialBedCount);
  const [bathroomCount, setBathroomCount] = useState(initialBathroomCount);

  const createFloorPlanWithId = createFloorPlan.bind(null, userId);

  const { progress, setProgress } = useProgress();

  useEffect(() => {
    setProgress(28);
  }, [setProgress]);

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
                initialCount={initialGuestCount || 1}
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
                min={0}
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
                initialCount={initialBedCount || 1}
                min={1}
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
                initialCount={initialBathroomCount || 1}
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
