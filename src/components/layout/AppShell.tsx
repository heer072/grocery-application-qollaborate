import { Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation";
import { DesktopLayout } from "./DesktopLayout";
import { MobileLayout } from "./MobileLayout";

export function AppShell() {
  return (
    <DesktopLayout>
      <main className="mx-auto min-h-screen w-full max-w-md pb-28 lg:max-w-7xl lg:px-8 lg:pb-12">
        <MobileLayout>
          <Outlet />
        </MobileLayout>
      </main>
      <BottomNavigation />
    </DesktopLayout>
  );
}
