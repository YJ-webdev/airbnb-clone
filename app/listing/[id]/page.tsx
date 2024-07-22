import prisma from "@/app/lib/db";

import { ReservePanel } from "./reserve-panel";
import { ListingMap } from "./listing-map";
import { PreviewImages } from "@/app/components/preview-images";

async function getListing(id: string) {
  const data = await prisma.listing.findUnique({ where: { id } });

  return data;
}

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getListing(params.id);
  if (!data) {
    return null;
  }

  return (
    <div className="relative mx-auto mt-6 max-w-7xl flex-col space-y-4 pb-28 md:pb-0">
      <h1 className="container text-xl font-semibold tracking-tight md:text-2xl md:tracking-normal">
        {data.title}
      </h1>
      <div className="flex">
        <div className="container -mr-2 flex flex-1 flex-col gap-6">
          <PreviewImages data={data} />

          <div className="space-y-1">
            <h2 className="text-[19px] md:text-[20px]">
              <span className="capitalize">{data.category} place</span> in{" "}
              <span className="underline">
                {data.city ? `${data.city}, ` : ""}
                {data.country}
              </span>
            </h2>
            <div className="flex min-w-[350px] items-center gap-2 text-sm md:text-base">
              <p>{data.guestCount} Guests</p>
              <p>·</p>
              <p>{data.roomCount} bedrooms</p>
              <p>·</p>
              <p>{data.bedCount} beds</p>
              <p>·</p>
              <p>{data.bathroomCount} bathrooms</p>
            </div>
          </div>

          <div>{data.description}</div>

          <div className="mb-16 flex flex-col space-y-3">
            <h2 className="text-[19px] md:text-[20px]">Where it located</h2>
            <ListingMap data={data} />
          </div>
        </div>

        <ReservePanel data={data} />
      </div>
    </div>
  );
}
