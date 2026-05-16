import type { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return <div className="mx-auto w-full max-w-md lg:max-w-none">{children}</div>;
}
