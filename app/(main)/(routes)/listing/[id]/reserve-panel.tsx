"use client";

import { FavoriteButton } from "@/app/components/favorite-button";
import { SocialShare } from "@/app/components/social-share";
import { useFavorites } from "@/app/context/favorite-context";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { Montserrat } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import Calendar from "./calendar";
import { AdultAndChildren } from "./adult-and-children";
import { useDatePick } from "@/app/context/date-pick-context";
import Link from "next/link";

import { useGuestCount } from "@/app/context/guest-count-context";
import { formatFloor } from "@/app/lib/format-money";
import { GUEST_SERVICE_FEE } from "@/app/lib/rates";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ListingWithReservations } from "./listing-content";
import { LoginDialog } from "@/app/components/form/login-dialog";
import { RegisterDialog } from "@/app/components/form/register-dialog";

interface ReservePanelProps {
  user?: UserWithRoleAndFavoriteIds;
  data: ListingWithReservations;
  params: { id: string };
  calendarRef: React.RefObject<HTMLDivElement>;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ReservePanel = ({
  calendarRef,
  data,
  user,
  params,
}: ReservePanelProps) => {
  const fillColor = "fill-zinc-500/50";

  const { adultCount, childCount, petCount } = useGuestCount();
  const { startDate, endDate, stayingNights } = useDatePick();

  const startDateString = startDate?.format("MMM-DD-YYYY");
  const endDateString = endDate?.format("MMM-DD-YYYY");

  const totalPrice = formatFloor(
    data.enteredPrice! * stayingNights +
      data.enteredPrice! * stayingNights * GUEST_SERVICE_FEE,
  );

  const { favoriteIds } = useFavorites();

  const isFavorite = favoriteIds.includes(data.id);

  const [favorite, setFavorite] = useState(isFavorite);
  const [optimisticFavorite, setOptimisticFavorite] = useState(favorite);

  const [message, setMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const [openLoginDialogDesktop, setOpenLoginDialogDesktop] = useState(false);
  const [openRegisterDialogDesktop, setOpenRegisterDialogDesktop] =
    useState(false);
  const [openLoginDialogMobile, setOpenLoginDialogMobile] = useState(false);
  const [openRegisterDialogMobile, setOpenRegisterDialogMobile] =
    useState(false);

  const handleOpenRegisterDesktop = () => {
    setOpenLoginDialogDesktop(false);
    setOpenRegisterDialogDesktop(true);
  };

  const handleOpenLoginDesktop = () => {
    setOpenLoginDialogDesktop(true);
    setOpenRegisterDialogDesktop(false);
  };

  const handleOpenRegisterMobile = () => {
    setOpenLoginDialogMobile(false);
    setOpenRegisterDialogMobile(true);
  };

  const handleOpenLoginMobile = () => {
    setOpenLoginDialogMobile(true);
    setOpenRegisterDialogMobile(false);
  };

  const onSelectDateClick = () => {
    setMessage("Select both start and end date");

    if (calendarRef.current) {
      // Get the element's position relative to the document
      const elementTop =
        calendarRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offset = -100; // Adjust this value as needed

      // Smooth scroll to the desired position
      window.scrollTo({ top: elementTop + offset, behavior: "smooth" });
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const onReserveClick = () => {
    setIsPending(true);
  };

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  return (
    <>
      <div className="sticky mb-10 ml-5 mt-[48px] hidden h-full w-[30%] min-w-[300px] rounded-lg border bg-white p-6 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)] lg:top-24 lg:flex lg:flex-col">
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
              <span className="text-base font-medium">
                / {stayingNights === 1 ? "night" : `${stayingNights} nights`}
              </span>
            </h3>
            <div className="flex items-baseline justify-between gap-2">
              <Calendar reservation={data.reservations} />
            </div>

            <AdultAndChildren data={data} user={user} />
          </div>

          <div className="flex flex-col items-center justify-center">
            {!user?.id ? (
              <>
                <Dialog
                  open={openLoginDialogDesktop}
                  onOpenChange={setOpenLoginDialogDesktop}
                >
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="my-1 flex h-14 w-full items-center justify-center rounded-lg bg-gradient-to-r from-rose-500 to-[#e3326d] px-5 py-3 font-semibold text-white"
                    >
                      Log in to book
                    </button>
                  </DialogTrigger>

                  <LoginDialog onOpenRegister={handleOpenRegisterDesktop} />
                </Dialog>
                <Dialog
                  open={openRegisterDialogDesktop}
                  onOpenChange={setOpenRegisterDialogDesktop}
                >
                  <RegisterDialog onOpenLogin={handleOpenLoginDesktop} />
                </Dialog>
              </>
            ) : (
              <>
                {(user.id && !startDate) || !endDate ? (
                  <div className="relative w-full">
                    <p className="absolute -top-5 w-full text-center text-sm">
                      {message ?? ""}
                    </p>
                    <button
                      onClick={onSelectDateClick}
                      type="button"
                      className="my-1 flex h-14 w-full items-center justify-center rounded-lg bg-gradient-to-r from-rose-500 to-[#e3326d] px-5 py-3 font-semibold text-white"
                    >
                      Select Date
                    </button>
                  </div>
                ) : (
                  <Link
                    href={{
                      pathname: `/listing/${params.id}/request-to-book`,
                      query: {
                        startDate: startDateString,
                        endDate: endDateString,
                        adultCount,
                        childCount,
                        petCount,
                      },
                    }}
                    className={cn(
                      "my-1 flex h-14 w-full items-center justify-center rounded-lg px-5 py-3 font-semibold text-white",
                      isPending
                        ? "cursor-not-allowed bg-rose-500/50"
                        : "bg-gradient-to-r from-rose-500 to-[#e3326d]",
                    )}
                    onClick={onReserveClick}
                  >
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <p>Please wait..</p>{" "}
                        <Loader2 className="animate-spin" />
                      </div>
                    ) : (
                      "Reserve"
                    )}
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="mx-auto flex items-center">
            <SocialShare data={data} />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 z-20 -ml-4 flex h-[80px] w-full items-center justify-between border-t bg-white p-6 lg:hidden">
        <div className="relative flex w-full items-center justify-between">
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
          {!user?.id ? (
            <>
              <Dialog
                open={openLoginDialogMobile}
                onOpenChange={setOpenLoginDialogMobile}
              >
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="rounded-full bg-gradient-to-r from-rose-500 to-[#e3326d] px-5 py-3 font-semibold text-white"
                  >
                    Log in to book
                  </button>
                </DialogTrigger>

                <LoginDialog onOpenRegister={handleOpenRegisterMobile} />
              </Dialog>
              <Dialog
                open={openRegisterDialogMobile}
                onOpenChange={setOpenRegisterDialogMobile}
              >
                <RegisterDialog onOpenLogin={handleOpenLoginMobile} />
              </Dialog>
            </>
          ) : (
            <>
              {(user.id && !startDate) || !endDate ? (
                <>
                  <button
                    onClick={onSelectDateClick}
                    type="button"
                    className="rounded-full bg-gradient-to-r from-rose-500 to-[#e3326d] px-5 py-3 font-semibold text-white"
                  >
                    Select Date
                  </button>
                  {message && (
                    <p className="absolute -top-16 right-1/2 z-10 line-clamp-1 w-2/3 translate-x-1/2 rounded-full bg-white p-3 text-center text-sm sm:w-1/2 md:w-fit">
                      {message}
                    </p>
                  )}
                </>
              ) : (
                <Link
                  href={{
                    pathname: `/listing/${params.id}/request-to-book`,
                    query: {
                      startDate: startDateString,
                      endDate: endDateString,
                      adultCount,
                      childCount,
                      petCount,
                    },
                  }}
                  className={cn(
                    "w-fit rounded-full px-5 py-3 font-semibold text-white",
                    isPending
                      ? "cursor-not-allowed bg-rose-500/50"
                      : "bg-gradient-to-r from-rose-500 to-[#e3326d]",
                  )}
                  onClick={onReserveClick}
                >
                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <p>Please wait..</p> <Loader2 className="animate-spin" />
                    </div>
                  ) : (
                    "Reserve"
                  )}
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
