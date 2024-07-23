import getSession from "@/app/lib/get-session";
import { redirect } from "next/navigation";
import { LocationForm } from "./location-form";

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

  return (
    <div className="mb-32">
      <h2 className="mx-auto max-w-3xl pb-2 pl-6 pr-6 pt-5 text-2xl font-semibold transition-colors md:pl-0 md:pr-0 md:text-3xl">
        Where&apos;s your place located?{" "}
      </h2>
      <LocationForm params={params} />
    </div>
  );
}
