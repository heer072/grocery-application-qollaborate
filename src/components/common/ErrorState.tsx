import type { ReactNode } from "react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function ErrorState({
  action,
  description = "Something went wrong. Please try again.",
  title = "Oops! Order Failed",
}: ErrorStateProps) {
  return (
    <section className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-red-500">
        !
      </div>
      <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-ink-500">{description}</p>
      {action ? <div className="mt-6 w-full max-w-xs">{action}</div> : null}
    </section>
  );
}
