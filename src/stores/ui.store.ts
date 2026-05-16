import { create } from "zustand";

export type BottomTab = "shop" | "explore" | "cart" | "favourite" | "account";

interface UiState {
  activeBottomTab: BottomTab;
  isFilterOpen: boolean;
  setActiveBottomTab: (tab: BottomTab) => void;
  openFilter: () => void;
  closeFilter: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeBottomTab: "shop",
  isFilterOpen: false,
  setActiveBottomTab(tab) {
    set({ activeBottomTab: tab });
  },
  openFilter() {
    set({ isFilterOpen: true });
  },
  closeFilter() {
    set({ isFilterOpen: false });
  },
}));
