import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = ({ user }) => {
  if (user === null) {
    return null;
  }

  return user?.status == "active" && user?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
}
