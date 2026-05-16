import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import carrotLogo from "../../assests/images/carrot-logo.svg";
import { PrimaryButton } from "../../components/common/PrimaryButton";
import { useAuthStore } from "../../stores/auth.store";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export function EmailLoginPage() {
  const navigate = useNavigate();
  const isLoading = useAuthStore((state) => state.isLoading);
  const loginWithEmail = useAuthStore((state) => state.loginWithEmail);
  const [email, setEmail] = useState("imshuvo97@gmail.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(email) || password.length < 4) {
      setError("Enter a valid email and password.");
      return;
    }

    setError("");
    await loginWithEmail(email.trim(), password);
    navigate("/app/home");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-white to-red-50 px-6 py-10">
      <div className="pt-10 text-center">
        <img alt="Nectar" className="mx-auto w-12" src={carrotLogo} />
      </div>

      <form className="mt-20" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-ink-900">Loging</h1>
        <p className="mt-2 text-sm text-ink-500">Enter your emails and password</p>

        <label className="mt-8 block" htmlFor="email">
          <span className="mb-3 block text-sm font-medium text-ink-500">Email</span>
          <input
            autoComplete="email"
            className="w-full border-b border-ink-200 bg-transparent pb-3 text-base text-ink-900 focus:border-brand-500 focus:outline-none"
            id="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
          />
        </label>

        <label className="mt-8 block" htmlFor="password">
          <span className="mb-3 block text-sm font-medium text-ink-500">Password</span>
          <span className="flex items-center gap-3 border-b border-ink-200 pb-3 focus-within:border-brand-500">
            <input
              autoComplete="current-password"
              className="min-w-0 flex-1 bg-transparent text-base text-ink-900 focus:outline-none"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-lg text-ink-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              type="button"
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? "hide" : "show"}
            </button>
          </span>
        </label>

        <div className="mt-4 text-right">
          <button className="text-sm text-ink-900" type="button">
            Forgot Password?
          </button>
        </div>

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <div className="mt-6">
          <PrimaryButton disabled={isLoading} type="submit">
            {isLoading ? "Logging In" : "Log In"}
          </PrimaryButton>
        </div>

        <p className="mt-6 text-center text-sm font-semibold text-ink-900">
          Don't have an account?{" "}
          <Link className="text-brand-600" to="/auth/signup">
            Signup
          </Link>
        </p>
      </form>
    </section>
  );
}
