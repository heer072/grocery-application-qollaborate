import bannerImg from "../../assests/images/banner.svg";
import carrotImg from "../../assests/images/carrot-logo.svg";
import locationImg from "../../assests/images/location.svg";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchInput } from "../../components/common/SearchInput";
import { SkeletonCard } from "../../components/common/SkeletonCard";
import { ProductCard } from "../../components/product/ProductCard";
import { useLocationStore } from "../../stores/location.store";
import { useProductStore } from "../../stores/product.store";
import type { Product } from "../../types/product.types";

function SectionHeader({ title, to }: { title: string; to?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-xl font-bold text-ink-900">{title}</h2>
      {to ? (
        <Link
          className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          to={to}
        >
          See all
        </Link>
      ) : null}
    </div>
  );
}

function ProductSection({
  isLoading,
  products,
  title,
}: {
  isLoading: boolean;
  products: Product[];
  title: string;
}) {
  return (
    <section className="mt-8">
      <SectionHeader title={title} to="/app/search" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
}

export function HomePage() {
  const navigate = useNavigate();
  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const categories = useProductStore((state) => state.categories);
  const error = useProductStore((state) => state.error);
  const fetchCatalog = useProductStore((state) => state.fetchCatalog);
  const isLoading = useProductStore((state) => state.isLoading);
  const products = useProductStore((state) => state.products);
  const searchQuery = useProductStore((state) => state.searchQuery);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);

  useEffect(() => {
    if (products.length === 0 || categories.length === 0) {
      void fetchCatalog();
    }
  }, [categories.length, fetchCatalog, products.length]);

  const exclusiveProducts = products
    .filter((product) => product.isExclusiveOffer)
    .slice(0, 4);
  const bestSellingProducts = products
    .filter((product) => product.isPopular)
    .slice(0, 4);

  return (
    <div className="px-6 py-6 lg:px-0 lg:py-10">
      <div className="mx-auto max-w-md lg:max-w-7xl">
        <header className="text-center lg:text-left">
          <div className="flex items-center justify-center">
            <img src={carrotImg} alt="Carrot logo" />
          </div>
          <button
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink-700 transition hover:bg-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            type="button"
            onClick={() => navigate("/location")}
          >
            <img src={locationImg} alt="location pin" />
            <span>
              {selectedLocation
                ? `${selectedLocation.area}, ${selectedLocation.zone}`
                : "Select location"}
            </span>
          </button>
        </header>

        <div className="mt-5">
          <SearchInput
            placeholder="Search Store"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onClear={() => setSearchQuery("")}
          />
        </div>

        <section className="mt-5 overflow-hidden rounded-2xl lg:mt-8">
          <div className="flex min-h-28 w-full items-center lg:min-h-40">
            <img
              className="h-full min-h-28 w-full object-cover lg:min-h-40"
              src={bannerImg}
              alt="get offer image"
            />
          </div>
        </section>

        {error ? (
          <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        ) : null}

        <ProductSection
          isLoading={isLoading}
          products={exclusiveProducts}
          title="Exclusive Offer"
        />
        <ProductSection
          isLoading={isLoading}
          products={bestSellingProducts}
          title="Best Selling"
        />
      </div>
    </div>
  );
}
