import { useMemo, useState } from "react";
import { useOrganization } from "../../context/OrganizationContext";
import "../../styles/pages.css";
import "./History.css";

type EventType = "new" | "resolved" | "changed";

type HistoryEvent = {
  id: string;
  type: EventType;
  title: string;
  asset: string;
  date: string;
  detail: string;
};

export default function HistoryPage() {
  const { org } = useOrganization();
  const domain = org?.domain ?? "your-org.com";

  const [filter, setFilter] = useState<EventType | "all">("all");

  const events: HistoryEvent[] = useMemo(
    () => [
      {
        id: "HIS-1001",
        type: "new",
        title: "New vulnerability detected",
        asset: "api." + (org?.domain ?? "your-org.com"),
        date: "2026-01-20",
        detail: "พบช่องโหว่ใหม่บน endpoint ที่เปิดสู่ภายนอก ต้องจัดลำดับความสำคัญแก้ไข",
      },
      {
        id: "HIS-1002",
        type: "changed",
        title: "Attack surface updated",
        asset: "203.0.113.10",
        date: "2026-01-18",
        detail: "มีการเปลี่ยนแปลงของพอร์ต/บริการที่เปิดใช้งาน ควรตรวจสอบความจำเป็น",
      },
      {
        id: "HIS-1003",
        type: "resolved",
        title: "Issue resolved",
        asset: "www." + (org?.domain ?? "your-org.com"),
        date: "2026-01-12",
        detail: "แก้ไขการตั้งค่า security headers แล้ว และผ่านการตรวจสอบซ้ำ",
      },
      {
        id: "HIS-1004",
        type: "new",
        title: "Potential dangling DNS record",
        asset: "old-service." + (org?.domain ?? "your-org.com"),
        date: "2026-01-10",
        detail: "ตรวจพบ record ที่อาจเสี่ยง takeover ควรลบหรือปรับชี้ปลายทางที่ถูกต้อง",
      },
    ],
    [(domain ?? "your-org.com"),]
  );

  const filtered = events.filter((e) => (filter === "all" ? true : e.type === filter));

  return (
    <div className="page">
      <div className="row">
        <div>
          <h1 className="page-title">History</h1>
          <div className="muted">
            Organization: <b>{org?.name}</b> • {(org?.domain ?? "your-org.com")}
          </div>
        </div>

        <div className="history-actions">
          <select className="select" value={filter} onChange={(e) => setFilter(e.target.value as any)}>
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="changed">Changed</option>
            <option value="resolved">Resolved</option>
          </select>
          <button className="btn ghost">Export</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="timeline">
          {filtered.map((e) => (
            <div key={e.id} className="timeline-item">
              <div className={`dot ${e.type}`} />
              <div className="timeline-content">
                <div className="row">
                  <div>
                    <b>{e.title}</b>
                    <div className="muted mono">{e.asset}</div>
                  </div>
                  <div className="right-col">
                    <span className={`pill ${e.type}`}>{e.type}</span>
                    <span className="mono">{e.date}</span>
                  </div>
                </div>
                <p className="timeline-detail">{e.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
