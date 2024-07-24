"use client";

import { PreviewImages } from "@/app/components/preview-images";
import { formatFloor } from "@/app/lib/format-money";
import { cn } from "@/lib/utils";
import { Listing, User } from "@prisma/client";
import React, { useState } from "react";

interface ReviewListingProps {
  data: Listing & { user: User };
}

export const ReviewListing = ({ data }: ReviewListingProps) => {
  const [readMore, setReadMore] = useState(false);
  const description = data.description;

  const handleReadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setReadMore((prev) => !prev);
  };

  return (
    <div className="flex h-full w-full flex-col gap-5 md:flex-row">
      <PreviewImages data={data} />

      <div className="flex min-h-[50Dvh] flex-col space-y-4 md:flex-1">
        <div className="flex h-[100px] flex-col gap-3">
          <h2 className="flex items-baseline justify-between">
            <p className="text-base font-bold">
              {data.city} {data.country}
            </p>
            <p className="text-sm uppercase">{data.category}</p>
          </h2>

          <div className="flex items-baseline justify-between">
            <p className="rounded-full px-2 py-1 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)]">
              ${data.price} / night
            </p>
            <p>hosted by {data.user.name}</p>
          </div>

          <div className="flex min-w-[350px] items-center gap-2">
            <p>
              <span className="font-bold">{data.guestCount}</span> Guests
            </p>
            <p>·</p>
            <p>
              <span className="font-bold">{data.roomCount}</span> bedrooms
            </p>
            <p>·</p>
            <p>
              <span className="font-bold">{data.bedCount}</span> beds
            </p>
            <p>·</p>
            <p>
              <span className="font-bold">{data.guestCount}</span> bathrooms
            </p>
          </div>
        </div>
        <div className="relative flex flex-1 flex-col gap-3 rounded-lg border p-5 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)]">
          <p className="">&quot;{data.title}&quot;</p>
          <p
            className={cn(
              "overflow-hidden transition-all",
              readMore
                ? "md:pb-11"
                : window.innerHeight >= 740
                  ? "md:line-clamp-[12]"
                  : "md:line-clamp-[8]",
            )}
          >
            {description}
          </p>
          <button
            type="button"
            className="absolute bottom-3 right-2 hidden rounded-full border px-3 py-2 text-sm backdrop-blur-md md:block"
            onClick={handleReadMore}
          >
            {readMore === false ? <p>Read more ▼</p> : <p>Read less ▲</p>}
          </button>
        </div>
      </div>
    </div>
  );
};
