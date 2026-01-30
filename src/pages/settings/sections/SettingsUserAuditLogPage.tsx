import "../Settings.css";

type AuditRow = {
  name: string;
  email: string;
  activity: string;
  category: string;
  location: string;
  when: string;
};

const mockAudit: AuditRow[] = [
  { name: "Name Surname", email: "you@company.com", activity: "Viewed dashboard", category: "System", location: "Thailand (public IP)", when: "Jan 1, 2025 07:59 am" },
  { name: "User1", email: "user1@company.com", activity: "Viewed dashboard", category: "System", location: "Thailand (public IP)", when: "Jan 1, 2025 07:59 am" },
  { name: "User2", email: "user2@company.com", activity: "Change user password", category: "User", location: "Thailand (public IP)", when: "Jan 1, 2025 07:59 am" },
  { name: "User3", email: "user3@company.com", activity: "Viewed dashboard", category: "System", location: "Thailand (public IP)", when: "Jan 1, 2025 07:59 am" },
];

export default function SettingsUserAuditLogPage() {
  const userActivities = mockAudit.length;
  const accountChanges = mockAudit.filter(x => x.activity.toLowerCase().includes("change")).length;
  const issuesUpdates = 0;

  return (
    <section className="stg-section">
      <header className="stg-section-head">
        <div className="stg-section-title">
          <span className="stg-badge-ico" aria-hidden>📋</span>
          <h2>User Audit Log</h2>
        </div>
        <div className="stg-section-desc">Track important actions and activities</div>
      </header>

      <div className="stg-block">
        <div className="stg-audit-top">
          <div className="stg-audit-left">
            <div className="stg-audit-label">Recent User Activity</div>
            <div className="stg-audit-metrics">
              <div><span className="stg-numlink">{userActivities}</span> User Activities</div>
              <div><span className="stg-numlink">{accountChanges}</span> Account Changes</div>
              <div><span className="stg-numlink">{issuesUpdates}</span> Issues Updates</div>
            </div>
          </div>
          <button className="stg-primary">⤓ Export</button>
        </div>

        <div className="stg-tablewrap">
          <table className="stg-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Activity type</th>
                <th>Category</th>
                <th>Device Location</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {mockAudit.map((a, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="stg-usercell">
                      <div className="stg-user-name">{a.name}</div>
                      <a className="stg-user-mail" href={`mailto:${a.email}`}>{a.email}</a>
                    </div>
                  </td>
                  <td>{a.activity}</td>
                  <td>{a.category}</td>
                  <td>{a.location}</td>
                  <td className="stg-last">{a.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
