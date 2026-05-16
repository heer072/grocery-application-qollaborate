import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmptyState } from "../../components/common/EmptyState";
import { PrimaryButton } from "../../components/common/PrimaryButton";
import { PrimaryLink } from "../../components/common/PrimaryLink";
import { QuantityStepper } from "../../components/common/QuantityStepper";
import { useCartStore } from "../../stores/cart.store";
import { useCheckoutStore } from "../../stores/checkout.store";
import { OrderStatus } from "../../types/order.types";

const DELIVERY_FEE = 2;

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const orderStatus = useCheckoutStore((state) => state.orderStatus);
  const placeOrder = useCheckoutStore((state) => state.placeOrder);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.subtotal());
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;
  const isCheckingOut = orderStatus === OrderStatus.Loading;
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handlePlaceOrder = async () => {
    const status = await placeOrder({
      subtotal,
      deliveryFee,
      discount: 0,
      total,
    });

    if (status === OrderStatus.Success) {
      clearCart();
      navigate("/app/checkout/success");
      return;
    }

    navigate("/app/checkout/failure");
  };

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add products from the home or category pages to start your order."
        action={<PrimaryLink to="/app/home">Start Shopping</PrimaryLink>}
      />
    );
  }

  return (
    <div className="px-6 py-6 lg:px-0 lg:py-10">
      <div className="mx-auto max-w-md lg:grid lg:max-w-7xl lg:grid-cols-[1fr_360px] lg:gap-8">
        <section>
          <header className="mb-6 text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              Cart
            </p>
            <h1 className="mt-2 text-2xl font-bold text-ink-900 lg:text-4xl">My Cart</h1>
          </header>

          <div className="divide-y divide-ink-200 rounded-2xl border border-ink-200 bg-white lg:rounded-3xl">
            {items.map((item) => (
              <article
                className="grid grid-cols-[72px_1fr] gap-4 p-4 transition hover:bg-ink-100/60 lg:grid-cols-[96px_1fr_auto]"
                key={item.product.id}
              >
                <Link
                  className="flex size-20 items-center justify-center rounded-2xl bg-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:size-24"
                  to={`/app/products/${item.product.id}`}
                >
                  {item.product.imageUrl ? (
                    <img
                      alt={item.product.name}
                      className="max-h-16 object-contain lg:max-h-20"
                      src={item.product.imageUrl}
                    />
                  ) : (
                    <span className="text-xs font-bold text-ink-500">
                      {item.product.name.slice(0, 2)}
                    </span>
                  )}
                </Link>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        className="font-bold text-ink-900 transition hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                        to={`/app/products/${item.product.id}`}
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-1 text-xs text-ink-500">{item.product.unit}</p>
                    </div>
                    <button
                      aria-label={`Remove ${item.product.name}`}
                      className="rounded-full px-2 py-1 text-lg text-ink-500 transition hover:bg-ink-100 hover:text-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                    >
                      x
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <QuantityStepper
                      min={1}
                      value={item.quantity}
                      onChange={(quantity) => updateQuantity(item.product.id, quantity)}
                    />
                    <p className="text-sm font-bold text-ink-900">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="mt-8 rounded-2xl border border-ink-200 bg-white p-5 shadow-soft lg:sticky lg:top-8 lg:mt-0 lg:self-start">
          <h2 className="text-lg font-bold text-ink-900">Order Summary</h2>
          <div className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-500">Subtotal</span>
              <span className="font-bold text-ink-900">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-500">Delivery Fee</span>
              <span className="font-bold text-ink-900">{formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex justify-between border-t border-ink-200 pt-4 text-base">
              <span className="font-bold text-ink-900">Total</span>
              <span className="font-bold text-ink-900">{formatPrice(total)}</span>
            </div>
          </div>
          <div className="mt-6">
            <PrimaryButton onClick={() => setIsCheckoutOpen(true)}>Go to Checkout</PrimaryButton>
          </div>
        </aside>
      </div>

      {isCheckoutOpen ? (
        <div className="fixed inset-0 z-50 bg-ink-900/50 lg:flex lg:items-center lg:justify-center">
          <div
            aria-modal="true"
            className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white p-6 shadow-soft lg:static lg:w-full lg:max-w-lg lg:rounded-3xl"
            role="dialog"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-ink-900">Checkout</h2>
              <button
                aria-label="Close checkout"
                className="flex size-9 items-center justify-center rounded-full text-xl text-ink-900 transition hover:bg-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
              >
                x
              </button>
            </div>

            <div className="divide-y divide-ink-200 border-y border-ink-200">
              <div className="flex items-center justify-between py-4 text-sm">
                <span className="text-ink-500">Delivery</span>
                <button
                  className="font-bold text-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  type="button"
                >
                  Select Method &gt;
                </button>
              </div>
              <div className="flex items-center justify-between py-4 text-sm">
                <span className="text-ink-500">Payment</span>
                <button
                  className="font-bold text-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  type="button"
                >
                  Card &gt;
                </button>
              </div>
              <div className="flex items-center justify-between py-4 text-sm">
                <span className="text-ink-500">Promo Code</span>
                <button
                  className="font-bold text-ink-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  type="button"
                >
                  Pick discount &gt;
                </button>
              </div>
              <div className="flex items-center justify-between py-4 text-sm">
                <span className="text-ink-500">Total Cost</span>
                <span className="font-bold text-ink-900">{formatPrice(total)} &gt;</span>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-ink-500">
              By placing an order you agree to our{" "}
              <span className="font-bold text-ink-900">Terms And Conditions</span>.
            </p>

            <div className="mt-6">
              <PrimaryButton disabled={isCheckingOut} onClick={handlePlaceOrder}>
                {isCheckingOut ? "Placing Order" : "Place Order"}
            </PrimaryButton>
          </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
