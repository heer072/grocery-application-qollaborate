interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantityStepper({ max = 99, min = 0, onChange, value }: QuantityStepperProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className="inline-flex items-center gap-3" aria-label="Quantity selector">
      <button
        aria-label="Decrease quantity"
        className="flex size-8 items-center justify-center rounded-full text-2xl font-semibold text-ink-500 transition hover:bg-ink-100 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-40"
        disabled={value <= min}
        type="button"
        onClick={decrease}
      >
        -
      </button>
      <span className="flex size-11 items-center justify-center rounded-2xl border border-ink-200 text-sm font-semibold text-ink-900">
        {value}
      </span>
      <button
        aria-label="Increase quantity"
        className="flex size-8 items-center justify-center rounded-full text-2xl font-semibold text-brand-600 transition hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-40"
        disabled={value >= max}
        type="button"
        onClick={increase}
      >
        +
      </button>
    </div>
  );
}
