import getSession from "@/app/lib/get-session";
import { redirect } from "next/navigation";
import { DescriptionForm } from "./description-form";

export default async function DescriptionRoute({
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
    <div className="flex flex-col">
      <DescriptionForm params={params} />
    </div>
  );
}
