import bakeryImg from "../assests/images/all-bakery-items.svg";
import beveragesImg from "../assests/images/all-bevrages.svg";
import oilGheeImg from "../assests/images/all-oil-ghee.svg";
import veggiesFruitsImg from "../assests/images/all-veggies-fruits.svg";
import dairyEggsImg from "../assests/images/eggs-red.svg";
import meatImg from "../assests/images/meat.svg";
import { ProductCategory, type Category } from "../types/product.types";

export const categories: Category[] = [
  {
    id: ProductCategory.FreshFruitsVegetables,
    name: "Fresh Fruits & Vegetable",
    description: "Fresh seasonal produce",
    accentClassName: "bg-green-50 border-green-200",
    imageUrl: veggiesFruitsImg,
  },
  {
    id: ProductCategory.CookingOilGhee,
    name: "Cooking Oil & Ghee",
    description: "Kitchen essentials",
    accentClassName: "bg-orange-50 border-orange-200",
    imageUrl: oilGheeImg,
  },
  {
    id: ProductCategory.MeatFish,
    name: "Meat & Fish",
    description: "Protein and seafood",
    accentClassName: "bg-red-50 border-red-200",
    imageUrl: meatImg,
  },
  {
    id: ProductCategory.BakerySnacks,
    name: "Bakery & Snacks",
    description: "Breads and quick bites",
    accentClassName: "bg-purple-50 border-purple-200",
    imageUrl: bakeryImg,
  },
  {
    id: ProductCategory.DairyEggs,
    name: "Dairy & Eggs",
    description: "Milk, butter, and eggs",
    accentClassName: "bg-yellow-50 border-yellow-200",
    imageUrl: dairyEggsImg,
  },
  {
    id: ProductCategory.Beverages,
    name: "Beverages",
    description: "Soft drinks and juices",
    accentClassName: "bg-sky-50 border-sky-200",
    imageUrl: beveragesImg,
  },
];
