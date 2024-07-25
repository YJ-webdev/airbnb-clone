import getFavoriteListings from "@/app/action/update-favorite";
import { ListingCard } from "@/app/components/listing-card";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { Listing } from "@prisma/client";

interface FavoriteClientPageProps {
  user: UserWithRoleAndFavoriteIds;
}

export const FavoriteClientPage = async ({ user }: FavoriteClientPageProps) => {
  const favorites = await getFavoriteListings(user);

  return (
    <div className="container mb-28 mt-5 flex flex-col space-y-5">
      {favorites.length >= 1 ? (
        <h1 className="text-2xl font-semibold">
          You have {favorites.length} favorites
        </h1>
      ) : (
        <h1 className="text-2xl font-semibold">No favorites added yet</h1>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((item: Listing) => (
          <ListingCard key={item.id} data={item} user={user} />
        ))}
      </div>
    </div>
  );
};
