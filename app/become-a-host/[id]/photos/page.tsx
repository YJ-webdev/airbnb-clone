import getSession from "@/app/lib/get-session";
import { redirect } from "next/navigation";
import { ImageForm } from "./image-form";

export default async function PhotosPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  return <ImageForm params={params} />;
}
