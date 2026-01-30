import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import "./AppLayout.css";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // ✅ ปรับอัตโนมัติเมื่อจอเล็ก: เริ่มต้นปิด เพื่อไม่บัง content
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const apply = () => setSidebarOpen(!mq.matches); // mobile/tablet => false, desktop => true
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* ✅ overlay backdrop: โชว์เฉพาะจอเล็กและตอน sidebar เปิด */}
      <div
        className={`sidebar-backdrop ${sidebarOpen ? "show" : ""}`}
        onClick={closeSidebar}
      />

      <div className={`app-main ${sidebarOpen ? "shift" : "full"}`}>
        <Topbar sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
