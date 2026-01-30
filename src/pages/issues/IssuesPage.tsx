import { useMemo, useState } from "react";
import { useOrganization } from "../../context/OrganizationContext";
import "../../styles/pages.css";
import "./Issues.css";

type Issue = {
  id: string;
  title: string;
  asset: string;
  category: string;
  severity: "high" | "medium" | "low" | "info";
  status: "open" | "in_progress" | "fixed";
  detectedAt: string;
  detail: string;
};

const severityOrder: Record<Issue["severity"], number> = {
  high: 1,
  medium: 2,
  low: 3,
  info: 4,
};

export default function IssuesPage() {
  const { org } = useOrganization();
  const [query, setQuery] = useState("");
   const domain = org?.domain
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const issues: Issue[] = useMemo(
    () => [
      {
        id: "ISS-001",
        title: "Public service exposes outdated software",
        asset: "api." + domain,
        category: "Vulnerability",
        severity: "high",
        status: "open",
        detectedAt: "2026-01-20",
        detail:
          "พบเวอร์ชันซอฟต์แวร์เก่าบนบริการที่ public-facing ทำให้มีโอกาสถูกโจมตีจาก CVE ที่เป็นที่รู้จัก",
      },
      {
        id: "ISS-002",
        title: "Missing security headers (CSP/Frame options)",
        asset: "www." + domain,
        category: "Web Security",
        severity: "medium",
        status: "in_progress",
        detectedAt: "2026-01-18",
        detail:
          "ขาดการตั้งค่า security headers ส่งผลต่อการป้องกัน clickjacking และ content injection",
      },
      {
        id: "ISS-003",
        title: "Dangling DNS record takeover risk",
        asset: "old-service." + domain,
        category: "DNS Hygiene",
        severity: "medium",
        status: "open",
        detectedAt: "2026-01-10",
        detail:
          "มี record ชี้ไปยังบริการที่ไม่ถูกใช้งานแล้ว ทำให้เกิดความเสี่ยง domain takeover ได้",
      },
      {
        id: "ISS-004",
        title: "Excessive open ports on public IP",
        asset: "203.0.113.10",
        category: "Exposure",
        severity: "low",
        status: "open",
        detectedAt: "2026-01-05",
        detail:
          "เปิดพอร์ตต่อสาธารณะมากเกินจำเป็น ควรทำ inventory และปิดที่ไม่ต้องใช้",
      },
    ],
    [domain]
  );

  const filtered = issues
    .filter((i) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        i.title.toLowerCase().includes(q) ||
        i.asset.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.id.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  return (
    <div className="page">
      <div className="row">
        <div>
          <h1 className="page-title">Issues</h1>
          <div className="muted">
            Organization: <b>{org?.name}</b> • {domain}
          </div>
        </div>

        <div className="issues-actions">
          <input
            className="input"
            placeholder="Search issue / asset / category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn ghost">Filter</button>
          <button className="btn primary">New ticket</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="issues-table">
          <div className="issues-head">
            <span>ID</span>
            <span>Issue</span>
            <span>Asset</span>
            <span>Category</span>
            <span>Severity</span>
            <span>Status</span>
            <span>Detected</span>
          </div>

          {filtered.map((i) => {
            const expanded = expandedId === i.id;
            return (
              <div key={i.id} className="issues-row-wrap">
                <button
                  className={`issues-row ${expanded ? "expanded" : ""}`}
                  onClick={() => setExpandedId(expanded ? null : i.id)}
                >
                  <span className="mono">{i.id}</span>
                  <span className="title">{i.title}</span>
                  <span className="mono">{i.asset}</span>
                  <span>{i.category}</span>
                  <span className={`badge ${i.severity}`}>{i.severity}</span>
                  <span className={`status ${i.status}`}>{i.status}</span>
                  <span className="mono">{i.detectedAt}</span>
                </button>

                {expanded && (
                  <div className="issues-detail">
                    <div className="detail-box">
                      <b>Description</b>
                      <p>{i.detail}</p>
                    </div>

                    <div className="detail-actions">
                      <button className="btn">View evidence</button>
                      <button className="btn ghost">Assign</button>
                      <button className="btn primary">Mark as fixed</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
