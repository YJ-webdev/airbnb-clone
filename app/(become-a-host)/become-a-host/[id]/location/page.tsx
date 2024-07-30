import { redirect } from "next/navigation";
import { LocationForm } from "./location-form";
import getSession from "@/app/lib/get-session";

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
    <div>
      <LocationForm params={params} userId={user.id as string} />
    </div>
  );
}
