"use client";

import { ReservePanel } from "./reserve-panel";
import { ListingMap } from "./listing-map";
import { PreviewImages } from "@/app/components/preview-images";
import { SocialShare } from "@/app/components/social-share";
import Calendar2 from "./calendar-expanded";
import { AdultAndChildren } from "./adult-and-children";
import { Listing } from "@prisma/client";
import { UserWithRoleAndFavoriteIds } from "@/types";
import React, { useRef, useState } from "react";

export interface ListingWithReservations extends Listing {
  reservations: {
    startDate: Date;
    endDate: Date;
  }[];
}

interface ListingContentProps {
  data: ListingWithReservations;
  user?: UserWithRoleAndFavoriteIds;
  params: { id: string };
}

export const ListingContent = ({ data, user, params }: ListingContentProps) => {
  const calendarRef = useRef(null);

  return (
    <div className="flex">
      <div className="mb-10 flex w-full flex-1 flex-col gap-5 lg:min-w-[700px]">
        <h1 className="-mb-1 text-xl font-semibold tracking-tight md:tracking-normal lg:text-2xl">
          {data.title}
        </h1>
        <div className="relative flex md:w-full">
          <div className="flex w-full flex-col gap-10">
            <PreviewImages data={data} className="h-[55vh]" />
            <div className="w-full space-y-2">
              <div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
                <h2 className="text-[19px] font-semibold md:text-[20px]">
                  <span className="capitalize">{data.category} place</span> in{" "}
                  <span className="underline">
                    {data.state ? `${data.state}, ` : ""}
                    {data.country}
                  </span>
                </h2>
                <div className="lg:hidden">
                  <SocialShare data={data} />
                </div>
              </div>
              <div className="flex min-w-[350px] items-center gap-2 text-center text-sm text-foreground md:text-base">
                <p className="w-full text-center tracking-wide sm:text-left">
                  {`${data.guestCount} Guests ·  ${data.roomCount} bedrooms ·  
            ${data.bedCount} beds ·  ${data.bathroomCount} bathrooms`}
                </p>
              </div>
            </div>
            <p>{data.description}</p>
            <div className="flex flex-col space-y-3">
              <h3 className="text-[19px] font-semibold md:text-[20px]">
                Where it located
              </h3>
              <ListingMap lat={data?.lat!} lng={data?.lng!} />
            </div>
            <div className="flex flex-col space-y-3">
              <h3
                ref={calendarRef}
                className="text-[19px] font-semibold md:text-[20px]"
              >
                Pick Your Stay Dates
              </h3>
              <Calendar2 reservation={data.reservations} />
            </div>
            <div className="mb-16 flex flex-col space-y-3 lg:mb-0 lg:hidden">
              <h3 className="text-[19px] font-semibold md:text-[20px]">
                Select Number of Adults and Children
              </h3>
              <div className="container">
                <AdultAndChildren user={user} data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReservePanel
        calendarRef={calendarRef}
        data={data}
        user={user}
        params={params}
      />
    </div>
  );
};
