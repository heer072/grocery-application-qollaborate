import { create } from "zustand";
import { OrderStatus, type OrderSummary } from "../types/order.types";

interface CheckoutState {
  orderStatus: OrderStatus;
  summary: OrderSummary | null;
  placeOrder: (summary: OrderSummary) => Promise<OrderStatus>;
  resetOrder: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  orderStatus: OrderStatus.Idle,
  summary: null,
  async placeOrder(summary) {
    set({ orderStatus: OrderStatus.Loading, summary });
    await new Promise((resolve) => {
      window.setTimeout(resolve, 650);
    });

    // Simulated checkout result for the frontend-only assignment.
    const status = OrderStatus.Success;
    set({ orderStatus: status });
    return status;
  },
  resetOrder() {
    set({ orderStatus: OrderStatus.Idle, summary: null });
  },
}));
