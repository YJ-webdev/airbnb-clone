import getSession from "@/app/lib/get-session";
import { redirect } from "next/navigation";
import isHost from "@/app/action/host-vaildation";

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

  return (
    <div className="container mx-auto flex max-w-[1340px] flex-col">
      <p>Edit: {params.id}</p>
      <p>User: {user.id}</p>
    </div>
  );
}
