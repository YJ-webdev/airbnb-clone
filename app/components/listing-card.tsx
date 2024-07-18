import Image from "next/image";
import React from "react";

interface LisitngCardProps {
  imageSrc: string[];
  location: string;
  price: number;
}

export const ListingCard = ({
  imageSrc,
  location,
  price,
}: LisitngCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={imageSrc[0]}
          alt="Image of home"
          fill
          className="mb-3 h-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
};
