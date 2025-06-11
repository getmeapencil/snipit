import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { LoadingPage } from "@/pages/LoadingPage/LoadingPage";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingPage />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};
