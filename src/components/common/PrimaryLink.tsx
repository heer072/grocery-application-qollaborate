import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type PrimaryLinkVariant = "primary" | "secondary" | "ghost";

interface PrimaryLinkProps {
  children: ReactNode;
  to: string;
  variant?: PrimaryLinkVariant;
}

const variantClassNames: Record<PrimaryLinkVariant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-500",
  secondary:
    "border border-brand-500 bg-white text-brand-600 hover:bg-brand-50 focus-visible:ring-brand-500",
  ghost: "bg-transparent text-ink-900 hover:bg-ink-100 focus-visible:ring-ink-500",
};

export function PrimaryLink({ children, to, variant = "primary" }: PrimaryLinkProps) {
  return (
    <Link
      className={[
        "inline-flex min-h-14 w-full items-center justify-center rounded-2xl px-6 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variantClassNames[variant],
      ].join(" ")}
      to={to}
    >
      {children}
    </Link>
  );
}
