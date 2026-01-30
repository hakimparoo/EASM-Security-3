import { NavLink, Outlet } from "react-router-dom";
import "./Settings.css";

export default function SettingsLayout() {
  return (
    <div className="stg-wrap">
      <div className="stg-header">
        <div className="stg-title">
          <span className="stg-gear" aria-hidden>⚙️</span>
          <h1>Settings</h1>
        </div>
        <p className="stg-subtitle">
          Manage account, notification, security, and admin settings for your organization.
        </p>
      </div>

      <div className="stg-grid">
        {/* LEFT MENU */}
        <aside className="stg-side">
          <div className="stg-side-section">
            <div className="stg-side-heading">My Account</div>

            <NavLink to="/settings/account" className={({isActive}) => `stg-link ${isActive ? "active" : ""}`}>
              <span className="stg-ico" aria-hidden>👤</span>
              <span>Account</span>
            </NavLink>

            <NavLink to="/settings/notification" className={({isActive}) => `stg-link ${isActive ? "active" : ""}`}>
              <span className="stg-ico" aria-hidden>🔔</span>
              <span>Notification</span>
            </NavLink>

            <NavLink to="/settings/security" className={({isActive}) => `stg-link ${isActive ? "active" : ""}`}>
              <span className="stg-ico" aria-hidden>🛡️</span>
              <span>Security</span>
            </NavLink>
          </div>

          <div className="stg-side-section">
            <div className="stg-side-heading">Admin Setting</div>

            <NavLink to="/settings/organization" className={({isActive}) => `stg-link ${isActive ? "active" : ""}`}>
              <span className="stg-ico" aria-hidden>🏢</span>
              <span>My Organization</span>
            </NavLink>

            <NavLink to="/settings/users" className={({isActive}) => `stg-link ${isActive ? "active" : ""}`}>
              <span className="stg-ico" aria-hidden>👥</span>
              <span>User Management</span>
            </NavLink>

            <NavLink to="/settings/audit" className={({isActive}) => `stg-link ${isActive ? "active" : ""}`}>
              <span className="stg-ico" aria-hidden>📋</span>
              <span>User Audit Log</span>
            </NavLink>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="stg-main">
          <div className="stg-card">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
