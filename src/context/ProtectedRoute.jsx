import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStatus } from "./UserStatus";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUserStatus();

  if (!isSignedIn) {
    // Redirect to the home page or another specified route if not signed in
    return <Navigate to="*" replace />;
  }

  return children;
};

export default ProtectedRoute;
