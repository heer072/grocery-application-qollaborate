import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface DesktopLayoutProps {
  children: ReactNode;
}

const desktopLinks = [
  { label: "Shop", to: "/app/home" },
  { label: "Categories", to: "/app/categories" },
  { label: "Search", to: "/app/search" },
  { label: "Cart", to: "/app/cart" },
  { label: "Favourites", to: "/app/favorites" },
] as const;

export function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-ink-900">
      <header className="sticky top-0 z-30 hidden border-b border-ink-200 bg-white/95 backdrop-blur lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <NavLink
            className="text-2xl font-bold text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            to="/app/home"
          >
            nectar
          </NavLink>
          <nav className="flex items-center gap-2">
            {desktopLinks.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  [
                    "rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                    isActive ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-ink-100",
                  ].join(" ")
                }
                key={link.to}
                to={link.to}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
