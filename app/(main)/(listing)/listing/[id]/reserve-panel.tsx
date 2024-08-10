"use client";

import { FavoriteButton } from "@/app/components/favorite-button";
import { SocialShare } from "@/app/components/social-share";
import { useFavorites } from "@/app/context/favorite-context";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { Listing } from "@prisma/client";
import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import Calendar from "./calendar";
import { AdultAndChildren } from "./adult-and-children";
import { useDatePick } from "@/app/context/date-pick-context";
import { toast } from "sonner";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useGuestCount } from "@/app/context/guest-count-context";

interface ReservePanelProps {
  user?: UserWithRoleAndFavoriteIds;
  data: Listing;
  params: { id: string };
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ReservePanel = ({ data, user, params }: ReservePanelProps) => {
  const { favoriteIds } = useFavorites();
  const isFavorite = favoriteIds.includes(data.id);

  const [favorite, setFavorite] = useState(isFavorite);
  const fillColor = "fill-zinc-500/50";

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const [optimisticFavorite, setOptimisticFavorite] = useState(favorite);

  const router = useRouter();

  const { adultCount, childCount, petCount } = useGuestCount();
  const { startDate, endDate, stayingNights } = useDatePick();
  const totalPrice = stayingNights * data?.guestPrice!;

  const startDateString = startDate?.format("MMM-DD");
  const endDateString = endDate?.format("MMM-DD");

  const startMonth = startDate?.format("MMM");
  const endMonth = endDate?.format("MMM");

  let formattedDate;

  if (startMonth === endMonth) {
    formattedDate = `${startMonth} ${startDate?.format("DD")} - ${endDate?.format("DD")}`;
  } else {
    formattedDate = `${startDateString} - ${endDateString}`;
  }

  const LoginToast = () => (
    <div>
      Please login to book a reservation.{" "}
      <Link href="/login" className="underline">
        Login
      </Link>
    </div>
  );

  const handleLinkClick = (
    user: UserWithRoleAndFavoriteIds | undefined,
    params: { id: string },
  ) => {
    if (!user) {
      toast(<LoginToast />);
    } else {
      router.push(`/listing/${params.id}/request-to-book`);
    }
  };

  return (
    <>
      <div className="sticky mb-10 mr-5 mt-[48px] hidden h-full w-[30%] min-w-[300px] rounded-lg border bg-white p-6 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)] lg:top-24 lg:flex lg:flex-col">
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
              ${totalPrice}{" "}
              <span className="text-base font-medium">/ night</span>
            </h3>
            <div className="flex items-baseline justify-between gap-2">
              <Calendar />
            </div>

            <AdultAndChildren data={data} user={user} />
          </div>

          <div className="flex flex-col items-center justify-center">
            <Link
              href={{
                pathname: `/listing/${params.id}/request-to-book`,
                query: {
                  stayingDate: formattedDate,
                  stayingNights,
                  totalPrice,
                  adultCount,
                  childCount,
                  petCount,
                },
              }}
              className="my-1 flex h-14 w-full items-center justify-center rounded-lg bg-gradient-to-r from-rose-500 to-[#e3326d] px-5 py-3 font-semibold text-white"
            >
              Reserve
            </Link>
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
              ${totalPrice}
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

        <Link
          href={{
            pathname: `/listing/${params.id}/request-to-book`,
            query: {
              startDate: startDateString,
              endDate: endDateString,
              stayingNights,
              totalPrice,
              adultCount,
              childCount,
              petCount,
            },
          }}
          className="rounded-full bg-gradient-to-r from-rose-500 to-[#e3326d] px-5 py-3 font-semibold text-white"
        >
          Reserve
        </Link>
      </div>
    </>
  );
};
