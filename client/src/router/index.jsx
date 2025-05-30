import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingPage } from "@/pages/LoadingPage/LoadingPage";
import { MainPage } from "@/pages/MainPage/MainPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";

export const AppRouter = () => {
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainPage />} />

        {/* Catch-all for Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </React.Suspense>
  );
};
