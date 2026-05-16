import type {InputHTMLAttributes} from "react";
import searchBar from "../../assests/images/search-store.svg";

interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  onClear?: () => void;
}

export function SearchInput({
  className = "",
  onClear,
  value,
  ...props
}: SearchInputProps) {
  const hasValue = typeof value === "string" && value.length > 0;

  return (
    <label
      className={[
        "flex min-h-12 items-center gap-3 rounded-2xl bg-ink-100 px-4 text-sm text-ink-700",
        className,
      ].join(" ")}
    >
      <img src={searchBar} alt="searching" />
      <input
        className="min-w-0 flex-1 bg-transparent text-ink-900 placeholder:text-ink-500 focus:outline-none"
        type="search"
        value={value}
        {...props}
      />
      {hasValue && onClear ? (
        <button
          aria-label="Clear search"
          className="rounded-full px-2 py-1 text-xs text-ink-500 transition hover:bg-white hover:text-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          type="button"
          onClick={onClear}
        >
          Clear
        </button>
      ) : null}
    </label>
  );
}
