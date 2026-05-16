import { create } from "zustand";
import type { User } from "../types/user.types";

interface AuthState {
  user: User | null;
  pendingIdentifier: string | null;
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  isLoading: boolean;
  login: (identifier: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  verifyOtp: (code: string) => Promise<void>;
  completeOnboarding: () => void;
  logout: () => void;
}

const createMockUser = (name: string, identifier: string): User => ({
  id: crypto.randomUUID(),
  name,
  email: identifier.includes("@") ? identifier : `${identifier.replace(/\D/g, "")}@phone.local`,
  phone: identifier.includes("@") ? undefined : identifier,
});

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  pendingIdentifier: null,
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  isLoading: false,
  async login(identifier) {
    set({ isLoading: true });
    await new Promise((resolve) => {
      window.setTimeout(resolve, 400);
    });
    // Simulated auth: store the identifier and let OTP verification complete login.
    set({
      pendingIdentifier: identifier,
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },
  async loginWithEmail(email) {
    set({ isLoading: true });
    await new Promise((resolve) => {
      window.setTimeout(resolve, 400);
    });
    set({
      user: createMockUser("Grocery Customer", email),
      pendingIdentifier: null,
      isAuthenticated: true,
      isLoading: false,
    });
  },
  async signup(name, email) {
    set({ isLoading: true });
    await new Promise((resolve) => {
      window.setTimeout(resolve, 400);
    });
    set({
      user: createMockUser(name, email),
      isAuthenticated: true,
      isLoading: false,
    });
  },
  async verifyOtp() {
    set({ isLoading: true });
    await new Promise((resolve) => {
      window.setTimeout(resolve, 400);
    });
    // Simulated auth: any valid 4-digit OTP creates a local mock user.
    set((state) => ({
      user: createMockUser("Grocery Customer", state.pendingIdentifier ?? "guest@nectar.local"),
      isAuthenticated: true,
      pendingIdentifier: null,
      isLoading: false,
    }));
  },
  completeOnboarding() {
    set({ hasCompletedOnboarding: true });
  },
  logout() {
    set({ user: null, pendingIdentifier: null, isAuthenticated: false });
  },
}));
