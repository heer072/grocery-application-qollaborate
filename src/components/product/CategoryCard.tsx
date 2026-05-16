import { Link } from "react-router-dom";
import type { Category } from "../../types/product.types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      className={[
        "flex min-h-40 flex-col justify-end rounded-2xl border p-4 transition hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        category.accentClassName,
      ].join(" ")}
      to={`/app/categories/${category.id}`}
    >
      <div className="mb-4 flex h-24 items-center justify-center rounded-2xl">
        <img
          alt={category.name}
          className="max-h-24 w-full object-contain"
          loading="lazy"
          src={category.imageUrl}
        />
      </div>
      <h3 className="text-sm font-bold leading-5 text-ink-900">{category.name}</h3>
      <p className="mt-1 text-xs leading-5 text-ink-500">{category.description}</p>
    </Link>
  );
}
