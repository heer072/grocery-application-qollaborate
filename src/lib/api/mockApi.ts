import { categories } from "../../data/categories";
import { products } from "../../data/products";

const MOCK_DELAY_MS = 450;

export const wait = (delay = MOCK_DELAY_MS): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, delay);
  });

export const mockApi = {
  async getProducts() {
    await wait();
    return products;
  },
  async getCategories() {
    await wait();
    return categories;
  },
};
