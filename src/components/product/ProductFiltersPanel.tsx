import { PrimaryButton } from "../common/PrimaryButton";
import type { Category, ProductCategory } from "../../types/product.types";

export interface ProductFilterValues {
  categories: ProductCategory[];
  brands: string[];
}

interface ProductFiltersPanelProps {
  categories: Category[];
  brands: string[];
  values: ProductFilterValues;
  onChange: (values: ProductFilterValues) => void;
  onApply: () => void;
}

interface FilterCheckboxProps {
  checked: boolean;
  label: string;
  onChange: () => void;
}

export const defaultProductFilters: ProductFilterValues = {
  categories: [],
  brands: [],
};

function FilterCheckbox({ checked, label, onChange }: FilterCheckboxProps) {
  return (
    <label className="flex items-center gap-3 text-sm text-ink-900">
      <input
        checked={checked}
        className="size-5 rounded-md border-ink-200 accent-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        type="checkbox"
        onChange={onChange}
      />
      <span className={checked ? "text-brand-600" : "text-ink-900"}>{label}</span>
    </label>
  );
}

export function ProductFiltersPanel({
  brands,
  categories,
  onApply,
  onChange,
  values,
}: ProductFiltersPanelProps) {
  const toggleCategory = (categoryId: ProductCategory) => {
    const nextCategories = values.categories.includes(categoryId)
      ? values.categories.filter((id) => id !== categoryId)
      : [...values.categories, categoryId];

    onChange({ ...values, categories: nextCategories });
  };

  const toggleBrand = (brand: string) => {
    const nextBrands = values.brands.includes(brand)
      ? values.brands.filter((item) => item !== brand)
      : [...values.brands, brand];

    onChange({ ...values, brands: nextBrands });
  };

  return (
    <div className="flex min-h-[560px] flex-col rounded-3xl bg-ink-100 p-6">
      <fieldset>
        <legend className="mb-5 text-xl font-bold text-ink-900">Categories</legend>
        <div className="space-y-4">
          {categories.map((category) => (
            <FilterCheckbox
              checked={values.categories.includes(category.id)}
              key={category.id}
              label={category.name}
              onChange={() => toggleCategory(category.id)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="mb-5 text-xl font-bold text-ink-900">Brand</legend>
        <div className="space-y-4">
          {brands.map((brand) => (
            <FilterCheckbox
              checked={values.brands.includes(brand)}
              key={brand}
              label={brand}
              onChange={() => toggleBrand(brand)}
            />
          ))}
        </div>
      </fieldset>

      <div className="mt-auto pt-8">
        <PrimaryButton onClick={onApply}>Apply Filter</PrimaryButton>
      </div>
    </div>
  );
}
