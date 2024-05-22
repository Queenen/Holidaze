import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStatus } from "./UserStatus";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUserStatus();

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
