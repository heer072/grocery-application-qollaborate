export enum ProductCategory {
  FreshFruitsVegetables = "fresh-fruits-vegetables",
  CookingOilGhee = "cooking-oil-ghee",
  MeatFish = "meat-fish",
  BakerySnacks = "bakery-snacks",
  DairyEggs = "dairy-eggs",
  Beverages = "beverages",
  Groceries = "groceries",
}

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
  accentClassName: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  unit: string;
  price: number;
  description: string;
  imageUrl?: string;
  rating: number;
  isPopular?: boolean;
  isExclusiveOffer?: boolean;
  inStock: boolean;
  brand?: string;
  nutrition?: string;
}

export interface ProductFilters {
  categories: ProductCategory[];
  brands: string[];
  minPrice?: number;
  maxPrice?: number;
}
