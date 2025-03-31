import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

export const AuthRedirect = ({ user }) => {

    if (user && user.status === "active") {
      return <Navigate to="/" replace />;
    }
  
    return <Outlet />;
}
