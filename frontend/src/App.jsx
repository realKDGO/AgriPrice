import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/farmer/Dashboard";
import CropPrices from "./pages/farmer/CropPrices";
import HistoricalPrices from "./pages/farmer/HistoricalPrices";
import Forecast from "./pages/farmer/Forecast";
import MarketRecommendation from "./pages/farmer/MarketRecommendation";
import ProfitEstimation from "./pages/farmer/ProfitEstimation";
import ReportsAnalytics from "./pages/farmer/ReportsAnalytics";
import More from "./pages/farmer/More";
import Profile from "./pages/farmer/Profile";
import Settings from "./pages/farmer/Settings";
import Notifications from "./pages/farmer/Notifications";
import Help from "./pages/farmer/Help";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/prices" element={<CropPrices />} />
          <Route path="/historical" element={<HistoricalPrices />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/markets" element={<MarketRecommendation />} />
          <Route path="/profit" element={<ProfitEstimation />} />
          <Route path="/reports" element={<ReportsAnalytics />} />
          <Route path="/more" element={<More />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/help" element={<Help />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
