


import "./Topbar.css";

type Props = {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
};

export default function Topbar({ sidebarOpen, onToggleSidebar }: Props) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="menu-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          ☰
        </button>
        <div className="topbar-title">EASM Security</div>

        {/* (optional) แสดงสถานะ */}
        <span className="topbar-pill">{sidebarOpen ? "Sidebar: ON" : "Sidebar: OFF"}</span>
      </div>

      <div className="topbar-right">
        <button className="icon-btn" aria-label="Notifications">🔔</button>
        <button className="icon-btn" aria-label="Account">👤</button>
      </div>
    </header>
  );
}
