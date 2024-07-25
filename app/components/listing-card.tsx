"use client";

import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { dummyImages } from "../data/dummy-images";
import { Listing } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { FavoriteButton } from "./favorite-button";
import { useFavorites } from "../context/favorite-context";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { EditButton, EditButton2 } from "./become-a-host/edit-button";

interface LisitngCardProps {
  data: Listing;
  isHost?: boolean;
  searchParams?: { filter: string };
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
                    width={500}
                    height={500}
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

            {isHost === true ? (
              <EditButton2 id={data.id} />
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
