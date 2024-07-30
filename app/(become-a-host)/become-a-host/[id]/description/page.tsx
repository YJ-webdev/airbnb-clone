import { redirect } from "next/navigation";
import { DescriptionForm } from "./description-form";
import { auth } from "@/auth";

export default async function DescriptionPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <DescriptionForm params={params} userId={user.id as string} />
    </div>
  );
}
