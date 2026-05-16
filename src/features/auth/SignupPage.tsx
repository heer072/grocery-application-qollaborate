import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import carrotLogo from "../../assests/images/carrot-logo.svg";
import { PrimaryButton } from "../../components/common/PrimaryButton";
import { useAuthStore } from "../../stores/auth.store";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export function SignupPage() {
  const navigate = useNavigate();
  const signup = useAuthStore((state) => state.signup);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [username, setUsername] = useState("Afsar Hossen Shuvo");
  const [email, setEmail] = useState("imshuvo97@gmail.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const emailIsValid = isValidEmail(email);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.trim().length < 2 || !emailIsValid || password.length < 4) {
      setError("Please enter a valid username, email, and password.");
      return;
    }

    setError("");
    await signup(username.trim(), email.trim(), password);
    navigate("/location");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-white to-red-50 px-6 py-8">
      <div className="pt-10 text-center">
        <img alt="Nectar" className="mx-auto w-14" src={carrotLogo} />
      </div>

      <form className="mt-24" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-ink-900">Sign Up</h1>
        <p className="mt-2 text-base text-ink-500">Enter your credentials to continue</p>

        <label className="mt-9 block" htmlFor="signup-username">
          <span className="mb-4 block text-base font-semibold text-ink-500">Username</span>
          <input
            autoComplete="name"
            className="w-full border-b border-ink-200 bg-transparent pb-4 text-lg text-ink-900 focus:border-brand-500 focus:outline-none"
            id="signup-username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setError("");
            }}
          />
        </label>

        <label className="mt-8 block" htmlFor="signup-email">
          <span className="mb-4 block text-base font-semibold text-ink-500">Email</span>
          <span className="flex items-center gap-3 border-b border-ink-200 pb-4 focus-within:border-brand-500">
            <input
              autoComplete="email"
              className="min-w-0 flex-1 bg-transparent text-lg text-ink-900 focus:outline-none"
              id="signup-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
            />
            {emailIsValid ? (
              <span aria-label="Valid email" className="text-2xl font-semibold text-brand-500">
                &#10003;
              </span>
            ) : null}
          </span>
        </label>

        <label className="mt-8 block" htmlFor="signup-password">
          <span className="mb-4 block text-base font-semibold text-ink-500">Password</span>
          <span className="flex items-center gap-3 border-b border-ink-200 pb-4 focus-within:border-brand-500">
            <input
              autoComplete="new-password"
              className="min-w-0 flex-1 bg-transparent text-lg text-ink-900 focus:outline-none"
              id="signup-password"
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

        <p className="mt-4 text-sm leading-6 text-ink-500">
          By continuing you agree to our{" "}
          <Link className="font-medium text-brand-600" to="/auth/signup">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className="font-medium text-brand-600" to="/auth/signup">
            Privacy Policy
          </Link>
          .
        </p>

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <div className="mt-7">
          <PrimaryButton disabled={isLoading} type="submit">
            {isLoading ? "Signing Up" : "Sing Up"}
          </PrimaryButton>
        </div>

        <p className="mt-7 text-center text-sm font-semibold text-ink-900">
          Already have an account?{" "}
          <Link className="text-brand-600" to="/auth/email-login">
            Signup
          </Link>
        </p>
      </form>
    </section>
  );
}
