import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LisitngCardProps {
  imageSrc: string[];
  location: string;
  price: number;
  country?: string;
  city?: string;
}

export const ListingCard = ({
  imageSrc,
  location,
  price,
  country,
  city,
}: LisitngCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="relative grid h-80 grid-cols-4 gap-4">
        <Image
          src={imageSrc[0]}
          alt="Image of home"
          height={500}
          width={500}
          className="col-1 mb-3 h-full rounded-lg object-cover"
        />
      </div>

      <Link href={"/"}>
        <h3>
          {city}
          {country}
        </h3>
      </Link>
    </div>
  );
};
