import { type ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backArrow from "../../assests/images/back-arrow.svg";
import favoriteAfter from "../../assests/images/favorite-after.svg";
import favoriteBefore from "../../assests/images/favorite-before.svg";
import shareImg from "../../assests/images/share-icon.svg";
import { EmptyState } from "../../components/common/EmptyState";
import { PrimaryButton } from "../../components/common/PrimaryButton";
import { QuantityStepper } from "../../components/common/QuantityStepper";
import { SkeletonCard } from "../../components/common/SkeletonCard";
import { useCartStore } from "../../stores/cart.store";
import { useFavoriteStore } from "../../stores/favorite.store";
import { useProductStore } from "../../stores/product.store";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

interface DetailAccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  rightContent?: ReactNode;
  children: ReactNode;
}

function DetailAccordion({
  title,
  isOpen,
  onToggle,
  rightContent,
  children,
}: DetailAccordionProps) {
  return (
    <div className="border-b border-ink-200">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        type="button"
        onClick={onToggle}
      >
        <span className="text-base font-bold text-ink-900">{title}</span>
        <span className="flex items-center gap-4">
          {rightContent}
          <span
            aria-hidden="true"
            className={[
              "inline-block text-2xl font-bold leading-none text-ink-900 transition-transform duration-300",
              isOpen ? "rotate-90" : "rotate-0",
            ].join(" ")}
          >
            &gt;
          </span>
        </span>
      </button>

      <div
        className={[
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-sm leading-6 text-ink-500">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailsPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const fetchCatalog = useProductStore((state) => state.fetchCatalog);
  const isLoading = useProductStore((state) => state.isLoading);
  const products = useProductStore((state) => state.products);
  const isFavorite = useFavoriteStore((state) =>
    productId ? state.isFavorite(productId) : false,
  );
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);
  const [quantity, setQuantity] = useState(1);
  const [showCartAction, setShowCartAction] = useState(false);
  const [openSections, setOpenSections] = useState({
    detail: true,
    nutrition: false,
    review: false,
  });

  useEffect(() => {
    if (products.length === 0) {
      void fetchCatalog();
    }
  }, [fetchCatalog, products.length]);

  const product = products.find((item) => item.id === productId);

  if (isLoading && !product) {
    return (
      <div className="px-6 py-6 lg:px-0 lg:py-10">
        <div className="mx-auto max-w-md lg:max-w-3xl">
          <SkeletonCard lines={4} />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        description="The product you are looking for is not available."
      />
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setShowCartAction(true);
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((currentSections) => ({
      ...currentSections,
      [section]: !currentSections[section],
    }));
  };

  return (
    <div className="bg-white lg:px-8 lg:py-10">
      <div className="mx-auto max-w-md bg-white lg:grid lg:max-w-7xl lg:grid-cols-[1fr_460px] lg:gap-12 lg:rounded-3xl lg:border lg:border-ink-200 lg:p-8">
        <header className="absolute left-0 right-0 top-0 z-10 mx-auto flex max-w-md items-center justify-between px-5 py-5 lg:static lg:col-span-2 lg:max-w-none lg:px-0 lg:py-0">
          <button
            aria-label="Go back"
            className="flex size-10 items-center justify-center rounded-full text-3xl font-light text-ink-900 transition hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            type="button"
            onClick={() => navigate(-1)}
          >
            <img alt="Back arrow" src={backArrow} />
          </button>
          <button
            aria-label="Share product"
            className="flex size-10 items-center justify-center rounded-full text-sm font-bold text-ink-900 transition hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            type="button"
          >
            <img alt="Share" src={shareImg} />
          </button>
        </header>

        <section className="relative flex min-h-80 items-center justify-center rounded-b-3xl bg-ink-100 px-8 pb-10 pt-20 lg:min-h-[520px] lg:rounded-3xl lg:p-10">
          {product.imageUrl ? (
            <img
              alt={product.name}
              className="max-h-64 w-full object-contain lg:max-h-[420px]"
              src={product.imageUrl}
            />
          ) : (
            <span className="text-4xl font-bold text-ink-500">
              {product.name.slice(0, 2)}
            </span>
          )}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1">
            <span className="h-1 w-4 rounded-full bg-brand-500" />
            <span className="size-1 rounded-full bg-ink-200" />
            <span className="size-1 rounded-full bg-ink-200" />
          </div>
        </section>

        <section className="px-6 py-6 lg:px-0 lg:py-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold leading-tight text-ink-900 lg:text-4xl">
                {product.name}
              </h1>
              <p className="mt-1 text-base font-semibold text-ink-500">{product.unit}</p>
            </div>
            <button
              aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
              className={[
                "flex size-10 shrink-0 items-center justify-center rounded-full text-3xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                isFavorite ? "text-brand-500" : "text-ink-500 hover:text-brand-500",
              ].join(" ")}
              type="button"
              onClick={() => toggleFavorite(product.id)}
            >
              <img alt="Favourite" src={isFavorite ? favoriteAfter : favoriteBefore} />
            </button>
          </div>

          <div className="mt-7 flex items-center justify-between border-b border-ink-200 pb-7">
            <QuantityStepper min={1} value={quantity} onChange={setQuantity} />
            <p className="text-2xl font-bold text-ink-900">
              {formatPrice(product.price * quantity)}
            </p>
          </div>

          <div className="mt-1">
            <DetailAccordion
              isOpen={openSections.detail}
              title="Product Detail"
              onToggle={() => toggleSection("detail")}
            >
              {product.description}
            </DetailAccordion>

            <DetailAccordion
              isOpen={openSections.nutrition}
              rightContent={
                product.nutrition ? (
                  <span className="rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-500">
                    {product.nutrition}
                  </span>
                ) : null
              }
              title="Nutritions"
              onToggle={() => toggleSection("nutrition")}
            >
              Fresh groceries are selected and packed carefully. Nutrition values may vary
              slightly based on size, season, and supplier.
            </DetailAccordion>

            <DetailAccordion
              isOpen={openSections.review}
              rightContent={
                <span className="text-base tracking-wide text-orange-500">
                  ★★★★★
                </span>
              }
              title="Review"
              onToggle={() => toggleSection("review")}
            >
              Customers love the freshness, quality, and fast delivery of this item.
              Average rating: 5 out of 5.
            </DetailAccordion>
          </div>

          <div className="mt-5 space-y-3">
            <PrimaryButton onClick={handleAddToCart}>Add To Basket</PrimaryButton>
            {showCartAction ? (
              <PrimaryButton variant="secondary" onClick={() => navigate("/app/cart")}>
                Go To Cart
              </PrimaryButton>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
