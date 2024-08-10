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
        initialCountry={listingData?.country || ""}
        initialState={listingData?.state || ""}
        initialCity={listingData?.city || ""}
        initialStreet={listingData?.locationValue || ""}
        initialPostalCode={listingData?.postalCode || ""}
        initialLat={listingData?.lat || undefined}
        initialLng={listingData?.lng || undefined}
      />
    </div>
  );
}
