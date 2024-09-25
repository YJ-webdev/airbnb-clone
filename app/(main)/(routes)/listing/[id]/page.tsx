import prisma from "@/app/lib/db";
import getSession from "@/app/lib/get-session";

import { ListingContent } from "./listing-content";
import { DatePickProvider } from "@/app/context/date-pick-context";
import { GuestCountProvider } from "@/app/context/guest-count-context";

async function getListing(id: string) {
  const data = await prisma.listing.findUnique({
    where: { id },
    include: {
      reservations: {
        select: {
          startDate: true,
          endDate: true,
        },
      },
    },
  });
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
      <GuestCountProvider maxGuests={data.guestCount!}>
        <ListingContent data={data} user={user} params={params} />
      </GuestCountProvider>
    </DatePickProvider>
  );
}
