import { useEffect } from "react";
import { EmptyState } from "../../components/common/EmptyState";
import { PrimaryLink } from "../../components/common/PrimaryLink";
import { SkeletonCard } from "../../components/common/SkeletonCard";
import { ProductCard } from "../../components/product/ProductCard";
import { useFavoriteStore } from "../../stores/favorite.store";
import { useProductStore } from "../../stores/product.store";

export function FavoritesPage() {
  const favoriteProductIds = useFavoriteStore((state) => state.favoriteProductIds);
  const fetchCatalog = useProductStore((state) => state.fetchCatalog);
  const isLoading = useProductStore((state) => state.isLoading);
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      void fetchCatalog();
    }
  }, [fetchCatalog, products.length]);

  const favoriteProducts = products.filter((product) => favoriteProductIds.includes(product.id));

  if (isLoading && favoriteProductIds.length > 0) {
    return (
      <div className="px-6 py-6 lg:px-0 lg:py-10">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-4 lg:max-w-7xl lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (favoriteProducts.length === 0) {
    return (
      <EmptyState
        title="No favourites yet"
        description="Tap the favourite button on a product to save it here."
        action={<PrimaryLink to="/app/home">Browse Products</PrimaryLink>}
      />
    );
  }

  return (
    <div className="px-6 py-6 lg:px-0 lg:py-10">
      <div className="mx-auto max-w-md lg:max-w-7xl">
        <header className="mb-6 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            Favourite
          </p>
          <h1 className="mt-2 text-2xl font-bold text-ink-900 lg:text-4xl">Favourites</h1>
        </header>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
