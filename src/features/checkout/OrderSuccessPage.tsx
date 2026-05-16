import { PrimaryLink } from "../../components/common/PrimaryLink";

export function OrderSuccessPage() {
  return (
    <section className="flex min-h-[calc(100vh-96px)] items-center justify-center bg-white px-6 py-10">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex size-32 items-center justify-center rounded-full border-8 border-brand-100 bg-brand-500 text-6xl font-bold text-white shadow-soft">
          ✓
        </div>
        <h1 className="mt-8 text-3xl font-bold text-ink-900">Your Order has been accepted</h1>
        <p className="mt-3 text-sm leading-6 text-ink-500">
          Your items have been placed and are on the way to being processed.
        </p>
        <div className="mt-8 space-y-3">
          <PrimaryLink to="/app/home">Track Order</PrimaryLink>
          <PrimaryLink to="/app/home" variant="ghost">
            Back to home
          </PrimaryLink>
        </div>
      </div>
    </section>
  );
}
