import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ROLES } from '../lib/constants';

export default function RoleGuard({ role, children }) {
  const { user } = useAuth();
  if (!user) return null;

  if (role && user.role !== role) {
    if (user.role === ROLES.DONOR) return <Navigate to="/donor/dashboard" replace />;
    if (user.role === ROLES.COLLECTOR) return <Navigate to="/collector/requests" replace />;
    if (user.role === ROLES.ADMIN) return <Navigate to="/admin/users" replace />;
    return <Navigate to="/" replace />;
  }
  return children;
}
