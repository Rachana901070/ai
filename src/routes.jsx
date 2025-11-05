import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Login from './pages/auth/Login.jsx';
import Dashboard from './pages/donor/Dashboard.jsx';
import NewDonation from './pages/donor/NewDonation.jsx';
import DonationDetail from './pages/donor/DonationDetail.jsx';
import Requests from './pages/collector/Requests.jsx';
import ActivePickup from './pages/collector/ActivePickup.jsx';
import LiveMap from './pages/admin/LiveMap.jsx';
import Users from './pages/admin/Users.jsx';
import Analytics from './pages/admin/Analytics.jsx';
import Settings from './pages/Settings.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RoleGuard from './components/RoleGuard.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import './styles/global.css';

function Shell({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="container">{children}</main>
      <Footer />
    </div>
  );
}

export const router = createBrowserRouter([
  { path: '/', element: <Shell><Landing /></Shell> },
  { path: '/auth/login', element: <Shell><Login /></Shell> },
  {
    path: '/donor/dashboard',
    element: (
      <ProtectedRoute>
        <RoleGuard role="DONOR">
          <Shell><Dashboard /></Shell>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/donor/new',
    element: (
      <ProtectedRoute>
        <RoleGuard role="DONOR">
          <Shell><NewDonation /></Shell>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/donor/donations/:id',
    element: (
      <ProtectedRoute>
        <RoleGuard role="DONOR">
          <Shell><DonationDetail /></Shell>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/collector/requests',
    element: (
      <ProtectedRoute>
        <RoleGuard role="COLLECTOR">
          <Shell><Requests /></Shell>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/collector/active',
    element: (
      <ProtectedRoute>
        <RoleGuard role="COLLECTOR">
          <Shell><ActivePickup /></Shell>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/map',
    element: (
      <ProtectedRoute>
        <RoleGuard role="ADMIN">
          <Shell><LiveMap /></Shell>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute>
        <RoleGuard role="ADMIN">
          <Shell><Users /></Shell>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/analytics',
    element: (
      <ProtectedRoute>
        <RoleGuard role="ADMIN">
          <Shell><Analytics /></Shell>
        </RoleGuard>
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <Shell><Settings /></Shell>
      </ProtectedRoute>
    ),
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
