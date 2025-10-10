import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../ui/Navbar.jsx';
import { RoleGuard } from './RoleGuard.jsx';

import { HomePage } from '../pages/HomePage.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';

import { DonorDashboard } from '../pages/donor/DonorDashboard.jsx';
import { DonationFormPage } from '../pages/donor/DonationFormPage.jsx';
import { DonationDetailPage } from '../pages/donor/DonationDetailPage.jsx';

import { CollectorRequestsPage } from '../pages/collector/CollectorRequestsPage.jsx';
import { CollectorActivePage } from '../pages/collector/CollectorActivePage.jsx';

import { AdminMapPage } from '../pages/admin/AdminMapPage.jsx';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage.jsx';
import { AdminAnalyticsPage } from '../pages/admin/AdminAnalyticsPage.jsx';

import { SettingsPage } from '../pages/SettingsPage.jsx';

function AppLayout({ children }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-4">{children}</main>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
      <Route path="/auth/login" element={<AppLayout><LoginPage /></AppLayout>} />

      <Route
        path="/donor/dashboard"
        element={<RoleGuard allow={["donor"]}><AppLayout><DonorDashboard /></AppLayout></RoleGuard>}
      />
      <Route
        path="/donor/new"
        element={<RoleGuard allow={["donor"]}><AppLayout><DonationFormPage /></AppLayout></RoleGuard>}
      />
      <Route
        path="/donor/donations/:id"
        element={<RoleGuard allow={["donor"]}><AppLayout><DonationDetailPage /></AppLayout></RoleGuard>}
      />

      <Route
        path="/collector/requests"
        element={<RoleGuard allow={["collector"]}><AppLayout><CollectorRequestsPage /></AppLayout></RoleGuard>}
      />
      <Route
        path="/collector/active"
        element={<RoleGuard allow={["collector"]}><AppLayout><CollectorActivePage /></AppLayout></RoleGuard>}
      />

      <Route
        path="/admin/map"
        element={<RoleGuard allow={["admin"]}><AppLayout><AdminMapPage /></AppLayout></RoleGuard>}
      />
      <Route
        path="/admin/users"
        element={<RoleGuard allow={["admin"]}><AppLayout><AdminUsersPage /></AppLayout></RoleGuard>}
      />
      <Route
        path="/admin/analytics"
        element={<RoleGuard allow={["admin"]}><AppLayout><AdminAnalyticsPage /></AppLayout></RoleGuard>}
      />

      <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
