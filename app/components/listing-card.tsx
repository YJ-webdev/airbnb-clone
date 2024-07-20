"use client";

import { ChevronLeft, ChevronRight, Edit, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { dummyImages } from "../data/dummy-images";

interface LisitngCardProps {
  // imageSrc?: string[];
  location: string;
  price: number;
  country?: string;
  city?: string;
  category?: string;
  isHost?: boolean;
}

export const ListingCard = ({
  price,
  country,
  city,
  category,
  isHost,
}: LisitngCardProps) => {
  const [heart, setHeart] = useState(false);
  const [index, setIndex] = useState(0);

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
              />
            </div>
          ))}
        </div>
        {isHost === true ? (
          <button
            className="absolute right-5 top-5 z-20 h-7 w-7 cursor-pointer border-none bg-transparent p-0 transition-all active:scale-90"
            aria-label="Edit listing" // Optional but recommended for accessibility
          >
            <Edit
              className={
                "h-full w-full fill-white/50 text-white transition-all"
              }
              strokeWidth={1.5}
            />
            <p className="group text-sm font-semibold text-white">Edit</p>
          </button>
        ) : (
          <button
            onClick={handleHeart}
            className="absolute right-5 top-5 z-20 h-7 w-7 cursor-pointer border-none bg-transparent p-0 transition-all active:scale-90"
            aria-label="Add to favorites" // Optional but recommended for accessibility
          >
            <Heart
              className={`h-full w-full fill-white/50 text-white transition-all hover:fill-rose-500 ${heart ? "fill-rose-500" : ""}`}
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
          <span className="">{city} </span>
          <span>{country}</span>
        </h2>
        <h3>{category}</h3>
        <p>${price} / night</p>
      </div>
    </div>
  );
};
