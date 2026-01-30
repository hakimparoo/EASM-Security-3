

import { NavLink } from "react-router-dom";
import "./Sidebar.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: Props) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div className="sidebar-top">
        {/* <div className="sidebar-brand">EASM</div> */}
        {/* <div className="sidebar-brand"></div> */}

        {/* ✅ ปุ่มปิด (ใช้บนจอเล็กเป็นหลัก) */}
        <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
          ✕
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
          <span className="icon">🏠</span>
          <span className="label">Dashboard</span>
        </NavLink>

        <NavLink to="/score" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
          <span className="icon">📊</span>
          <span className="label">Score</span>
        </NavLink>

        <NavLink to="/issues" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
          <span className="icon">⚠️</span>
          <span className="label">Issues</span>
        </NavLink>

        <NavLink to="/history" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
          <span className="icon">🕒</span>
          <span className="label">History</span>
        </NavLink>

        <NavLink to="/subscription" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
          <span className="icon">💎</span>
          <span className="label">Subscription</span>
        </NavLink>

        {/* ✅ Settings ให้เข้าแท็บแรก */}
        <NavLink to="/settings/account" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
          <span className="icon">⚙️</span>
          <span className="label">Settings</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="mini-hint">External Attack Surface Management</div>
      </div>
    </aside>
  );
}
