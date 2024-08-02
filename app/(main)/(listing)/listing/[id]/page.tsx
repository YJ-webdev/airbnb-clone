import prisma from "@/app/lib/db";
import getSession from "@/app/lib/get-session";

import { ReservePanel } from "./reserve-panel";
import { ListingMap } from "./listing-map";
import { PreviewImages } from "@/app/components/preview-images";

import { SocialShare } from "@/app/components/social-share";
import Calendar2 from "./calendar-expanded";
import { AdultAndChildren } from "./adult-and-children";
import { DatePickProvider } from "@/app/context/date-pick-context";

async function getListing(id: string) {
  const data = await prisma.listing.findUnique({ where: { id } });
  return data;
}

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user = session?.user;
  const data = await getListing(params.id);

  if (!data) {
    return null;
  }

  return (
    <DatePickProvider>
      <div className="mx-auto mt-6 flex max-w-7xl">
        <div className="mb-10 flex flex-1 flex-col gap-5 px-5 lg:min-w-[700px]">
          <h1 className="-mb-1 text-xl font-semibold tracking-tight md:tracking-normal lg:text-2xl">
            {data.title}
          </h1>
          <div className="relative flex w-[89Dvw] md:w-full">
            <div className="flex w-full flex-col gap-10">
              <PreviewImages data={data} />
              <div className="w-full space-y-2">
                <div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
                  <h2 className="text-[19px] font-semibold md:text-[20px]">
                    <span className="capitalize">{data.category} place</span> in{" "}
                    <span className="underline">
                      {data.state ? `${data.state}, ` : ""}
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
              <p>{data.description}</p>
              <div className="flex flex-col space-y-3">
                <h3 className="text-[19px] font-semibold md:text-[20px]">
                  Where it located
                </h3>
                <ListingMap lat={data?.lat!} lng={data?.lng!} />
              </div>
              <div className="flex flex-col space-y-3">
                <h3 className="text-[19px] font-semibold md:text-[20px]">
                  Pick Your Stay Dates
                </h3>

                <Calendar2 />
              </div>
              <div className="mb-16 flex flex-col space-y-3 lg:mb-0 lg:hidden">
                <h3 className="text-[19px] font-semibold md:text-[20px]">
                  Select Number of Adults and Children
                </h3>
                <div className="container">
                  <AdultAndChildren user={user} data={data} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <form>
        <input type="hidden" name="userId" value={user?.id} />
        <input type="hidden" name="listingId" value={data.id} />
        <input
          type="hidden"
          name="startDate"
          value={new Date().toISOString()}
        />
        <input type="hidden" name="endDate" value={new Date().toISOString()} />
        <input type="hidden" name="totalPrice" value={0} /> */}

        <ReservePanel data={data} user={user} />
        {/* </form> */}
      </div>
    </DatePickProvider>
  );
}
