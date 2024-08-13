import { redirect } from "next/navigation";
import getFavoriteListings from "@/app/actions/update-favorite";
import getSession from "@/app/lib/get-session";

import { ListingCard } from "@/app/components/listing-card";

import { UserWithRoleAndFavoriteIds } from "@/types";
import { Listing } from "@prisma/client";
import { FolderSearch, Scroll } from "lucide-react";

export default async function FavoritePage() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/?callbackUrl=/favorite");
  }

  const favorites = await getFavoriteListings(user);

  return (
    <div className="container mt-10 flex min-h-[80vh] flex-col">
      <header className="mb-8 flex flex-col items-baseline justify-center">
        <h1 className="text-2xl font-semibold">
          {favorites.length === 0
            ? "You have no wishlists"
            : `You have ${favorites.length} ${favorites.length === 1 ? "wishlist" : "wishlists"}`}
        </h1>
        <p>You can add as much as you want.</p>
      </header>

      {favorites.length === 0 ? (
        <div className="flex h-[70vh] w-full items-center justify-center rounded-lg bg-zinc-50 text-center">
          <div className="flex flex-col items-center gap-2">
            <Scroll strokeWidth={1.5} size={24} />
            <p className="text-lg font-semibold">Your wishlist is empty</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-7 pb-10 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((item: Listing) => (
            <ListingCard key={item.id} data={item} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
