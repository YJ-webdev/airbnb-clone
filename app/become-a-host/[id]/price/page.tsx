import getSession from "@/app/lib/get-session";
import { redirect } from "next/navigation";
import { PriceForm } from "./price-form";

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

  return <PriceForm params={params} />;
}
