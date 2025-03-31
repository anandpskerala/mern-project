import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ProtectedRoute } from "./ProtectedRoute";
import { AuthRedirect } from "./AuthRedirect";
import { AdminRoute } from "./AdminRoute";
import { HomePage } from "../pages/HomePage";
import { AuthPage } from "../pages/AuthPage";
import { AdminPage } from '../pages/AdminPage';
import { ProfilePage } from '../pages/ProfilePage';
import { Loader } from '../components/Loader';


export const AppRoutes = () => {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) return <Loader />;
  return (
    <Routes>
      <Route element={<AuthRedirect user={user} />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/" element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>

      <Route element={<AdminRoute user={user} />}>
        <Route path='/admin/dashboard' element={<AdminPage />} />
      </Route>
    </Routes>
  );
}
