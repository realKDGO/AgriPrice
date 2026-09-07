import { FiGrid, FiTag, FiClock, FiTrendingUp, FiMapPin, FiDollarSign, FiBarChart2, FiMoreHorizontal, FiUser, FiSettings, FiHelpCircle } from "react-icons/fi";
export const navigation = {
 portalLabel:"Farmer Portal", topbarTitle:"Farmer Dashboard", userInitials:"FR", userLabel:"Farmer",
 sections:[
  {label:"Overview",items:[{label:"Dashboard",path:"/",icon:FiGrid}]},
  {label:"Market Data",items:[{label:"Crop Prices",path:"/prices",icon:FiTag},{label:"Historical Prices",path:"/historical",icon:FiClock},{label:"Forecast",path:"/forecast",icon:FiTrendingUp}]},
  {label:"Decision Support",items:[{label:"Market Recommendation",path:"/markets",icon:FiMapPin},{label:"Profit Estimation",path:"/profit",icon:FiDollarSign},{label:"Reports & Analytics",path:"/reports",icon:FiBarChart2}]},
  {label:"Account",items:[{label:"More",path:"/more",icon:FiMoreHorizontal},{label:"Profile",path:"/profile",icon:FiUser},{label:"Settings",path:"/settings",icon:FiSettings},{label:"Help",path:"/help",icon:FiHelpCircle}]}
 ],
 bottom:[{label:"Home",path:"/",icon:FiGrid},{label:"Prices",path:"/prices",icon:FiTag},{label:"Forecast",path:"/forecast",icon:FiTrendingUp},{label:"Markets",path:"/markets",icon:FiMapPin},{label:"More",path:"/more",icon:FiMoreHorizontal}]
};
