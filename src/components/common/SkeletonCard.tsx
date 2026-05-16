interface SkeletonCardProps {
  lines?: number;
}

export function SkeletonCard({ lines = 2 }: SkeletonCardProps) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-4">
      <div className="mb-4 h-24 animate-pulse rounded-2xl bg-ink-100" />
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            className={[
              "h-3 animate-pulse rounded-full bg-ink-100",
              index === lines - 1 ? "w-2/3" : "w-full",
            ].join(" ")}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
