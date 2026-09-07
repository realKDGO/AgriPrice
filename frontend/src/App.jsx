import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PortalLayout from "./layouts/PortalLayout";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/mao/Dashboard";
import CropManagement from "./pages/mao/CropManagement";
import MarketManagement from "./pages/mao/MarketManagement";
import CropPrices from "./pages/mao/CropPrices";
import PriceValidation from "./pages/mao/PriceValidation";
import HistoricalRecords from "./pages/mao/HistoricalRecords";
import ForecastInformation from "./pages/mao/ForecastInformation";
import ReportsAnalytics from "./pages/mao/ReportsAnalytics";
import Settings from "./pages/mao/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route element={<PortalLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/crops" element={<CropManagement />} />
          <Route path="/markets" element={<MarketManagement />} />
          <Route path="/prices" element={<CropPrices />} />
          <Route path="/validation" element={<PriceValidation />} />
          <Route path="/history" element={<HistoricalRecords />} />
          <Route path="/forecast" element={<ForecastInformation />} />
          <Route path="/reports" element={<ReportsAnalytics />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
