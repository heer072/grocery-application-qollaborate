import { NavLink, useLocation } from "react-router-dom";
import accountBeforeIcon from "../../assests/images/account-before.svg";
import cartAfterIcon from "../../assests/images/cart-after.svg";
import cartBeforeIcon from "../../assests/images/cart-brefore.svg";
import exploreAfterIcon from "../../assests/images/explore-after.svg";
import exploreBeforeIcon from "../../assests/images/explore-before.svg";
import favoriteAfterIcon from "../../assests/images/favorite-after.svg";
import favoriteBeforeIcon from "../../assests/images/favorite-before.svg";
import shopBeforeIcon from "../../assests/images/shop-before.svg";
import shopAfterIcon from "../../assests/images/store-after.svg";
import { useCartStore } from "../../stores/cart.store";

const tabs = [
  {
    label: "Shop",
    to: "/app/home",
    beforeIcon: shopBeforeIcon,
    afterIcon: shopAfterIcon,
    end: true,
  },
  {
    label: "Explore",
    to: "/app/search",
    beforeIcon: exploreBeforeIcon,
    afterIcon: exploreAfterIcon,
    end: false,
  },
  {
    label: "Cart",
    to: "/app/cart",
    beforeIcon: cartBeforeIcon,
    afterIcon: cartAfterIcon,
    end: false,
  },
  {
    label: "Favourite",
    to: "/app/favorites",
    beforeIcon: favoriteBeforeIcon,
    afterIcon: favoriteAfterIcon,
    end: false,
  },
  {
    label: "Account",
    to: "/app",
    beforeIcon: accountBeforeIcon,
    afterIcon: accountBeforeIcon,
    end: true,
  },
] as const;

export function BottomNavigation() {
  const location = useLocation();
  const totalItems = useCartStore((state) => state.totalItems());
  const shouldHideNavigation =
    location.pathname.startsWith("/app/categories/") ||
    location.pathname.startsWith("/app/products/");

  if (shouldHideNavigation) {
    return null;
  }

  return (
    <nav
      aria-label="Primary mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-white px-2 pb-3 pt-2 shadow-soft lg:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {tabs.map((tab) => (
          <li key={tab.to}>
            <NavLink
              className={({ isActive }) =>
                [
                  "relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                  isActive ? "text-brand-600" : "text-ink-900 hover:bg-ink-100",
                ].join(" ")
              }
              end={tab.end}
              to={tab.to}
            >
              {({ isActive }) => (
                <>
                  <img
                    alt=""
                    aria-hidden="true"
                    className="size-6 object-contain"
                    src={isActive ? tab.afterIcon : tab.beforeIcon}
                  />
                  <span>{tab.label}</span>
                  {tab.label === "Cart" && totalItems > 0 ? (
                    <span className="absolute right-3 top-1 flex size-4 items-center justify-center rounded-full bg-brand-500 text-[10px] text-white">
                      {totalItems}
                    </span>
                  ) : null}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
