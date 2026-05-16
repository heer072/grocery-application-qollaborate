import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <main className="min-h-screen bg-white text-ink-900">
      <div className="mx-auto min-h-screen w-full max-w-md bg-white">
        <Outlet />
      </div>
    </main>
  );
}
