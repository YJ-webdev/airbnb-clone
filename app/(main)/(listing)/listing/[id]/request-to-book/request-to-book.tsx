"use client";

import { UserWithRoleAndFavoriteIds } from "@/types";
import { Listing } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RightPanel } from "./right-panel";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import ResponsiveDateRangePickers from "./responsive-date-picker";
import { CheckoutForm } from "./checkout-form";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { formatFloor } from "@/app/lib/format-money";
import { GUEST_SERVICE_FEE } from "@/app/lib/rates";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function RequestToBook({
  data,
  user,
}: {
  data: Listing & {
    user: {
      name: string | null; // 'name' can be 'null' if not set
    };
  };
  user: UserWithRoleAndFavoriteIds;
}) {
  if (!user) console.log("login");

  const [clientSecret, setClientSecret] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const initialStartDate = dayjs(searchParams.get("startDate"));
  const initialEndDate = dayjs(searchParams.get("endDate"));
  const initialadultCount = Number(searchParams.get("adultCount"));
  const initialchildCount = Number(searchParams.get("childCount"));
  const initialpetCount = Number(searchParams.get("petCount"));

  const [startDate, setStartDate] = useState(initialStartDate || null);
  const [endDate, setEndDate] = useState(initialEndDate || null);
  const [adultCount, setAdultCount] = useState(initialadultCount);
  const [childCount, setChildCount] = useState(initialchildCount);
  const [petCount, setPetCount] = useState(initialpetCount);

  const stayingNights = endDate?.diff(startDate, "day") || 1;
  const amount = formatFloor(
    data.enteredPrice! * stayingNights +
      data.enteredPrice! * stayingNights * GUEST_SERVICE_FEE,
  );

  const handleGoBack = () => {
    router.back();
  };

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

  const appearance = {
    theme: "stripe" as const,
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container mt-5 flex max-w-[1280px] flex-col">
      <div className="flex items-center gap-2">
        <button onClick={handleGoBack}>
          <ChevronLeft className="h-8 w-8 rounded-full bg-zinc-500/10 p-2 hover:bg-zinc-500/10 md:bg-white" />
        </button>
        <h1 className="text-xl font-semibold">Confirm and pay</h1>
      </div>

      <div className="mb-5 mt-2 flex flex-col md:w-full md:flex-row-reverse md:gap-7 lg:gap-12">
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
              <CheckoutForm />
            </Elements>
          ) : (
            <p>Loading payment details...</p>
          )}
        </div>
      </div>
    </div>
  );
}
