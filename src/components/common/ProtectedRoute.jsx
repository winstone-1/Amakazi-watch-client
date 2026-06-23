import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Spin } from 'antd';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { token, role, is2faVerified } = useAuth();

  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If 2FA is not yet verified but the token exists, redirect to 2FA verification
  if (!is2faVerified) {
    return <Navigate to="/2fa" replace />;
  }

  // If roles are specified, check if user has permission
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the child components
  return <Outlet />;
};

export default ProtectedRoute;
