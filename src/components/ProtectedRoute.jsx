import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="spinner" aria-label="Loading" />;
  if (!token) return <Navigate to="/auth/login" replace state={{ from: location }} />;
  return children;
}
