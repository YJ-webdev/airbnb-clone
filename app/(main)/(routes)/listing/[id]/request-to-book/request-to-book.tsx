"use client";

import { UserWithRoleAndFavoriteIds } from "@/types";
import { Listing } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RightPanel } from "./right-panel";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import ResponsiveDateRangePickers from "./responsive-date-picker";
import { CheckoutForm } from "./checkout-form";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { formatFloor } from "@/app/lib/format-money";
import { GUEST_SERVICE_FEE } from "@/app/lib/rates";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ListingWithReservations } from "../listing-content";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function RequestToBook({
  data,
  user,
}: {
  data: ListingWithReservations & {
    user: {
      name: string | null; // 'name' can be 'null' if not set
    };
  };
  user: UserWithRoleAndFavoriteIds;
}) {
  if (!user) redirect("/");

  const [clientSecret, setClientSecret] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const initialStartDate = dayjs(searchParams.get("startDate"));
  const initialEndDate = dayjs(searchParams.get("endDate"));
  const adultCount = Number(searchParams.get("adultCount"));
  const childCount = Number(searchParams.get("childCount"));
  const petCount = Number(searchParams.get("petCount"));

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const today = new Date();
  const calendarRef = useRef<HTMLDivElement>(null);

  const stayingNights = endDate?.diff(startDate, "day") || 1;
  const amount = formatFloor(
    data.enteredPrice! * stayingNights +
      data.enteredPrice! * stayingNights * GUEST_SERVICE_FEE,
  );
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("Failed to retrieve client secret");
        }
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
      });
  }, [amount]);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
    },
    fonts: [
      {
        cssSrc:
          "https://fonts.googleapis.com/css2?family=Nunito:wght@500&display=swap",
      },
    ],
  };

  return (
    <div className="flex max-w-[1280px] flex-col">
      <div className="flex items-center gap-2">
        <Link href={`/listing/${data.id}`} className="text-zinc-500">
          <ChevronLeft className="h-8 w-8 rounded-full bg-zinc-500/10 p-2 hover:bg-zinc-500/10 md:bg-white" />
        </Link>
        <h1 ref={calendarRef} className="text-xl font-semibold">
          Confirm and pay
        </h1>
      </div>

      <div className="mt-2 flex flex-col md:w-full md:flex-row-reverse md:gap-7 lg:gap-12">
        <RightPanel data={data} amount={amount} stayingNights={stayingNights} />
        <div className="mb-10 flex flex-col gap-7 md:flex-1 md:p-5">
          {/* your trip */}
          <div className="mt-7 flex flex-col gap-2 md:mt-0">
            <h2 className="mb-2 text-lg font-semibold">Your Trip</h2>

            <div className="flex items-center justify-between gap-2">
              <p>Dates</p>

              <ResponsiveDateRangePickers
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                reservation={data.reservations}
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <p>Guests</p>
              <p>{adultCount === 1 ? "1 Adult" : `${adultCount} Adults`}</p>
            </div>
            {childCount === 0 ? (
              ""
            ) : (
              <p className="text-end">
                {childCount === 1 ? "1 Child" : `${childCount} Children`}
              </p>
            )}
            {petCount === 0 ? (
              ""
            ) : (
              <p className="text-end">
                {petCount === 1 ? "1 Pet" : `${petCount} Pets`}
              </p>
            )}
          </div>
          <hr />
          {/* pay with */}
          {clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm
                calendarRef={calendarRef}
                user={user}
                startDate={startDate}
                endDate={endDate}
                clientSecret={clientSecret}
                adults={adultCount}
                data={data}
                stayingNights={stayingNights}
                pets={petCount}
                childCount={childCount}
              />
            </Elements>
          ) : (
            <div className="mb-7 flex flex-col gap-2">
              <div className="mb-2 flex items-center justify-between gap-2">
                <Skeleton className="h-6 w-48" />{" "}
                <Skeleton className="h-6 w-48" />{" "}
              </div>
              <div className="flex flex-col gap-5">
                <Skeleton className="h-14 w-full" />{" "}
                <div className="flex flex-col">
                  <Skeleton className="relative h-14 w-full rounded-t-lg" />{" "}
                  <div className="flex">
                    <Skeleton className="relative h-14 w-full rounded-bl-lg" />{" "}
                    <Skeleton className="relative h-14 w-full rounded-br-lg" />{" "}
                  </div>
                </div>
                <Skeleton className="h-14" />
                <Skeleton className="h-14 w-full" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
