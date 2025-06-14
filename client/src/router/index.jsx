import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/router/ProtectedRoute";
import { LoadingPage } from "@/pages/LoadingPage/LoadingPage";
import { MainPage } from "@/pages/MainPage/MainPage";
import { ViewOnlyPage } from "@/pages/ViewOnlyPage/ViewOnlyPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { AuthPage } from "@/pages/AuthPage/AuthPage";
import { AuthCallbackPage } from "@/pages/AuthPage/AuthCallbackPage";

export const AppRouter = () => {
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/snippet/:snippetId" element={<ViewOnlyPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainPage />} />
        </Route>

        {/* Catch-all for Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </React.Suspense>
  );
};
