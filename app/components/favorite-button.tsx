import { cn } from "@/lib/utils";
import { Listing, UserRole } from "@prisma/client";
import { Heart } from "lucide-react";
import { DefaultSession } from "next-auth";
import { useFavorites } from "../context/favorite-context";

interface FavoriteButtonProps {
  data: Listing;
  position?: string;
  user?: {
    role: UserRole;
  } & DefaultSession["user"];
  isFavorite: boolean;
  fillColor?: string;
  favorite: boolean;
  setFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  optimisticFavorite: boolean;
  setOptimisticFavorite: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FavoriteButton = ({
  position,
  user,
  data,
  favorite,
  optimisticFavorite,
  setOptimisticFavorite,
  fillColor,
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
