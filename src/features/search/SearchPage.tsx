import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "../../components/common/EmptyState";
import { SearchInput } from "../../components/common/SearchInput";
import { SkeletonCard } from "../../components/common/SkeletonCard";
import { CategoryCard } from "../../components/product/CategoryCard";
import { useProductStore } from "../../stores/product.store";

export function SearchPage() {
  const categories = useProductStore((state) => state.categories);
  const fetchCatalog = useProductStore((state) => state.fetchCatalog);
  const isLoading = useProductStore((state) => state.isLoading);
  const products = useProductStore((state) => state.products);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  useEffect(() => {
    if (products.length === 0 || categories.length === 0) {
      void fetchCatalog();
    }
  }, [categories.length, fetchCatalog, products.length]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchText(searchText.trim().toLowerCase());
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [searchText]);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(debouncedSearchText),
    );
  }, [categories, debouncedSearchText]);

  return (
    <div className="px-6 py-6 lg:px-0 lg:py-10">
      <div className="mx-auto max-w-md lg:max-w-7xl">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-ink-900 lg:text-4xl">Find Products</h1>
        </header>

        <SearchInput
          placeholder="Search Store"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onClear={() => setSearchText("")}
        />

        <div className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} lines={1} />
              ))}
            </div>
          ) : filteredCategories.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {filteredCategories.map((category) => (
                <CategoryCard category={category} key={category.id} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No categories found"
              description="Try searching for fruits, beverages, dairy, or snacks."
            />
          )}
        </div>
      </div>
    </div>
  );
}
