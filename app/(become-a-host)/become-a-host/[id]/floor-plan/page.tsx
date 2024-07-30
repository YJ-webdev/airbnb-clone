import { redirect } from "next/navigation";
import { FloorFrom } from "./floor-form";
import getSession from "@/app/lib/get-session";
import { getListingData } from "@/app/api/fetch-listing-data/listing";

export default async function FloorPlanPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return redirect("/login");
  }

  const { listingData } = await getListingData(params.id);

  return (
    <div>
      <FloorFrom
        params={params}
        userId={user.id as string}
        initialGuestCount={listingData?.guestCount || 0}
        initialRoomCount={listingData?.roomCount || 0}
        initialBedCount={listingData?.bedCount || 0}
        initialBathroomCount={listingData?.bathroomCount || 0}
      />
    </div>
  );
}
