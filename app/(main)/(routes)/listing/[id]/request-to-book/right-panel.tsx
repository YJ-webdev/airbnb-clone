"use client";

import { dummyImages } from "@/app/data/dummy-images";
import { formatFloor } from "@/app/lib/format-money";
import { GUEST_SERVICE_FEE } from "@/app/lib/rates";
import { Listing } from "@prisma/client";
import { Dayjs } from "dayjs";
import Image from "next/image";

interface RightPanelProps {
  data: Listing & {
    user: {
      name: string | null; // 'name' can be 'null' if not set
    };
  };

  amount: string;
  stayingNights: number;
}

export const RightPanel = ({
  data,
  stayingNights,
  amount,
}: RightPanelProps) => {
  return (
    <div className="mt-5 flex h-fit flex-col gap-7 rounded-lg border-zinc-300 md:sticky md:top-24 md:mb-14 md:mt-0 md:flex-1 md:border md:p-7 lg:p-10">
      <div className="flex h-[140px] items-center justify-between gap-2">
        <div className="mr-2 flex-1 md:mr-5 md:mt-0">
          <Image
            src={dummyImages[0]}
            alt="listing image"
            width={500}
            height={500}
            className="h-[140px] w-full object-cover"
          />
        </div>
        <div className="flex h-full flex-1 flex-grow flex-col">
          <div className="flex flex-grow flex-col">
            <h2>{data.title}</h2>
            <p className="text-sm">
              {data.state && `${data.state},`} {data.country}
            </p>
            <p className="text-sm">
              Room type <span className="capitalize">{data.category}</span>
            </p>
          </div>
          <p className="mt-3 text-end text-sm">{`Hosted by ${data.user.name ?? "Unknown Host"}`}</p>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Price Details</h2>
        <div className="flex items-center justify-between gap-2">
          <p>
            ${data.enteredPrice} x{" "}
            {stayingNights === 1 ? "1 night" : `${stayingNights} nights`}
          </p>
          <p>{data.enteredPrice! * stayingNights}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p>Airbnb Service Fee</p>
          <p>
            {formatFloor(
              data.enteredPrice! * stayingNights * GUEST_SERVICE_FEE,
            )}{" "}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold">Total Price(USD)</p>
          <p className="text-lg font-semibold">${amount}</p>
        </div>
      </div>
      <hr className="hidden md:block" />
      <p className="text-sm md:-mb-2">
        Your card issuer may charge an additional fee for international payment
        processing.
      </p>
      <hr className="md:hidden" />
    </div>
  );
};
