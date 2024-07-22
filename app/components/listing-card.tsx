"use client";

import { ChevronLeft, ChevronRight, Edit, Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { dummyImages } from "../data/dummy-images";
import { Listing, UserRole } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

import { DefaultSession } from "next-auth";
import { updateFavorite } from "../action/update-favorite";
import Link from "next/link";

type LisitngCardProps = {
  data: Listing;
  isHost?: boolean;
  searchParams?: { filter: string };
  user?: {
    role: UserRole;
    favoriteIds: string[];
  } & DefaultSession["user"];
};

export const ListingCard = ({ data, isHost, user }: LisitngCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(
    user ? user.favoriteIds.includes(data.id) : false,
  );
  const [index, setIndex] = useState(0);

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

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <>
      {!data ?? <>No data found..</>}
      {isLoading ? (
        <div className="flex h-full w-auto flex-col space-y-3">
          <div className="flex h-[350px] w-full flex-col space-y-3">
            <Skeleton className="h-full w-full rounded-lg" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-2/3 rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <Link href={`/listing/${data.id}`}>
          <div className="group relative h-[300px] w-full overflow-hidden rounded-lg transition-all">
            <div
              className="flex h-full w-full rounded-lg transition-all duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {dummyImages.map((url, i) => (
                <div
                  key={i}
                  className="relative h-full w-full flex-shrink-0 bg-zinc-200"
                >
                  <Image
                    src={url}
                    alt="Image of home"
                    fill
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
                onClick={handleFavoriteToggle}
                className="absolute right-5 top-5 z-10 h-7 w-7 cursor-pointer border-none bg-transparent p-0 transition-all active:scale-90"
                aria-label="Add to favorites" // Optional but recommended for accessibility
              >
                <Heart
                  className={`h-full w-full text-white transition-all hover:fill-rose-500 ${isFavorite ? "fill-rose-500" : "fill-white/50"}`}
                  strokeWidth={1.5}
                />
              </button>
            )}

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
          <div className="flex-flex-col mt-2">
            <h2 className="text-base font-semibold">
              <span className="">{data.city ? `${data.city}, ` : ""} </span>
              <span>{data.country}</span>
            </h2>
            <h3 className="capitalize">{data.category}</h3>
            <p>${data.price} / night</p>
          </div>
        </Link>
      )}
    </>
  );
};
