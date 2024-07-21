"use client";

import { dummyImages } from "@/app/data/dummy-images";
import { cn } from "@/lib/utils";
import { Listing, User } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface ReviewListingProps {
  data: Listing & { user: User };
}

export const ReviewListing = ({ data }: ReviewListingProps) => {
  const [index, setIndex] = useState(0);
  const [readMore, setReadMore] = useState(false);

  const description = data.description;

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((index) => (index === 0 ? dummyImages.length - 1 : index - 1));
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((index) => (index === dummyImages.length - 1 ? 0 : index + 1));
  };

  const handleReadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setReadMore((prev) => !prev);
  };

  return (
    <div className="flex h-full w-full flex-col gap-5 md:flex-row">
      <div className="group relative h-[55Dvh] w-full overflow-hidden rounded-lg border transition-all md:flex-1">
        <div
          className="flex h-full w-full transition-all duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {dummyImages.map((url, i) => (
            <div key={i} className="relative h-full w-full flex-shrink-0">
              <Image
                src={url}
                alt="Image of home"
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 rounded-full bg-white transition-opacity duration-1000 ease-in-out hover:scale-105 group-hover:block"
        >
          <ChevronLeft
            size={20}
            className="ml-1 transition-all hover:-translate-x-[1px] hover:scale-105"
            strokeWidth={1.5}
          />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-3 top-1/2 z-20 hidden h-8 w-8 -translate-y-1/2 rounded-full bg-white transition-opacity duration-1000 ease-in-out hover:scale-105 group-hover:block"
        >
          <ChevronRight
            size={20}
            className="ml-2 transition-all hover:translate-x-[1px] hover:scale-105"
            strokeWidth={1.5}
          />
        </button>
      </div>

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
              <span className="font-bold">{data.bathroomCount}</span> bathrooms
            </p>
          </div>
        </div>
        <div className="relative flex flex-1 flex-col gap-3 rounded-lg border p-5 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)]">
          <p className="">&quot;{data.title}&quot;</p>
          <p
            className={cn(
              "overflow-hidden transition-all",
              readMore ? "md:pb-11" : "md:line-clamp-[7]",
            )}
          >
            {description}
            {readMore ? "" : "..."}
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
