import { PrimaryButton } from "../../components/common/PrimaryButton";

interface PlaceholderPageProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PlaceholderPage({ description, eyebrow, title }: PlaceholderPageProps) {
  return (
    <section className="flex min-h-screen flex-col px-6 py-10 lg:min-h-[calc(100vh-88px)] lg:px-0">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center lg:max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-ink-900 lg:text-5xl">{title}</h1>
        <p className="mt-4 text-sm leading-6 text-ink-500 lg:text-base">{description}</p>
        <div className="mt-8 max-w-xs">
          <PrimaryButton>Foundation Ready</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
