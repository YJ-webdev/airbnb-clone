import { redirect } from "next/navigation";
import getSession from "@/app/lib/get-session";
import { ReviewForm } from "./review-form";

export default async function ReviewRoute({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  return <ReviewForm params={params} />;
}
