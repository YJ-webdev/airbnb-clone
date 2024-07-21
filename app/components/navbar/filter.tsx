"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { categoryData } from "../../data/category-data";
import { cn } from "@/lib/utils";

export const Filter = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="no-scrollbar mt-5 flex w-full justify-between gap-x-10 overflow-x-scroll">
      {categoryData.map((item) => (
        <Link
          key={item.id}
          href={pathname + "?" + createQueryString("filter", item.name)}
          className={cn(
            search === item.name
              ? "flex-shrink-0 border-black"
              : "flex-shrink-0 border-white opacity-70",
            "mb-5 flex flex-col items-center gap-y-3 border-b-2 pb-2 hover:opacity-100",
          )}
        >
          <div className="relative h-6 w-6">
            <Image
              src={item.imageUrl}
              alt="Category image"
              className="h-6 w-6"
              width={24}
              height={24}
            />
          </div>
          <p className="text-xs font-bold">{item.title}</p>
        </Link>
      ))}
    </div>
  );
};
