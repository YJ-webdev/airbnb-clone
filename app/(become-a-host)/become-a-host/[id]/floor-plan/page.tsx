import { redirect } from "next/navigation";
import { FloorFrom } from "./floor-form";
import getSession from "@/app/lib/get-session";

export default async function FloorPlanPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return redirect("/login");
  }

  return (
    <div>
      <FloorFrom params={params} userId={user.id as string} />
    </div>
  );
}
