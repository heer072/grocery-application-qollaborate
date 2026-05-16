import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import locationImg from "../../assests/images/location-before-loin.svg";
import backArrow from "../../assests/images/back-arrow.svg";
import { PrimaryButton } from "../../components/common/PrimaryButton";
import { useLocationStore } from "../../stores/location.store";

export function LocationPage() {
  const navigate = useNavigate();
  const setLocation = useLocationStore((state) => state.setLocation);
  const [zone, setZone] = useState("Banasree");
  const [area, setArea] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!zone.trim() || !area.trim()) {
      setError("Please enter your area.");
      return;
    }

    setLocation({ zone: zone.trim(), area: area.trim() });
    navigate("/auth/email-login");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-white to-red-50 px-6 py-10">
      <button
        aria-label="Go back"
        className="flex size-10 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        type="button"
        onClick={() => navigate(-1)}
      >
        <img alt="" aria-hidden="true" src={backArrow} />
      </button>

      <div className="mt-8 text-center">
        <img alt="Location map pin" className="mx-auto w-48" src={locationImg} />
        <h1 className="mt-6 text-2xl font-bold text-ink-900">Select Your Location</h1>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-5 text-ink-500">
          Switch on your location to stay in tune with what’s happening in your area
        </p>
      </div>

      <form className="mt-20 space-y-6" onSubmit={handleSubmit}>
        <label className="block" htmlFor="zone">
          <span className="mb-3 block text-sm font-medium text-ink-500">Your Zone</span>
          <select
            className="w-full border-b border-ink-200 bg-transparent pb-3 text-base text-ink-900 focus:outline-none focus:border-brand-500"
            id="zone"
            value={zone}
            onChange={(event) => setZone(event.target.value)}
          >
            <option value="Banasree">Banasree</option>
            <option value="Gulshan">Gulshan</option>
            <option value="Dhanmondi">Dhanmondi</option>
          </select>
        </label>

        <label className="block" htmlFor="area">
          <span className="mb-3 block text-sm font-medium text-ink-500">Your Area</span>
          <input
            className="w-full border-b border-ink-200 bg-transparent pb-3 text-base text-ink-900 placeholder:text-ink-500 focus:outline-none focus:border-brand-500"
            id="area"
            placeholder="Types of your area"
            value={area}
            onChange={(event) => {
              setArea(event.target.value);
              setError("");
            }}
          />
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </section>
  );
}
