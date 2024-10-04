"use client";

import { cn } from "@/lib/utils";
import { Listing } from "@prisma/client";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/favorite-context";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { ToastLogin } from "./toast-login";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { useState } from "react";
import { AuthDialog } from "./form/auth-dialog";

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
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFavoriteToggle = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to save your favorite.",
        action: (
          <ToastLogin openDialog={() => setIsDialogOpen(true)}>
            Log in
          </ToastLogin>
        ),
      });
      return;
    }

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
    <>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <span style={{ display: "none" }} />
        </DialogTrigger>
        <DialogContent className="flex max-h-[75%] flex-col overflow-hidden p-0">
          <AuthDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};
