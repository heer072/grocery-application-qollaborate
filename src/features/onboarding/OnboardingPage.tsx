import { Link } from "react-router-dom";
import deliveryManImg from "../../assests/images/delivery-man.svg";
import carrotLogo from "../../assests/images/carrot-logo.svg";
import { useAuthStore } from "../../stores/auth.store";

export function OnboardingPage() {
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

  return (
    <section className="relative min-h-screen overflow-hidden bg-ink-900 text-white">
      <img
        alt="Grocery delivery person"
        className="absolute inset-0 h-full w-full object-cover"
        src={deliveryManImg}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      <div className="relative z-10 flex min-h-screen flex-col justify-end px-8 pb-16 text-center">
        <img alt="" aria-hidden="true" className="mx-auto mb-5 w-10" src={carrotLogo} />
        <h1 className="text-4xl font-bold leading-tight">
          Welcome
          <br />
          to our store
        </h1>
        <p className="mt-3 text-sm text-white/85">Get your groceries in as fast as one hour</p>
        <Link
          className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-2xl bg-brand-500 px-6 text-sm font-semibold text-white transition hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          to="/auth/login"
          onClick={completeOnboarding}
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
