"use client";

import { cn } from "@/lib/utils";
import { Listing } from "@prisma/client";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/favorite-context";
import { UserWithRoleAndFavoriteIds } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { ToastLogin } from "./toast-login";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { useState } from "react";
import { LoginDialog } from "./form/login-dialog";
import { RegisterDialog } from "./form/register-dialog";
import { set } from "date-fns";

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

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

  const handleOpenRegister = () => {
    setOpenLoginDialog(false); // Close login dialog
    setOpenRegisterDialog(true); // Open register dialog
  };

  const handleOpenLogin = () => {
    setOpenLoginDialog(true); // Open login dialog
    setOpenRegisterDialog(false); // Close register dialog
  };

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
          <ToastLogin openDialog={() => setOpenLoginDialog(true)}>
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

      <Dialog open={openLoginDialog} onOpenChange={setOpenLoginDialog}>
        <DialogTrigger asChild>
          <span style={{ display: "none" }} />
        </DialogTrigger>

        <LoginDialog onOpenRegister={handleOpenRegister} />
      </Dialog>
      <Dialog open={openRegisterDialog} onOpenChange={setOpenRegisterDialog}>
        <RegisterDialog onOpenLogin={handleOpenLogin} />
      </Dialog>
    </>
  );
};
