"use client";

import { ChevronLeft, ChevronRight, Edit, Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { dummyImages } from "../data/dummy-images";
import { Listing } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

interface LisitngCardProps {
  data: Listing;
  isHost?: boolean;
  searchParams?: { filter: string };
}

export const ListingCard = ({
  data,
  isHost,
  searchParams,
}: LisitngCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [heart, setHeart] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Simulating data fetching
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const handleHeart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setHeart((prev) => !prev);
  };

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

  return (
    <>
      {!data ?? <>No data found..</>}
      {isLoading ? (
        <div className="flex h-full w-auto flex-col space-y-3">
          <div className="flex h-[300px] w-full flex-col space-y-3">
            <Skeleton className="h-full w-full rounded-lg" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-full rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full w-auto flex-col space-y-2">
          <div className="group relative h-[300px] w-full cursor-pointer overflow-hidden rounded-lg transition-all">
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
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
            {isHost === true ? (
              <button
                className="absolute right-5 top-5 flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-full border-none bg-black px-5 py-3 transition-all hover:bg-zinc-500 active:scale-90"
                aria-label="Edit listing" // Optional but recommended for accessibility
              >
                <Edit size={20} className="text-white" strokeWidth={1.5} />
                <p className="group text-sm font-semibold text-white">Edit</p>
              </button>
            ) : (
              <button
                onClick={handleHeart}
                className="absolute right-5 top-5 z-10 h-7 w-7 cursor-pointer border-none bg-transparent p-0 transition-all active:scale-90"
                aria-label="Add to favorites" // Optional but recommended for accessibility
              >
                <Heart
                  className={`h-full w-full text-white transition-all hover:fill-rose-500 ${heart === true ? "fill-rose-500" : "fill-white/50"}`}
                  strokeWidth={1.5}
                />
              </button>
            )}

            <button
              onClick={handlePrev}
              type="button"
              className="absolute left-3 top-[135px] z-20 hidden h-8 w-8 rounded-full transition-all hover:block hover:scale-105"
            >
              <ChevronLeft
                size={20}
                className="ml-1 transition-all hover:-translate-x-[1px] hover:scale-105"
                strokeWidth={1.5}
              />
            </button>

            <button
              onClick={handlePrev}
              type="button"
              className="absolute left-3 top-[135px] z-20 hidden h-8 w-8 rounded-full bg-white transition-opacity duration-500 ease-in-out hover:scale-105 group-hover:block"
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
              className="absolute right-3 top-[135px] z-20 hidden h-8 w-8 rounded-full bg-white transition-opacity duration-1000 ease-in-out hover:scale-105 group-hover:block"
            >
              <ChevronRight
                size={20}
                className="ml-2 transition-all hover:translate-x-[1px] hover:scale-105"
                strokeWidth={1.5}
              />
            </button>
          </div>
          <div className="flex-flex-col">
            <h2 className="text-base font-bold">
              <span className="">{data.city} </span>
              <span>{data.country}</span>
            </h2>
            <h3>{data.category}</h3>
            <p>${data.price} / night</p>
          </div>
        </div>
      )}
    </>
  );
};
