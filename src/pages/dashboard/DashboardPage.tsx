import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useOrganization } from "../../context/OrganizationContext";

type TopIssue = {
  id: string;
  label: string;
  category: "Network Security" | "Application" | "Cloud" | "Identity";
  severity: "High" | "Medium" | "Low";
  count: number;
};

type TimelinePoint = { month: string; score: number };

export default function DashboardPage() {
  const navigate = useNavigate();
  const { org } = useOrganization();

  // ✅ mock data (ไม่ต่อ API)
  const [score] = useState(99);
  const [grade] = useState("A");
  const [latestScan] = useState("22/07/2025");

  const topIssues: TopIssue[] = useMemo(
    () => [
      { id: "i1", label: "Open ports exposure", category: "Network Security", severity: "High", count: 12 },
      { id: "i2", label: "Missing security headers", category: "Application", severity: "High", count: 8 },
      { id: "i3", label: "Weak TLS configuration", category: "Network Security", severity: "Medium", count: 5 },
    ],
    []
  );

  const timeline: TimelinePoint[] = useMemo(
    () => [
      { month: "Jan", score: 40 },
      { month: "Feb", score: 45 },
      { month: "Mar", score: 60 },
      { month: "Apr", score: 64 },
      { month: "May", score: 65 },
      { month: "Jun", score: 64 },
      { month: "Jul", score: 68 },
      { month: "Aug", score: 69 },
      { month: "Sep", score: 65 },
    ],
    []
  );

  const vuln = useMemo(
    () => ({
      Info: 58,
      High: 22,
      Medium: 12,
      Low: 8,
    }),
    []
  );

  const totalVuln = Object.values(vuln).reduce((a, b) => a + b, 0);

  const chartPoints = useMemo(() => {
    // simple SVG line chart points (0..100)
    const w = 760;
    const h = 220;
    const padX = 18;
    const padY = 18;

    const xs = timeline.map((_, i) => padX + (i * (w - padX * 2)) / (timeline.length - 1));
    const ys = timeline.map((p) => {
      const t = p.score / 100;
      return padY + (1 - t) * (h - padY * 2);
    });

    const d = xs
      .map((x, i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${ys[i].toFixed(1)}`)
      .join(" ");

    return { w, h, padX, padY, xs, ys, d };
  }, [timeline]);

  const donutStyle = useMemo(() => {
    // conic-gradient percentages
    const info = (vuln.Info / totalVuln) * 100;
    const high = (vuln.High / totalVuln) * 100;
    const medium = (vuln.Medium / totalVuln) * 100;
    const low = (vuln.Low / totalVuln) * 100;

    const a = info;
    const b = info + high;
    const c = info + high + medium;
    const d = info + high + medium + low;

    return {
      background: `conic-gradient(
        #4F8DFF 0% ${a}%,
        #FF4D4F ${a}% ${b}%,
        #FFC53D ${b}% ${c}%,
        #95DE64 ${c}% ${d}%
      )`,
    } as React.CSSProperties;
  }, [vuln, totalVuln]);

  const go = (path: string) => navigate(path);

  return (
    <div className="dash-wrap">
      <div className="dash-head">
        <h1 className="dash-title">Dashboard</h1>
        <div className="dash-sub">
          Organization: <b>{org?.name ?? "Your Organization"}</b>{" "}
          <span className="dash-domain">({org?.domain ?? "your-org.com"})</span>
        </div>
      </div>

      {/* ======= TOP GRID ======= */}
      <div className="dash-grid dash-grid-top">
        {/* Score */}
        <button className="card card-click" onClick={() => go("/score")} type="button">
          <div className="card-h">
            <div>
              <div className="card-title">Score</div>
              <div className="card-muted">Overall security posture</div>
            </div>
            <span className="pill">Go</span>
          </div>

          <div className="score-row">
            <div className="score-badge">
              <div className="score-grade">{grade}</div>
            </div>
            <div className="score-num">{score}</div>
          </div>

          <div className="card-footer">
            <span className="linkish">Go to score page →</span>
          </div>
        </button>

        {/* Top Issues */}
        <button className="card card-click" onClick={() => go("/issues")} type="button">
          <div className="card-h">
            <div>
              <div className="card-title">Top Issues</div>
              <div className="card-muted">Most critical findings</div>
            </div>
            <span className="pill">View</span>
          </div>

          <div className="issue-list">
            {topIssues.map((it) => (
              <div key={it.id} className={`issue-item sev-${it.severity.toLowerCase()}`}>
                <div className="issue-left">
                  <div className="issue-label">{it.label}</div>
                  <div className="issue-meta">
                    {it.category} • {it.severity}
                  </div>
                </div>
                <div className="issue-count">{it.count}</div>
              </div>
            ))}
          </div>

          <div className="card-footer">
            <span className="linkish">View all issues →</span>
          </div>
        </button>

        {/* History */}
        <button className="card card-click" onClick={() => go("/history")} type="button">
          <div className="card-h">
            <div>
              <div className="card-title">History</div>
              <div className="card-muted">Scan results timeline</div>
            </div>
            <span className="pill">Log</span>
          </div>

          <div className="history-center">
            <div className="history-label">Latest scan</div>
            <div className="history-date">{latestScan}</div>
            <div className="history-mini">
              <span className="mini-grade">{grade}</span>
              <span className="mini-score">{score}</span>
            </div>
          </div>

          <div className="card-footer">
            <span className="linkish">View Log →</span>
          </div>
        </button>
      </div>

      {/* ======= BOTTOM GRID ======= */}
      <div className="dash-grid dash-grid-bottom">
        {/* Timeline */}
        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Timeline</div>
              <div className="card-muted">Score trend (mock)</div>
            </div>
            <button className="btn-mini" onClick={() => go("/history")} type="button">
              Details
            </button>
          </div>

          <div className="chart-wrap">
            <svg width="100%" viewBox={`0 0 ${chartPoints.w} ${chartPoints.h}`} className="chart">
              {/* grid */}
              {[0, 25, 50, 75, 100].map((v) => {
                const y = chartPoints.padY + (1 - v / 100) * (chartPoints.h - chartPoints.padY * 2);
                return <line key={v} x1="0" x2={chartPoints.w} y1={y} y2={y} className="chart-grid" />;
              })}

              {/* line */}
              <path d={chartPoints.d} className="chart-line" />

              {/* dots */}
              {chartPoints.xs.map((x, i) => (
                <circle key={i} cx={x} cy={chartPoints.ys[i]} r="4.5" className="chart-dot" />
              ))}

              {/* x labels */}
              {timeline.map((p, i) => (
                <text key={p.month} x={chartPoints.xs[i]} y={chartPoints.h - 4} textAnchor="middle" className="chart-x">
                  {p.month}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Vulnerability */}
        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Vulnerability</div>
              <div className="card-muted">Distribution (mock)</div>
            </div>
            <button className="btn-mini" onClick={() => go("/issues")} type="button">
              Review
            </button>
          </div>

          <div className="vuln-row">
            <div className="donut" style={donutStyle}>
              <div className="donut-hole">
                <div className="donut-total">{totalVuln}</div>
                <div className="donut-sub">findings</div>
              </div>
            </div>

            <div className="legend">
              <div className="legend-item">
                <span className="swatch s-info" /> Info <b>{vuln.Info}</b>
              </div>
              <div className="legend-item">
                <span className="swatch s-high" /> High <b>{vuln.High}</b>
              </div>
              <div className="legend-item">
                <span className="swatch s-medium" /> Medium <b>{vuln.Medium}</b>
              </div>
              <div className="legend-item">
                <span className="swatch s-low" /> Low <b>{vuln.Low}</b>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="card">
          <div className="card-h">
            <div>
              <div className="card-title">Contact us</div>
              <div className="card-muted">Support for your EASM</div>
            </div>
          </div>

          <div className="contact">
            <div className="contact-row">
              <span className="contact-ico">☎</span>
              <span>0255464458</span>
            </div>
            <div className="contact-row">
              <span className="contact-ico">✉</span>
              <span>brave_scanner@gmail.com</span>
            </div>

            <div className="contact-actions">
              <button className="btn-primary" type="button" onClick={() => go("/subscription")}>
                Subscription
              </button>
              <button className="btn-ghost" type="button" onClick={() => go("/settings")}>
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======= Pagination mock ======= */}
      <div className="dash-pagination">
        <button className="page-dot active" type="button" aria-label="page 1">
          1
        </button>
        <button className="page-dot" type="button" aria-label="page 2">
          2
        </button>
        <button className="page-dot" type="button" aria-label="add">
          +
        </button>
      </div>
    </div>
  );
}
