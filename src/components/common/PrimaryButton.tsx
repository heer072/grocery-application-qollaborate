import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonVariant = "primary" | "secondary" | "ghost";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: PrimaryButtonVariant;
  fullWidth?: boolean;
}

const variantClassNames: Record<PrimaryButtonVariant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-500",
  secondary:
    "border border-brand-500 bg-white text-brand-600 hover:bg-brand-50 focus-visible:ring-brand-500",
  ghost: "bg-transparent text-ink-900 hover:bg-ink-100 focus-visible:ring-ink-500",
};

export function PrimaryButton({
  children,
  className = "",
  disabled,
  fullWidth = true,
  type = "button",
  variant = "primary",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={[
        "inline-flex min-h-14 items-center justify-center rounded-2xl px-6 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        fullWidth ? "w-full" : "",
        variantClassNames[variant],
        className,
      ].join(" ")}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
