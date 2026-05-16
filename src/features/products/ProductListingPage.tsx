import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmptyState } from "../../components/common/EmptyState";
import { SearchInput } from "../../components/common/SearchInput";
import { SkeletonCard } from "../../components/common/SkeletonCard";
import {
  defaultProductFilters,
  ProductFiltersPanel,
  type ProductFilterValues,
} from "../../components/product/ProductFiltersPanel";
import { ProductCard } from "../../components/product/ProductCard";
import { useProductStore } from "../../stores/product.store";
import { ProductCategory } from "../../types/product.types";
import backArrow from "../../assests/images/back-arrow.svg";
import filterIcon from "../../assests/images/filter-icn.svg";

function isProductCategory(value: string | undefined): value is ProductCategory {
  return Object.values(ProductCategory).includes(value as ProductCategory);
}

function getCategoryName(categories: { id: ProductCategory; name: string }[], categoryId: ProductCategory) {
  return categories.find((category) => category.id === categoryId)?.name ?? "Products";
}

export function ProductListingPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const categories = useProductStore((state) => state.categories);
  const fetchCatalog = useProductStore((state) => state.fetchCatalog);
  const isLoading = useProductStore((state) => state.isLoading);
  const products = useProductStore((state) => state.products);
  const setStoreFilters = useProductStore((state) => state.setFilters);
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (products.length === 0 || categories.length === 0) {
      void fetchCatalog();
    }
  }, [categories.length, fetchCatalog, products.length]);

  const selectedCategory = isProductCategory(categoryId) ? categoryId : null;
  const brands = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) => product.brand)
          .filter((brand): brand is string => Boolean(brand)),
      ),
    );
  }, [products]);
  const startingFilters = useMemo<ProductFilterValues>(() => {
    return {
      ...defaultProductFilters,
      categories: selectedCategory ? [selectedCategory] : [],
    };
  }, [selectedCategory]);
  const [draftFilters, setDraftFilters] = useState<ProductFilterValues>(startingFilters);
  const [activeFilters, setActiveFilters] = useState<ProductFilterValues>(startingFilters);

  useEffect(() => {
    setDraftFilters(startingFilters);
    setActiveFilters(startingFilters);
  }, [startingFilters]);

  const pageTitle =
    activeFilters.categories.length === 0
      ? "Products"
      : activeFilters.categories
          .map((categoryId) => getCategoryName(categories, categoryId))
          .join(", ");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeFilters.categories.length === 0 ||
        activeFilters.categories.includes(product.category);
      const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesBrand =
        activeFilters.brands.length === 0 ||
        Boolean(product.brand && activeFilters.brands.includes(product.brand));

      return matchesCategory && matchesSearch && matchesBrand;
    });
  }, [activeFilters, products, searchText]);

  const applyFilters = () => {
    setActiveFilters(draftFilters);
    setStoreFilters({
      categories: draftFilters.categories,
      brands: draftFilters.brands,
    });
    setIsFilterOpen(false);
  };

  return (
    <div className="px-6 py-6 lg:px-0 lg:py-10">
      <div className="mx-auto max-w-md lg:max-w-7xl">
        <header className="flex items-center justify-between gap-4">
          <button
            aria-label="Go back"
            className="flex size-10 items-center justify-center rounded-full text-xl font-semibold text-ink-900 transition hover:bg-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            type="button"
            onClick={() => navigate(-1)}
          >
            <img src={backArrow} alt="" aria-hidden="true" />
          </button>
          <h1 className="text-center text-xl font-bold text-ink-900 lg:text-left lg:text-4xl">
            {pageTitle}
          </h1>
          <button
            aria-label="Open filters"
            className="flex md:hidden size-10 items-center justify-center rounded-full text-sm font-semibold text-ink-900 transition hover:bg-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            type="button"
            onClick={() => setIsFilterOpen(true)}
          >
            <img src={filterIcon} alt="" aria-hidden="true" />
          </button>
        </header>

        <div className="mt-5">
          <SearchInput
            placeholder="Search products"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            onClear={() => setSearchText("")}
          />
        </div>

        <div className="mt-8 lg:grid lg:grid-cols-[300px_1fr] lg:gap-8">
          <aside className="hidden lg:block">
            <ProductFiltersPanel
              brands={brands}
              categories={categories}
              values={draftFilters}
              onApply={applyFilters}
              onChange={setDraftFilters}
            />
          </aside>

          <section>
            {isLoading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No products found"
                description="Try another category or clear your search text."
              />
            )}
          </section>
        </div>
      </div>

      {isFilterOpen ? (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex h-full flex-col overflow-y-auto bg-white" role="dialog" aria-modal="true">
            <div className="flex items-center justify-between px-6 py-5">
              <button
                aria-label="Close filters"
                className="flex size-9 items-center justify-center rounded-full text-3xl font-light text-ink-900 hover:bg-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                type="button"
                onClick={() => setIsFilterOpen(false)}
              >
                x
              </button>
              <h2 className="text-xl font-bold text-ink-900">Filters</h2>
              <span className="size-9" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <ProductFiltersPanel
                brands={brands}
                categories={categories}
                values={draftFilters}
                onApply={applyFilters}
                onChange={setDraftFilters}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
