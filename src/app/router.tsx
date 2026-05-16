import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { AuthLayout } from "../components/layout/AuthLayout";
import { ProtectedRoute } from "../components/routing/ProtectedRoute";
import { EmailLoginPage } from "../features/auth/EmailLoginPage";
import { LoginPage } from "../features/auth/LoginPage";
import { OtpVerificationPage } from "../features/auth/OtpVerificationPage";
import { SignupPage } from "../features/auth/SignupPage";
import { CartPage } from "../features/cart/CartPage";
import { OrderFailurePage } from "../features/checkout/OrderFailurePage";
import { OrderSuccessPage } from "../features/checkout/OrderSuccessPage";
import { FavoritesPage } from "../features/favorites/FavoritesPage";
import { HomePage } from "../features/home/HomePage";
import { LocationPage } from "../features/location/LocationPage";
import { OnboardingPage } from "../features/onboarding/OnboardingPage";
import { ProductDetailsPage } from "../features/products/ProductDetailsPage";
import { ProductListingPage } from "../features/products/ProductListingPage";
import { SearchPage } from "../features/search/SearchPage";
import { SplashPage } from "../features/placeholder/SplashPage";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public onboarding and authentication routes */}
      <Route path="/" element={<SplashPage />} />
      <Route path="/splash" element={<Navigate replace to="/" />} />

      <Route element={<AuthLayout />}>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/email-login" element={<EmailLoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/auth/verify-otp" element={<OtpVerificationPage />} />
        <Route
          path="/location"
          element={
            <ProtectedRoute>
              <LocationPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Main app routes are protected by simulated auth and selected location. */}
      <Route
        path="/app"
        element={
          <ProtectedRoute requireLocation>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to="/app/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="categories" element={<Navigate replace to="/app/categories/beverages" />} />
        <Route path="categories/:categoryId" element={<ProductListingPage />} />
        <Route path="products/:productId" element={<ProductDetailsPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout/success" element={<OrderSuccessPage />} />
        <Route path="checkout/failure" element={<OrderFailurePage />} />
      </Route>

      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
