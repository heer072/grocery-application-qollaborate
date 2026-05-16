import type { InputHTMLAttributes, ReactNode } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export function TextInput({
  className = "",
  error,
  id,
  label,
  leftSlot,
  rightSlot,
  ...props
}: TextInputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="block w-full" htmlFor={inputId}>
      {label ? <span className="mb-2 block text-xs font-medium text-ink-500">{label}</span> : null}
      <span
        className={[
          "flex min-h-12 items-center gap-3 border-b bg-white text-sm transition focus-within:border-brand-500",
          error ? "border-red-500" : "border-ink-200",
          className,
        ].join(" ")}
      >
        {leftSlot}
        <input
          className="min-w-0 flex-1 bg-transparent py-3 text-ink-900 placeholder:text-ink-500 focus:outline-none"
          id={inputId}
          {...props}
        />
        {rightSlot}
      </span>
      {error ? <span className="mt-2 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
