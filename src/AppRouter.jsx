import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import VenuesPage from "./pages/VenuesPage";
import VenuePage from "./pages/VenuePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./context/ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="venues" element={<VenuesPage />} />
        <Route path="venue/*" element={<VenuePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
