import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/common/PrimaryButton";
import { PrimaryLink } from "../../components/common/PrimaryLink";

export function OrderFailurePage() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[calc(100vh-96px)] items-center justify-center bg-ink-900/40 px-6 py-10">
      <div className="relative mx-auto w-full max-w-sm rounded-3xl bg-white px-6 py-8 text-center shadow-soft">
        <button
          aria-label="Close failure message"
          className="absolute left-5 top-5 flex size-9 items-center justify-center rounded-full text-xl text-ink-900 transition hover:bg-ink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          type="button"
          onClick={() => navigate("/app/home")}
        >
          x
        </button>
        <div className="mx-auto mt-8 flex size-28 items-center justify-center rounded-full bg-red-50 text-5xl font-bold text-red-500 shadow-soft">
          !
        </div>
        <h1 className="mt-8 text-2xl font-bold text-ink-900">Oops! Order Failed</h1>
        <p className="mt-3 text-sm leading-6 text-ink-500">
          Something went wrong while placing your order.
        </p>
        <div className="mt-8 space-y-3">
          <PrimaryButton onClick={() => navigate("/app/cart")}>Please Try Again</PrimaryButton>
          <PrimaryLink to="/app/home" variant="ghost">
            Back to home
          </PrimaryLink>
        </div>
      </div>
    </section>
  );
}
