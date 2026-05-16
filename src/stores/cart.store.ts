import { create } from "zustand";
import type { CartItem } from "../types/cart.types";
import type { Product } from "../types/product.types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  subtotal: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem(product, quantity = 1) {
    set((state) => {
      const existingItem = state.items.find((item) => item.product.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }

      return { items: [...state.items, { product, quantity }] };
    });
  },
  removeItem(productId) {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },
  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    }));
  },
  clearCart() {
    set({ items: [] });
  },
  getItemQuantity(productId) {
    return get().items.find((item) => item.product.id === productId)?.quantity ?? 0;
  },
  subtotal() {
    return get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  },
  totalItems() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
