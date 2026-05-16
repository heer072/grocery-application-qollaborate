import { Link } from "react-router-dom";
import { useCartStore } from "../../stores/cart.store";
import { useFavoriteStore } from "../../stores/favorite.store";
import type { Product } from "../../types/product.types";

interface ProductCardProps {
  product: Product;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isFavorite = useFavoriteStore((state) => state.isFavorite(product.id));
  const toggleFavorite = useFavoriteStore((state) => state.toggleFavorite);

  return (
    <article className="flex min-h-60 flex-col rounded-2xl border border-ink-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft">
      <Link
        className="group flex flex-1 flex-col rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        to={`/app/products/${product.id}`}
      >
        <div className="mb-4 flex h-24 items-center justify-center rounded-2xl">
          {product.imageUrl ? (
            <img
              alt={product.name}
              className="max-h-24 object-contain"
              loading="lazy"
              src={product.imageUrl}
            />
          ) : (
            <span className="text-center text-xs font-semibold uppercase tracking-wide text-ink-500">
              {product.name.slice(0, 2)}
            </span>
          )}
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold text-ink-900 group-hover:text-brand-700">
          {product.name}
        </h3>
        <p className="mt-1 text-xs text-ink-500">{product.unit}</p>
      </Link>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-ink-900">{formatPrice(product.price)}</span>
        <div className="flex items-center gap-2">
          {/* <button
            aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
            className={[
              "flex h-9 min-w-9 items-center justify-center rounded-full border px-2 text-[10px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
              isFavorite
                ? "border-brand-500 bg-brand-50 text-brand-600"
                : "border-ink-200 bg-white text-ink-500 hover:border-brand-500 hover:text-brand-600",
            ].join(" ")}
            type="button"
            onClick={() => toggleFavorite(product.id)}
          >
            {isFavorite ? "Saved" : "Save"}
          </button> */}
          <button
            aria-label={`Add ${product.name} to cart`}
            className="flex size-9 items-center justify-center rounded-2xl bg-brand-500 text-xl leading-none text-white transition hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            type="button"
            onClick={() => addItem(product)}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
