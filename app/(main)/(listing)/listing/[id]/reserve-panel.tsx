"use client";

import { FavoriteButton } from "@/app/components/favorite-button";
import { SocialShare } from "@/app/components/social-share";
import { useFavorites } from "@/app/context/favorite-context";
import { Input } from "@/components/ui/input";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { Listing } from "@prisma/client";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import Calendar from "./calendar";
import { Counter } from "@/app/(become-a-host)/become-a-host/[id]/floor-plan/counter";
import { SharedCounter } from "./shared-count";

interface ReservePanelProps {
  user?: UserWithRoleAndFavoriteIds;
  data: Listing;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ReservePanel = ({ data, user }: ReservePanelProps) => {
  const { favoriteIds } = useFavorites();
  const isFavorite = favoriteIds.includes(data.id);

  const [favorite, setFavorite] = useState(isFavorite);
  const fillColor = "fill-zinc-500/50";

  const [count, setCount] = useState(0);

  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);

  const total = adultCount + childCount;
  const left = data?.guestCount! - total;
  const [remaining, setRemaining] = useState(left);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  useEffect(() => {
    setRemaining(data?.guestCount! - total);
  }, [adultCount, childCount, data?.guestCount, total]);

  const [optimisticFavorite, setOptimisticFavorite] = useState(favorite);

  return (
    <>
      <div className="sticky mb-10 mr-5 hidden h-full w-[30%] min-w-[300px] rounded-lg border bg-white p-6 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)] lg:top-[155px] lg:flex lg:flex-col">
        <div className="flex h-full flex-col gap-4">
          <div className="flex-1 space-y-4">
            <FavoriteButton
              data={data}
              user={user}
              isFavorite={isFavorite}
              favorite={favorite}
              setFavorite={setFavorite}
              optimisticFavorite={optimisticFavorite}
              setOptimisticFavorite={setOptimisticFavorite}
              fillColor={fillColor}
            />

            <h3 className={`${montserrat.className} text-[22px] font-semibold`}>
              ${data.guestPrice}{" "}
              <span className="text-base font-medium">/ night</span>
            </h3>
            <div className="flex items-baseline justify-between gap-2">
              <Calendar />
            </div>

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
              Pet{" "}
              <Counter small name="Pet" setCount={setCount} min={0} max={1} />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            {/* <p className="mb-2 text-center text-sm text-foreground">
              It won&apos;t be charged yet.
            </p> */}

            <button className="my-1 h-14 w-full rounded-lg bg-gradient-to-r from-rose-500 to-[#e3326d] px-5 py-3 font-semibold text-white">
              Reserve
            </button>
          </div>

          <div className="mx-auto flex items-center">
            <SocialShare data={data} />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 flex h-[80px] w-full items-center justify-between border-t bg-white p-6 lg:hidden">
        <div className="flex items-center gap-2">
          <h3>
            <span
              className={`${montserrat.className} text-[22px] font-semibold`}
            >
              ${data.guestPrice}
            </span>{" "}
            / night
          </h3>

          <FavoriteButton
            data={data}
            user={user}
            position=""
            isFavorite={isFavorite}
            favorite={favorite}
            setFavorite={setFavorite}
            optimisticFavorite={optimisticFavorite}
            setOptimisticFavorite={setOptimisticFavorite}
            fillColor={fillColor}
          />
        </div>

        <button className="rounded-full bg-gradient-to-r from-rose-500 to-[#e3326d] px-5 py-3 font-semibold text-white">
          Reserve
        </button>
      </div>
    </>
  );
};
