"use client";

import { updateFavorite } from "@/app/action/update-favorite";
import { Input } from "@/components/ui/input";
import { Listing, UserRole } from "@prisma/client";
import { Heart } from "lucide-react";
import { DefaultSession } from "next-auth";
import { Montserrat } from "next/font/google";
import { useState } from "react";

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
  const [isFavorite, setIsFavorite] = useState(
    user ? user.favoriteIds.includes(data.id) : false,
  );

  const handleFavoriteToggle = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setIsFavorite((prev) => !prev);
    try {
      await updateFavorite(user?.id!, data.id);
    } catch (error) {
      setIsFavorite((prev) => !prev);
      console.error("Failed to toggle favorite status:", error);
    }
  };

  return (
    <>
      <div className="sticky top-[151px] mr-5 hidden h-full w-[30%] min-w-[300px] rounded-lg border bg-gradient-to-b from-zinc-200 via-slate-50 to-white p-6 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)] md:flex md:flex-col">
        <div className="flex flex-col gap-4">
          <div className="flex-1 space-y-4">
            <button
              onClick={handleFavoriteToggle}
              className="absolute right-5 top-5 z-10 h-7 w-7 cursor-pointer border-none bg-transparent p-0 transition-all active:scale-90"
              aria-label="Add to favorites" // Optional but recommended for accessibility
            >
              <Heart
                className={`h-full w-full text-white transition-all hover:fill-rose-500 ${isFavorite ? "fill-rose-500" : "fill-white/50"}`}
                strokeWidth={1.5}
              />
            </button>

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
          <button
            onClick={handleFavoriteToggle}
            className="absolute right-5 top-5 z-10 h-7 w-7 cursor-pointer border-none bg-transparent p-0 transition-all active:scale-90"
            aria-label="Add to favorites" // Optional but recommended for accessibility
          >
            <Heart
              className={`h-full w-full text-white transition-all hover:fill-rose-500 ${isFavorite ? "fill-rose-500" : "fill-white/50"}`}
              strokeWidth={1.5}
            />
          </button>
        </div>

        <button className="rounded-full bg-gradient-to-r from-rose-500 to-[#e3326d] px-5 py-3 font-semibold text-white">
          Reserve
        </button>
      </div>
    </>
  );
};
