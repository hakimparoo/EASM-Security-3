import { useMemo, useState } from "react";
import { useOrganization } from "../../context/OrganizationContext";
import "../../styles/pages.css";
import "./Score.css";

type Category = {
  key: string;
  title: string;
  weight: number;
  status: "high" | "medium" | "low" | "info";
  description: string;
  findings: string[];
};

export default function ScorePage() {
  const { org } = useOrganization();

  const [active, setActive] = useState<string>("exposure");

  const categories: Category[] = useMemo(
    () => [
      {
        key: "exposure",
        title: "Exposure / Attack Surface",
        weight: 25,
        status: "medium",
        description:
          "จำนวน asset ที่เปิดเผยสู่ภายนอก (domains, subdomains, IPs, ports, services) และความเสี่ยงจากการเปิดบริการที่ไม่จำเป็น",
        findings: [
          "ตรวจพบ subdomain จำนวนมากที่ไม่มี owner ชัดเจน",
          "มี service ที่เปิด port ต่อสาธารณะโดยไม่จำเป็น",
          "พบ assets เก่าที่ยังออนไลน์อยู่ (legacy endpoints)",
        ],
      },
      {
        key: "vuln",
        title: "Vulnerability",
        weight: 30,
        status: "high",
        description:
          "ช่องโหว่ที่ตรวจพบจากมุมมองภายนอก เช่น CVE, misconfiguration, outdated software และความรุนแรงตาม CVSS",
        findings: [
          "พบช่องโหว่ระดับ High บนบริการ public-facing",
          "เวอร์ชันซอฟต์แวร์เก่าเกิน recommended baseline",
          "TLS config ยังไม่ตรง best practice",
        ],
      },
      {
        key: "web",
        title: "Web Security",
        weight: 15,
        status: "medium",
        description:
          "ความปลอดภัยของเว็บ/แอป เช่น headers, cookies, auth patterns, sensitive endpoints และ OWASP-style checks",
        findings: [
          "Security headers บางตัวขาด (เช่น CSP/Frame options)",
          "ตรวจพบ endpoint ที่ควรจำกัดการเข้าถึง",
        ],
      },
      {
        key: "dns",
        title: "DNS / Domain Hygiene",
        weight: 10,
        status: "low",
        description:
          "การตั้งค่า DNS/Domain ที่ถูกต้อง เช่น SPF/DKIM/DMARC, dangling DNS, takeover risk, records hygiene",
        findings: [
          "SPF/DMARC ตั้งค่าพื้นฐานถูกต้องแล้ว",
          "ยังควรตรวจ dangling record เพิ่มเติมเป็นรอบๆ",
        ],
      },
      {
        key: "leak",
        title: "Data Leak Signals",
        weight: 10,
        status: "medium",
        description:
          "สัญญาณการรั่วไหลจากภายนอก เช่น exposed credentials, public buckets, leaked docs, misconfigured repos",
        findings: [
          "ควรตรวจชุดรหัสผ่านรั่วไหลที่เกี่ยวข้องกับโดเมน",
          "ควรตั้ง alert เมื่อพบข้อมูลหลุดใหม่",
        ],
      },
      {
        key: "brand",
        title: "Brand / Phishing Risk",
        weight: 10,
        status: "info",
        description:
          "ความเสี่ยงด้าน phishing/typosquat/brand abuse ที่อาจกระทบองค์กรจากมุมมองภายนอก",
        findings: [
          "ควรเฝ้าระวังโดเมนคล้ายชื่อองค์กร",
          "ควรทำ DMARC enforcement เมื่อพร้อม",
        ],
      },
    ],
    []
  );

  const current = categories.find((c) => c.key === active) || categories[0];

  return (
    <div className="page">
      <div className="row">
        <div>
          <h1 className="page-title">Score Factors</h1>
          <div className="muted">
          Organization: <b>{org?.name ?? "—"}</b> • {org?.domain ?? "—"}

          </div>
        </div>

        <div className="score-actions">
          <input className="input" placeholder="Search factor..." />
          <button className="btn ghost">Export</button>
        </div>
      </div>

      <div className="score-wrap">
        <div className="card score-left">
          <div className="score-tabs">
            {categories.map((c) => (
              <button
                key={c.key}
                className={`score-tab ${active === c.key ? "active" : ""}`}
                onClick={() => setActive(c.key)}
              >
                <span>{c.title}</span>
                <span className="score-weight">{c.weight}%</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card score-right">
          <div className="row" style={{ alignItems: "flex-start" }}>
            <div>
              <h2 className="score-title">{current.title}</h2>
              <p className="muted" style={{ marginTop: 6 }}>
                {current.description}
              </p>
            </div>
            <span className={`badge ${current.status}`}>
              ● {current.status.toUpperCase()}
            </span>
          </div>

          <div className="score-section">
            <h3>Key Findings</h3>
            <ul className="score-list">
              {current.findings.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="score-section">
            <h3>Recommended Actions</h3>
            <div className="actions-grid">
              <div className="action-card">
                <b>Prioritize</b>
                <p>แก้ High severity ที่ public-facing ก่อน</p>
              </div>
              <div className="action-card">
                <b>Reduce Exposure</b>
                <p>ปิด port/service ที่ไม่จำเป็น และลบ legacy assets</p>
              </div>
              <div className="action-card">
                <b>Harden</b>
                <p>ปรับ TLS, security headers, baseline patching</p>
              </div>
            </div>
          </div>

          <div className="row" style={{ marginTop: 14 }}>
            <button className="btn">View related issues</button>
            <button className="btn primary">Create remediation task</button>
          </div>
        </div>
      </div>
    </div>
  );
}
