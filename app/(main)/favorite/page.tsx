import prisma from "@/app/lib/db";
import getSession from "@/app/lib/get-session";
import { redirect } from "next/navigation";
import { FavoriteClientPage } from "./client-page";
import getFavoriteListings from "@/app/action/update-favorite";

export default async function FavoritePage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/?callbackUrl=/favorite");
  }

  const favorites = await getFavoriteListings(user);

  return <FavoriteClientPage user={user} favorites={favorites} />;
}
