import { create } from "zustand";
import type { DeliveryLocation } from "../types/user.types";

interface LocationState {
  selectedLocation: DeliveryLocation | null;
  setLocation: (location: DeliveryLocation) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedLocation: null,
  setLocation(location) {
    set({ selectedLocation: location });
  },
  clearLocation() {
    set({ selectedLocation: null });
  },
}));
