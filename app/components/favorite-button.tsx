import { cn } from "@/lib/utils";
import { Listing } from "@prisma/client";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/favorite-context";
import { UserWithRoleAndFavoriteIds } from "@/types";

interface FavoriteButtonProps {
  data: Listing;
  position?: string;
  user?: UserWithRoleAndFavoriteIds;
  isFavorite: boolean;
  fillColor?: string;
  favorite: boolean;
  setFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  optimisticFavorite: boolean;
  setOptimisticFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleFavorite?: (listingId: string) => void;
}

export const FavoriteButton = ({
  position,
  user,
  data,
  favorite,
  optimisticFavorite,
  setOptimisticFavorite,
  fillColor,
  onToggleFavorite,
}: FavoriteButtonProps) => {
  const { toggleFavorite } = useFavorites();

  const handleFavoriteToggle = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setOptimisticFavorite(!optimisticFavorite);

    try {
      await toggleFavorite(user?.id!, data.id);
      onToggleFavorite?.(data.id);
    } catch (error) {
      setOptimisticFavorite(favorite);
      console.error("Failed to toggle favorite status:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleFavoriteToggle}
      className={cn(
        "z-10 h-7 w-7 cursor-pointer border-none bg-transparent p-0 transition-all active:scale-90",
        position ?? "absolute right-5 top-5",
      )}
    >
      <Heart
        className={`h-full w-full text-white transition-all hover:fill-rose-500 ${optimisticFavorite ? "fill-rose-500" : fillColor ?? "fill-white/50"}`}
        strokeWidth={1.5}
      />
    </button>
  );
};
