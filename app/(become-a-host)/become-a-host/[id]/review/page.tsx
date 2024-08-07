import { redirect } from "next/navigation";
import { ReviewForm } from "./review-form";
import prisma from "@/app/lib/db";
import getSession from "@/app/lib/get-session";

export default async function ReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  const data = await prisma.listing.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: true,
    },
  });

  if (!data) {
    return null; // Return null to avoid further execution
  }

  return <ReviewForm params={params} data={data} userId={user.id as string} />;
}
