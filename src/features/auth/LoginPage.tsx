import {type FormEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import backArrow from "../../assests/images/back-arrow.svg";
import veggiesLoginImg from "../../assests/images/veggies-login.svg";
import {useAuthStore} from "../../stores/auth.store";

interface CountryCode {
  id: string;
  name: string;
  dialCode: string;
}

const countries: CountryCode[] = [
  {id: "IN", name: "India", dialCode: "+91"},
  {id: "BD", name: "Bangladesh", dialCode: "+880"},
  {id: "US", name: "United States", dialCode: "+1"},
  {id: "AE", name: "UAE", dialCode: "+971"},
];

const isValidPhone = (value: string) => /^\d{6,12}$/.test(value.trim());

function CountryFlag({countryId}: {countryId: string}) {
  if (countryId === "IN") {
    return (
      <span className="flex h-5 w-8 flex-col overflow-hidden rounded-sm border border-ink-200">
        <span className="h-1/3 bg-orange-500" />
        <span className="flex h-1/3 items-center justify-center bg-white">
          <span className="size-1.5 rounded-full bg-blue-700" />
        </span>
        <span className="h-1/3 bg-green-600" />
      </span>
    );
  }
  return (
    <span className="flex h-5 w-8 items-center justify-center rounded-sm bg-ink-100 text-[10px] font-bold text-ink-700">
      {countryId}
    </span>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [step, setStep] = useState<"country" | "phone">("country");
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
    countries[0],
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidPhone(phoneNumber)) {
      setError("Enter a valid mobile number.");
      return;
    }

    setError("");
    await login(`${selectedCountry.dialCode}${phoneNumber.trim()}`);
    navigate("/auth/verify-otp");
  };

  if (step === "phone") {
    return (
      <section className="flex min-h-screen flex-col bg-gradient-to-br from-white via-white to-red-50">
        <div className="px-6 pt-10">
          <button
            aria-label="Back to country selection"
            className="flex size-10 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            type="button"
            onClick={() => setStep("country")}
          >
            <img alt="" aria-hidden="true" src={backArrow} />
          </button>
        </div>

        <form
          className="flex flex-1 flex-col px-6 pt-14"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-ink-900">
            Enter your mobile number
          </h1>

          <label className="mt-8 block" htmlFor="phone-number">
            <span className="mb-3 block text-sm font-semibold text-ink-500">
              Mobile Number
            </span>
            <span className="flex items-center gap-3 border-b border-ink-200 pb-3 focus-within:border-brand-500">
              <span className="flex h-5 w-8 flex-col overflow-hidden rounded-sm border border-ink-200">
                <span className="h-1/3 bg-orange-500" />
                <span className="flex h-1/3 items-center justify-center bg-white">
                  <span className="size-1.5 rounded-full bg-blue-700" />
                </span>
                <span className="h-1/3 bg-green-600" />
              </span>
              <span className="text-lg text-ink-900">
                {selectedCountry.dialCode}
              </span>
              <input
                autoComplete="tel"
                className="min-w-0 flex-1 bg-transparent text-lg text-ink-900 placeholder:text-ink-500 focus:outline-none"
                id="phone-number"
                inputMode="numeric"
                placeholder="Mobile number"
                value={phoneNumber}
                onChange={(event) => {
                  setPhoneNumber(event.target.value.replace(/\D/g, ""));
                  setError("");
                }}
              />
            </span>
          </label>

          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

          <div className="mt-auto flex justify-between items-center">
            <div className="text-brand-500">Resend code</div>
            <div className="mb-6 flex justify-end">
              <button
                aria-label="Continue to verification"
                className="flex size-16 items-center justify-center rounded-full bg-brand-500 text-4xl text-white transition hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60"
                disabled={isLoading}
                type="submit"
              >
                <span className="mb-2">&rsaquo;</span>
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen flex-col bg-white">
      <img
        alt="Fresh groceries"
        className="h-[390px] w-full object-cover object-top"
        src={veggiesLoginImg}
      />

      <div className="flex flex-1 flex-col px-6 pb-8 pt-8">
        <h1 className="text-2xl font-bold leading-tight text-ink-900">
          Get your groceries
          <br />
          with nectar
        </h1>

        <label className="mt-8 block" htmlFor="country-code">
          <span className="sr-only">Country code</span>
          <span className="flex items-center gap-3 border-b border-ink-200 pb-4">
            <CountryFlag countryId={selectedCountry.id} />
            <select
              className="flex-1 bg-transparent text-lg text-ink-900 focus:outline-none"
              id="country-code"
              value={selectedCountry.id}
              onChange={(event) => {
                const nextCountry = countries.find(
                  (country) => country.id === event.target.value,
                );
                if (nextCountry) {
                  setSelectedCountry(nextCountry);
                  setStep("phone");
                }
              }}
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name} {country.dialCode}
                </option>
              ))}
            </select>
          </span>
        </label>

        <div className="mt-9 flex justify-center gap-4">
          <span className="text-xs text-ink-500">
            Or connect with social media
          </span>
        </div>

        <div className="mt-6 space-y-4">
          <button
            className="flex min-h-14 w-full items-center justify-center gap-6 rounded-2xl bg-blue-500 px-6 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            type="button"
          >
            <span className="text-xl font-bold">G</span>
            Continue with Google
          </button>
          <button
            className="flex min-h-14 w-full items-center justify-center gap-6 rounded-2xl bg-blue-700 px-6 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
            type="button"
          >
            <span className="text-xl font-bold">f</span>
            Continue with Facebook
          </button>
        </div>
      </div>
    </section>
  );
}
