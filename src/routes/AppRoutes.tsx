import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import LoginPage from "../pages/auth/LoginPage";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Layouts
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";

// Pages (main)
import DashboardPage from "../pages/dashboard/DashboardPage";
import HistoryPage from "../pages/history/HistoryPage";
import IssuesPage from "../pages/issues/IssuesPage";
import ScorePage from "../pages/score/ScorePage";
import SubscriptionPage from "../pages/subscription/SubscriptionPage";
import SubscriptionPlanPage from "../pages/subscriptionPlan/SubscriptionPlanPage";

// Settings layout + sections
import SettingsLayout from "../pages/settings/SettingsLayout";
import SettingsAccountPage from "../pages/settings/sections/SettingsAccountPage";
import SettingsNotificationPage from "../pages/settings/sections/SettingsNotificationPage";
import SettingsOrganizationPage from "../pages/settings/sections/SettingsOrganizationPage";
import SettingsSecurityPage from "../pages/settings/sections/SettingsSecurityPage";
import SettingsUserAuditLogPage from "../pages/settings/sections/SettingsUserAuditLogPage";
import SettingsUserManagementPage from "../pages/settings/sections/SettingsUserManagementPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* APP routes */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/subscription-plan" element={<SubscriptionPlanPage />} />

        {/* SETTINGS nested routes */}
        <Route path="/settings" element={<SettingsLayout />}>
          <Route index element={<Navigate to="account" replace />} />

          <Route path="account" element={<SettingsAccountPage />} />
          <Route path="notification" element={<SettingsNotificationPage />} />
          <Route path="organization" element={<SettingsOrganizationPage />} />
          <Route path="security" element={<SettingsSecurityPage />} />
          <Route path="audit" element={<SettingsUserAuditLogPage />} />
          <Route path="users" element={<SettingsUserManagementPage />} />
        </Route>
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
