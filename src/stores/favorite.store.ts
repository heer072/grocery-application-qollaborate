import { create } from "zustand";

interface FavoriteState {
  favoriteProductIds: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favoriteProductIds: [],
  toggleFavorite(productId) {
    set((state) => {
      const exists = state.favoriteProductIds.includes(productId);
      return {
        favoriteProductIds: exists
          ? state.favoriteProductIds.filter((id) => id !== productId)
          : [...state.favoriteProductIds, productId],
      };
    });
  },
  isFavorite(productId) {
    return get().favoriteProductIds.includes(productId);
  },
  clearFavorites() {
    set({ favoriteProductIds: [] });
  },
}));
