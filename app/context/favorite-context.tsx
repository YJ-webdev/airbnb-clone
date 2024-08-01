"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { updateFavorite } from "../actions/update-favorite";

interface FavoritesContextProps {
  favoriteIds: string[];
  toggleFavorite: (userId: string, listingId: string) => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(
  undefined,
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({
  children,
  initialFavoriteIds,
}: {
  children: ReactNode;
  initialFavoriteIds: string[];
}) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(initialFavoriteIds);

  const toggleFavorite = async (userId: string, listingId: string) => {
    try {
      const updatedUser = await updateFavorite(userId, listingId);

      if (!updatedUser) {
        return;
      }

      setFavoriteIds(updatedUser.favoriteIds);
    } catch (error) {
      console.error("Failed to toggle favorite status:", error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
