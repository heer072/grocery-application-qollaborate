import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";
import { useLocationStore } from "../../stores/location.store";

interface ProtectedRouteProps {
  children: ReactNode;
  requireLocation?: boolean;
}

export function ProtectedRoute({ children, requireLocation = false }: ProtectedRouteProps) {
  const routerLocation = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const selectedLocation = useLocationStore((state) => state.selectedLocation);

  if (!isAuthenticated) {
    // In this assignment auth is simulated with Zustand, so unauthenticated users go to login.
    return <Navigate replace state={{ from: routerLocation }} to="/auth/login" />;
  }

  if (requireLocation && !selectedLocation) {
    // The grocery flow requires a delivery location before showing the main app.
    return <Navigate replace to="/location" />;
  }

  return children;
}
