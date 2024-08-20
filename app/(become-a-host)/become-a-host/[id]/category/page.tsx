import { redirect } from "next/navigation";

import getSession from "@/app/lib/get-session";
import { EditCategoryForm } from "./category-form";
import { getListingData } from "@/app/api/fetch-listing-data/listing";

export default async function CategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user = session?.user;

  if (!user || !user.id) {
    return redirect("/");
  }

  const { listingData } = await getListingData(params.id);
  const initialCategory = listingData?.category;

  return (
    <div className="pt-20">
      <h2 className="mx-auto mb-5 max-w-2xl p-5 text-2xl font-semibold tracking-tight transition-colors md:text-3xl">
        Which of these best describes your home?
      </h2>

      <EditCategoryForm
        userId={user.id}
        params={params}
        initialCategory={initialCategory || ""}
      />
    </div>
  );
}
