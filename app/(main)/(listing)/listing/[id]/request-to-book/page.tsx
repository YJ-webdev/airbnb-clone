import RequestToBook from "./request-to-book";
import getSession from "@/app/lib/get-session";
import prisma from "@/app/lib/db";
import { redirect } from "next/navigation";

export default async function RequestToBookPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await prisma.listing.findUnique({ where: { id: params.id } });
  const session = await getSession();
  const user = session?.user;

  if (!user) redirect(`/listing/${params.id}`);
  if (!data) redirect(`/not-found`);

  return (
    <>
      <RequestToBook data={data} user={user} />
    </>
  );
}
