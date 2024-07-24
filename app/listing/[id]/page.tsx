import prisma from "@/app/lib/db";
import getSession from "@/app/lib/get-session";
import ClientPage from "./client-page";
// Client component

async function getListing(id: string) {
  const data = await prisma.listing.findUnique({ where: { id } });
  return data;
}

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user = session?.user;
  const data = await getListing(params.id);

  if (!data) {
    return null;
  }

  return <ClientPage data={data} user={user} />;
}
