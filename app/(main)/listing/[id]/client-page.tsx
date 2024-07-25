"use client";

import { useEffect } from "react";
import { useContentWidth } from "@/app/context/ContentWidthContext";
import { ReservePanel } from "./reserve-panel";
import { ListingMap } from "./listing-map";
import { PreviewImages } from "@/app/components/preview-images";
import { Calendar } from "./calendar";
import { Listing } from "@prisma/client";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { SocialShare } from "@/app/components/social-share";

interface ListingClientProps {
  data: Listing;
  user?: UserWithRoleAndFavoriteIds;
}

const ClientPage: React.FC<ListingClientProps> = ({ data, user }) => {
  const { setContentWidth } = useContentWidth();

  useEffect(() => {
    setContentWidth("1280px"); // Example width for max-w-7xl

    return () => {
      setContentWidth("100%"); // Reset to default width on unmount
    };
  }, [setContentWidth]);

  return (
    <div className="mx-auto mt-6 flex max-w-7xl pb-28 md:pb-0">
      <div className="flex flex-1 flex-col gap-5 px-5">
        <h1 className="-mb-1 text-xl font-semibold tracking-tight md:tracking-normal lg:text-2xl">
          {data.title}
        </h1>
        <div className="relative flex w-full">
          <div className="mb-32 flex w-full flex-col gap-6">
            <PreviewImages data={data} />
            <div className="w-full space-y-2">
              <div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
                <h2 className="text-[19px] md:text-[20px]">
                  <span className="capitalize">{data.category} place</span> in{" "}
                  <span className="underline">
                    {data.city ? `${data.city}, ` : ""}
                    {data.country}
                  </span>
                </h2>
                <div className="lg:hidden">
                  <SocialShare data={data} />
                </div>
              </div>
              <div className="flex min-w-[350px] items-center gap-2 text-center text-sm text-foreground md:text-base">
                <p className="w-full text-center tracking-wide sm:text-left">
                  {`${data.guestCount} Guests ·  ${data.roomCount} bedrooms ·  
                ${data.bedCount} beds ·  ${data.bathroomCount} bathrooms`}
                </p>
              </div>
            </div>
            <div>{data.description}</div>
            <div className="flex flex-col space-y-3">
              <h2 className="text-[19px] md:text-[20px]">Where it located</h2>
              <ListingMap data={data} />
            </div>
            <div className="flex flex-col space-y-3">
              <h2 className="text-[19px] md:text-[20px]">
                Pick Your Stay Dates
              </h2>
              <Calendar />
            </div>
          </div>
        </div>
      </div>
      <ReservePanel data={data} isHost={data.userId === user?.id} user={user} />
    </div>
  );
};

export default ClientPage;
