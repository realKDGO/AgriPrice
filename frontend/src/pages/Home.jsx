import {useState} from 'react';
import "../styles/home.css";
        


    const navItems = [
    "Dashboard",
    "User Accounts",
    "MAO Accounts",
    "Audit Logs",
    "System Monitoring",
    "Security",
    "Backup & Recovery",
    "System Settings",
    ];

    const summary = [
    { label: "Total user accounts", value: "10" },
    { label: "Active MAO accounts", value: "2" },
    { label: "Suspended accounts", value: "0" },
    { label: "System environment", value: "Available", },
    ];

    const services = [
    { name: "Frontend", status: "Available", ok: true },
    { name: "Backend API", status: "Not connected", ok: false },
    { name: "Database", status: "Not connected", ok: false },
    ];

    const activity = [
    { account: "AgriPrice user", action: "Added users record", date: "Sep 6, 12:29 PM" },
    { account: "Juan dela Cruz", action: "Signed in to farmer account", date: "Sep 5, 9:20 AM" },
    { account: "Elena Reyes", action: "Reviewed price submissions", date: "Sep 5, 8:00 AM" },
    { account: "System Administrator", action: "Reviewed account access", date: "Sep 4, 7:15 PM" },
    ];


    function WheatMark() {
    return (
        <svg viewBox="0 0 24 24" className="wheat-mark" aria-hidden="true">
        <path
        />
        </svg>
    );
    }

    export default function Dashboard() {
    return (
        <div className="dashboard">
        <aside className="sidebar">
            <div className="brand">
            <WheatMark />
            <span className="brand-name">AgriPrice</span>
            </div>

            <p className="nav-heading">Overview</p>
            <nav className="nav">
            {navItems.map((label) => (
                <a
                key={label}
                href="#"
                className={`nav-item${label === "Dashboard" ? " nav-item-active" : ""}`}
                >
                {label}
                </a>
            ))}
            </nav>

            <a href="#" className="nav-item signout">Sign Out</a>
        </aside>

        <main className="content">
            <header className="topbar">
            <div>
                <h1>Admin Dashboard</h1>
                <p className="subtitle">Manage accounts, review activity, and monitor the application.</p>
            </div>
            <button className="bell-btn" aria-label="Notifications">
                <svg viewBox="0 0 24 24" className="icon"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8zM10.3 21a2 2 0 0 0 3.4 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            </header>


            <section className="summary-strip">
            {summary.map((item) => (
                <div className="summary-cell" key={item.label}>
                <span className="summary-label">{item.label}</span>
                <span className="summary-value">{item.value}</span>
                {item.note && <span className="summary-note">{item.note}</span>}
                </div>
            ))}
            </section>

            <section className="mid-grid">
            <div className="panel">
                <div className="panel-header">
                <h2>Service status</h2>
                <a href="#" className="link">View details</a>
                </div>
                <ul className="service-list">
                {services.map((s) => (
                    <li key={s.name} className="service-row">
                    <span>{s.name}</span>
                    <span className={`status${s.ok ? " status-ok" : ""}`}>
                        <i className="status-dot" />
                        {s.status}
                    </span>
                    </li>
                ))}
                </ul>
            </div>

            <div className="panel">
                <div className="panel-header">
                <h2>Access administration</h2>
                </div>
                <p className="access-copy">
                Review account status and role responsibilities. Agricultural
                records are managed in the MAO Account.
                </p>
                <div className="access-actions">
                <button className="btn">User accounts</button>
                <button className="btn">Roles &amp; access</button>
                </div>
            </div>
            </section>

            <section className="panel ledger">
            <div className="panel-header">
                <h2>Recent system activity</h2>
                <a href="#" className="link">All audit logs</a>
            </div>
            <table className="ledger-table">
                <thead>
                <tr>
                    <th>Account</th>
                    <th>Activity</th>
                    <th>When</th>
                    <th>Result</th>
                </tr>
                </thead>
                <tbody>
                {activity.map((row, i) => (
                    <tr key={i}>
                    <td>{row.account}</td>
                    <td>{row.action}</td>
                    <td className="ledger-date">{row.date}</td>
                    <td><span className="status status-ok"><i className="status-dot" />Success</span></td>
                    </tr>
                ))}
                </tbody>
            </table>
            </section>
        </main>
        </div>
);
}
