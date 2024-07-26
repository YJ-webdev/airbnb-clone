import { redirect } from "next/navigation";
import isHost from "@/app/action/host-vaildation";
import getSession from "@/app/lib/get-session";
import prisma from "@/app/lib/db";

export default async function EditPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  const user = session?.user;
  const userId = user?.id;

  if (!userId || !user || !params.id) {
    return redirect("/");
  }

  const userHost = await isHost({
    userId,
    listingId: params.id,
  });

  if (!userHost) {
    redirect("/"); // Redirect to home if the user is not the host of the listing
    return null;
  }

  const data = await prisma.listing.findUnique({ where: { id: params.id } });

  return (
    <>
      <div className="mx-auto flex max-w-[1280px] flex-col p-5">
        <p>Edit: {params.id}</p>
        <p>User: {user.id}</p>
      </div>
    </>
  );
}
