import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ user }) => {
  if (user === undefined) {
    return null;
  }

  if (!user || user.status !== "active") {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
