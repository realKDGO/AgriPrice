import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import Brand from "../components/common/Brand";
import PortalSkeleton from "../components/common/PortalSkeleton";
import { navigation } from "../config/navigation";

export default function MainLayout(){
 const location=useLocation(); const [loading,setLoading]=useState(true);
 useEffect(()=>{ setLoading(true); const timer=setTimeout(()=>setLoading(false),260); window.scrollTo(0,0); return()=>clearTimeout(timer); },[location.pathname]);
 if(loading) return <PortalSkeleton farmer/>;
 return <div className="portal-shell farmer-portal-shell"><aside className="portal-sidebar"><div className="sidebar-brand"><Brand subtitle={navigation.portalLabel}/></div>{navigation.sections.map(section=><div key={section.label}><div className="sidebar-section">{section.label}</div><nav className="sidebar-nav">{section.items.map(({label,path,icon:Icon})=><NavLink className="sidebar-link" to={path} end={path==="/"} key={path}><Icon/><span>{label}</span></NavLink>)}</nav></div>)}</aside><div className="portal-main"><header className="portal-topbar"><span className="portal-topbar-title">{navigation.topbarTitle}</span><NavLink className="user-pill" to="/notifications" aria-label="Notifications"><FiBell/><span>Notifications</span></NavLink></header><main className="portal-content"><Outlet/></main></div><nav className="farmer-bottom-nav">{navigation.bottom.map(({label,path,icon:Icon})=><NavLink to={path} end={path==="/"} key={path}><Icon/><span>{label}</span></NavLink>)}</nav></div>;
}
