import { PreviewImages } from "@/app/components/preview-images";
import { Listing, User } from "@prisma/client";

interface ReviewListingProps {
  data: Listing & { user: User };
}

export const ReviewListing = ({ data }: ReviewListingProps) => {
  const description = data.description;

  return (
    <div className="flex h-full w-full flex-col gap-5 md:flex-row">
      <PreviewImages data={data} />

      <div className="flex min-h-[45Dvh] flex-col space-y-4 md:flex-1">
        <div className="flex h-[100px] flex-col gap-3">
          <h3 className="flex items-baseline justify-between">
            <p className="text-base font-bold">
              {data.state ? `${data.state}, ` : ""} {data.country}
            </p>
            <p className="text-sm uppercase">{data.category}</p>
          </h3>

          <div className="flex items-baseline justify-between">
            <p className="rounded-full px-2 py-1 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)]">
              ${data.price} / night
            </p>
            <p>Hosted by {data.user.name}</p>
          </div>

          <div className="flex min-w-[350px] items-center gap-2">
            <p className="w-full text-center tracking-wide sm:text-left">
              {`${data.guestCount} Guests ·  ${data.roomCount} bedrooms ·  
            ${data.bedCount} beds ·  ${data.bathroomCount} bathrooms`}
            </p>
          </div>
        </div>
        <div className="relative flex flex-1 flex-col gap-3 rounded-lg border p-5 shadow-[0px_1px_3px_1px_rgba(0,0,0,0.1)]">
          <h2 className="">&quot;{data.title}&quot;</h2>
          <p className="">{description}</p>
        </div>
      </div>
    </div>
  );
};
