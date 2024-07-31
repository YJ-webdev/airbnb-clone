import { redirect } from "next/navigation";
import { PriceForm } from "./price-form";
import getSession from "@/app/lib/get-session";
import { getListingData } from "@/app/api/fetch-listing-data/listing";

export default async function PricePage({
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
    <PriceForm
      params={params}
      userId={user.id as string}
      initialPrice={listingData?.enteredPrice || 0}
    />
  );
}
