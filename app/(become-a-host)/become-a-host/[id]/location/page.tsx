import { redirect } from "next/navigation";
import { LocationForm } from "./location-form";
import getSession from "@/app/lib/get-session";
import { getListingData } from "@/app/api/fetch-listing-data/listing";

export default async function LocationPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  const { listingData } = await getListingData(params.id);

  return (
    <div>
      <LocationForm
        params={params}
        userId={user.id as string}
        initialCountry={listingData?.country || undefined}
        initialState={listingData?.state || undefined}
        initialCity={listingData?.city || undefined}
        initialStreet={listingData?.locationValue || undefined}
        initialPostalCode={listingData?.postalCode || undefined}
        initialLat={listingData?.lat || undefined}
        initialLng={listingData?.lng || undefined}
      />
    </div>
  );
}
