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
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </Layout>
        }
      />
      <Route
        path="/venues"
        element={
          <Layout>
            <VenuesPage />
          </Layout>
        }
      />
      <Route
        path="/venue/*"
        element={
          <Layout>
            <VenuePage />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NotFoundPage />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRouter;
