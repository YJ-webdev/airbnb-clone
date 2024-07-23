"use client";

import { FavoriteButton } from "@/app/components/favorite-button";
import { useFavorites } from "@/app/context/favorite-context";
import { Input } from "@/components/ui/input";
import { Listing, UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";

interface ReservePanelProps {
  isHost: boolean;
  user?: {
    role: UserRole;
    favoriteIds: string[];
  } & DefaultSession["user"];
  data: Listing;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ReservePanel = ({ isHost, data, user }: ReservePanelProps) => {
  const { favoriteIds } = useFavorites();
  const isFavorite = favoriteIds.includes(data.id);

  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const [optimisticFavorite, setOptimisticFavorite] = useState(favorite);

  return (
    <>
      <div className="sticky top-[151px] mr-5 hidden h-full w-[30%] min-w-[300px] rounded-lg border bg-white p-6 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)] md:flex md:flex-col">
        <div className="flex flex-col gap-4">
          <div className="flex-1 space-y-4">
            <FavoriteButton
              data={data}
              user={user}
              isFavorite={isFavorite}
              favorite={favorite}
              setFavorite={setFavorite}
              optimisticFavorite={optimisticFavorite}
              setOptimisticFavorite={setOptimisticFavorite}
            />

            <h3 className={`${montserrat.className} text-[22px] font-semibold`}>
              ${data.price}{" "}
              <span className="text-base font-medium">/ night</span>
            </h3>
            <div className="flex items-baseline justify-between gap-2">
              <Input
                className="h-14 w-full rounded-full text-sm uppercase"
                name="check-in"
                placeholder="Check-in"
              />
              <Input
                className="h-14 w-full rounded-full text-sm uppercase"
                name="check-out"
                placeholder="Check-out"
              />
            </div>
            <Input
              className="h-14 w-full rounded-full text-sm uppercase"
              name="Guests"
              placeholder="Guests"
            />
          </div>

          {isHost ? (
            <button className="h-14 w-full rounded-full bg-black px-5 py-3 font-semibold text-white hover:bg-zinc-500">
              Edit listing
            </button>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <p className="mb-2 text-center text-sm text-foreground">
                It won&apos;t be charged yet.
              </p>

              <button className="h-14 w-full rounded-full bg-gradient-to-r from-rose-500 to-[#e3326d] px-5 py-3 font-semibold text-white">
                Reserve
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 flex h-[80px] w-full items-center justify-between border-t bg-gradient-to-b from-zinc-200 via-slate-50 to-white p-6 md:hidden">
        <div className="flex items-center gap-2">
          <h3>
            <span
              className={`${montserrat.className} text-[22px] font-semibold`}
            >
              ${data.price}
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
          />
        </div>

        <button className="rounded-full bg-gradient-to-r from-rose-500 to-[#e3326d] px-5 py-3 font-semibold text-white">
          Reserve
        </button>
      </div>
    </>
  );
};
