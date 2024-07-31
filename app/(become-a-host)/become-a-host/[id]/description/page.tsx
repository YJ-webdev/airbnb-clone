import { redirect } from "next/navigation";
import { DescriptionForm } from "./description-form";
import { auth } from "@/auth";
import { getListingData } from "@/app/api/fetch-listing-data/listing";

export default async function DescriptionPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  const { listingData } = await getListingData(params.id);

  const initialTitle = listingData?.title;
  const initialDescription = listingData?.description;

  return (
    <div>
      <DescriptionForm
        params={params}
        userId={user.id as string}
        initialTitle={initialTitle || ""}
        initialDescription={initialDescription || ""}
      />
    </div>
  );
}
