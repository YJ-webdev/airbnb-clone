import Image from "next/image";
import React from "react";

interface LisitngCardProps {
  imageSrc: string | null;
  title: string;
  location: string;
  price: number;
}

export const ListingCard = ({
  imageSrc,
  title,
  location,
  price,
}: LisitngCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        {/* <Image
          src={``}
          alt="Image of home"
          fill
          className="mb-3 h-full rounded-lg object-cover"
        /> */}
      </div>
    </div>
  );
};
