"use client";

import { Bed, ChevronLeft, ChevronRight, Edit, UserIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { dummyImages } from "../data/dummy-images";
import { Listing } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { FavoriteButton } from "./favorite-button";
import { useFavorites } from "../context/favorite-context";
import { UserWithRoleAndFavoriteIds } from "@/types";

interface LisitngCardProps {
  data: Listing;
  isHost?: boolean;
  searchParams?: {
    destination?: string;
    startDate?: string;
    endDate?: string;
    guests?: string;
    filter?: string;
  };
  user: UserWithRoleAndFavoriteIds;
}

export const ListingCard = ({ data, isHost, user }: LisitngCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const { favoriteIds } = useFavorites();
  const isFavorite = favoriteIds.includes(data.id);
  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const [optimisticFavorite, setOptimisticFavorite] = useState(favorite);

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
        <div className="relative">
          <Link href={`/listing/${data.id}`}>
            <div className="group h-[300px] w-full overflow-hidden rounded-lg transition-all">
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
                      width={1000}
                      height={1000}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                ))}
              </div>

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
              <div className="flex items-start justify-between">
                <h2 className="text-base font-semibold">
                  <span className="">
                    {data.state ? `${data.state}, ` : ""}{" "}
                  </span>
                  <span>{data.country}</span>
                </h2>
                <div className="ml-2 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <UserIcon className="h-4 w-4" />
                    {data.guestCount}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    {data.bedCount}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <h3 className="capitalize text-zinc-500">{data.category}</h3>{" "}
              </div>
              <p>
                <span className="font-semibold">${data.guestPrice}</span> /
                night
              </p>
            </div>
          </Link>{" "}
          {isHost === true ? (
            <Link
              href={`/become-a-host/${data.id}/category`}
              className="absolute right-5 top-5 z-20 flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-full border-none bg-black px-5 py-3 transition-all hover:bg-zinc-500 active:scale-90"
              aria-label="Edit listing"
            >
              <Edit size={20} className="text-white" strokeWidth={1.5} />
              <p className="group text-sm font-semibold text-white">Edit</p>
            </Link>
          ) : (
            <FavoriteButton
              data={data}
              user={user}
              isFavorite={isFavorite}
              favorite={favorite}
              setFavorite={setFavorite}
              optimisticFavorite={optimisticFavorite}
              setOptimisticFavorite={setOptimisticFavorite}
            />
          )}
        </div>
      )}
    </>
  );
};
