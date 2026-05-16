import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ action, description, title }: EmptyStateProps) {
  return (
    <section className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-brand-50 text-2xl text-brand-600">
        --
      </div>
      <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
      {description ? <p className="mt-2 max-w-sm text-sm leading-6 text-ink-500">{description}</p> : null}
      {action ? <div className="mt-6 w-full max-w-xs">{action}</div> : null}
    </section>
  );
}
