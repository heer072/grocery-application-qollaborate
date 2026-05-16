import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import brandLogo from "../../assests/images/brand-logo.svg";

export function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      navigate("/onboarding");
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <button
      aria-label="Continue to onboarding"
      className="flex min-h-screen w-full items-center justify-center bg-brand-500 px-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      type="button"
      onClick={() => navigate("/onboarding")}
    >
      <img alt="Nectar online groceriet" className="w-56" src={brandLogo} />
    </button>
  );
}
