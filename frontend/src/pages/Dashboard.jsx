import { FiFeather, FiMapPin, FiTag, FiCheckCircle, FiCalendar, FiPlus, FiTrendingUp, FiFileText } from "react-icons/fi";
import PageHeader from "../components/common/PageHeader";
import ActionButton from "../components/common/ActionButton";
import StatCard from "../components/common/StatCard";
import Panel from "../components/common/Panel";
import DataTable from "../components/common/DataTable";
import StatusBadge from "../components/common/StatusBadge";
const updates = [
 {crop:"Rice", market:"Antipolo Public Market", price:"₱45.00", date:"2026-08-24"},
 {crop:"Rice", market:"Cainta Public Market", price:"₱47.00", date:"2026-08-23"},
 {crop:"Rice", market:"Binangonan Public Market", price:"₱43.00", date:"2026-08-22"},
 {crop:"Rice", market:"Taytay Public Market", price:"₱48.00", date:"2026-08-21"},
 {crop:"Rice", market:"Angono Public Market", price:"₱44.00", date:"2026-08-20"},
];
const validation = [{crop:"Rice",market:"Binangonan Public Market",price:"₱43.00",date:"2026-08-22",status:"Pending"},{crop:"Tomato",market:"Angono Public Market",price:"₱64.00",date:"2026-08-19",status:"Pending"}];
const cols=[{key:"crop",label:"Crop"},{key:"market",label:"Market"},{key:"price",label:"Price/kg"},{key:"date",label:"Date"}];
function Dashboard(){return <><PageHeader title="MAO Dashboard" description="Overview of agricultural records and validation activity for the Municipal Agriculture Office."><ActionButton icon={FiPlus}>Add Price Record</ActionButton></PageHeader><div className="stats-grid"><StatCard label="Available Crops" value="8" helper="Active crop records" icon={FiFeather}/><StatCard label="Markets" value="7" helper="Active markets" icon={FiMapPin}/><StatCard label="Recent Prices" value="20" helper="Recent records" icon={FiTag}/><StatCard label="Pending Validation" value="2" helper="Requires review" icon={FiCheckCircle}/><StatCard label="Updated Today" value="0" helper="Price updates" icon={FiCalendar}/></div><div className="dashboard-grid"><div style={{display:"grid",gap:12}}><Panel title="Records Requiring Validation" meta="Open validation" flush><DataTable columns={[{key:"crop",label:"Crop"},{key:"market",label:"Market"},{key:"price",label:"Price/kg"},{key:"date",label:"Date"},{key:"status",label:"Status"}]} rows={validation} renderCell={(row,c)=>c.key==="status"?<StatusBadge status={row.status}/>:row[c.key]}/></Panel><Panel title="Recent Price Updates" meta="Latest records" flush><DataTable columns={cols} rows={updates}/></Panel></div><div style={{display:"grid",gap:12,alignContent:"start"}}><Panel title="Quick Access" meta="MAO functions"><div className="quick-grid">{[[FiFeather,"Manage Crops"],[FiMapPin,"Manage Markets"],[FiTag,"Manage Prices"],[FiCheckCircle,"Validate Prices"],[FiTrendingUp,"View Forecasts"],[FiFileText,"Reports"]].map(([Icon,label])=><div className="quick-action" key={label}><span className="quick-icon"><Icon/></span>{label}</div>)}</div></Panel><Panel title="Recent MAO Activity" meta="Recent activity"><div className="activity-list">{["Rice price updated","Crop record edited","Market activated","Farmer account activated"].map((item,i)=><div className="activity-item" key={item}><span className="activity-icon"><FiTag/></span><div><div className="activity-title">{item}</div><div className="activity-detail">Sample activity • {i===0?"10 min ago":i===1?"42 min ago":i===2?"2 hrs ago":"Yesterday"}</div></div></div>)}</div></Panel></div></div></>}
export default Dashboard;
