import { create } from "zustand";
import { mockApi } from "../lib/api/mockApi";
import type { Category, Product, ProductCategory, ProductFilters } from "../types/product.types";

interface ProductState {
  products: Product[];
  categories: Category[];
  selectedCategory: ProductCategory | null;
  filters: ProductFilters;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  fetchCatalog: () => Promise<void>;
  setCategory: (category: ProductCategory | null) => void;
  setFilters: (filters: ProductFilters) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

const emptyFilters: ProductFilters = {
  categories: [],
  brands: [],
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  categories: [],
  selectedCategory: null,
  filters: emptyFilters,
  searchQuery: "",
  isLoading: false,
  error: null,
  async fetchCatalog() {
    // Mock API call. The delay lives in mockApi so UI loading states can be tested.
    set({ isLoading: true, error: null });
    try {
      const [products, categories] = await Promise.all([
        mockApi.getProducts(),
        mockApi.getCategories(),
      ]);
      set({ products, categories, isLoading: false });
    } catch {
      set({ error: "Unable to load products. Please try again.", isLoading: false });
    }
  },
  setCategory(category) {
    set({ selectedCategory: category });
  },
  setFilters(filters) {
    set({ filters });
  },
  setSearchQuery(query) {
    set({ searchQuery: query });
  },
  clearFilters() {
    set({ filters: emptyFilters, selectedCategory: null, searchQuery: "" });
  },
}));
