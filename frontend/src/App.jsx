import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PortalLayout from "./layouts/PortalLayout";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/admin/Dashboard";
import UserAccounts from "./pages/admin/UserAccounts";
import MaoAccounts from "./pages/admin/MaoAccounts";
import AuditLogs from "./pages/admin/AuditLogs";
import SystemMonitoring from "./pages/admin/SystemMonitoring";
import Security from "./pages/admin/Security";
import BackupRecovery from "./pages/admin/BackupRecovery";
import SystemSettings from "./pages/admin/SystemSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route element={<PortalLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/users" element={<UserAccounts />} />
          <Route path="/mao-accounts" element={<MaoAccounts />} />
          <Route path="/activity" element={<AuditLogs />} />
          <Route path="/monitoring" element={<SystemMonitoring />} />
          <Route path="/security" element={<Security />} />
          <Route path="/backups" element={<BackupRecovery />} />
          <Route path="/settings" element={<SystemSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
