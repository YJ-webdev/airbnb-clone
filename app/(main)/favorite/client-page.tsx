import getFavoriteListings from "@/app/action/update-favorite";
import { ListingCard } from "@/app/components/listing-card";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { Listing } from "@prisma/client";
import { FolderSearch } from "lucide-react";

interface FavoriteClientPageProps {
  user: UserWithRoleAndFavoriteIds;
}

export const FavoriteClientPage = async ({ user }: FavoriteClientPageProps) => {
  const favorites = await getFavoriteListings(user);

  return (
    <div className="container mb-28 mt-5 flex flex-col space-y-5">
      <h1 className="text-2xl font-semibold">
        You have {favorites.length} favorites
      </h1>

      {favorites.length === 0 && (
        <div className="flex h-[50vh] flex-col">
          <div className="mx-auto flex flex-1 translate-y-1/3 flex-col space-y-8">
            <FolderSearch strokeWidth={1.5} size={36} className="mx-auto" />
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold">
                Your wishlist is empty.
              </h1>
              <p className="text-foreground/50">
                Explorer some listings and add them to your favorites.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((item: Listing) => (
          <ListingCard key={item.id} data={item} user={user} />
        ))}
      </div>
    </div>
  );
};
