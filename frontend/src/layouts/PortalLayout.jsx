import { Outlet } from "react-router-dom";
import PortalSidebar from "../components/common/PortalSidebar";
import PortalTopbar from "../components/common/PortalTopbar";
function PortalLayout() { return <div className="portal-shell"><PortalSidebar/><div className="portal-main"><PortalTopbar/><main className="portal-content"><Outlet/></main></div></div>; }
export default PortalLayout;
