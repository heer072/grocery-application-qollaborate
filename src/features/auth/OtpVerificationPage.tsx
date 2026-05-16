import {type FormEvent, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import backArrow from "../../assests/images/back-arrow.svg";
import {useAuthStore} from "../../stores/auth.store";

export function OtpVerificationPage() {
  const navigate = useNavigate();
  const pendingIdentifier = useAuthStore((state) => state.pendingIdentifier);
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  if (!pendingIdentifier) {
    return <Navigate replace to="/auth/login" />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^\d{4}$/.test(otp)) {
      setError("Enter the 4-digit code.");
      return;
    }

    setError("");
    await verifyOtp(otp);
    navigate("/location");
  };

  return (
    <section className="flex min-h-screen flex-col bg-gradient-to-br from-white via-white to-red-50">
      <div className="px-6 pt-10">
        <button
          aria-label="Back to login"
          className="flex size-10 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          type="button"
          onClick={() => navigate("/auth/login")}
        >
          <img alt="" aria-hidden="true" src={backArrow} />
        </button>
      </div>

      <form className="flex flex-1 flex-col px-6 pt-14" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-ink-900">
          Enter your 4-digit code
        </h1>
        <label className="mt-8 block" htmlFor="otp-code">
          <span className="mb-3 block text-sm font-medium text-ink-500">
            Code
          </span>
          <input
            className="w-full border-b border-ink-200 bg-transparent pb-3 text-xl tracking-[0.5em] text-ink-900 placeholder:text-ink-500 focus:outline-none focus:border-brand-500"
            id="otp-code"
            inputMode="numeric"
            maxLength={4}
            placeholder="- - - -"
            value={otp}
            onChange={(event) => {
              setOtp(event.target.value.replace(/\D/g, ""));
              setError("");
            }}
          />
        </label>
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

        <div className="mt-auto pb-6">
          <div className="mb-6 flex items-center justify-between">
            <button
              className="text-sm font-semibold text-brand-500"
              type="button"
            >
              Resend Code
            </button>
            <button
              aria-label="Verify OTP"
              className="flex size-16 items-center justify-center rounded-full bg-brand-500 text-3xl text-white transition hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60"
              disabled={isLoading}
              type="submit"
            >
              ›
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
