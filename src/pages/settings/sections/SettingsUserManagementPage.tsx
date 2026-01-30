import "../Settings.css";

type UserRow = {
  name: string;
  email: string;
  role: "Admin" | "User";
  access: "Enable" | "Disable";
  api: "Enable" | "Disable";
  permissions: "All" | "User";
  lastActive: string;
};

const mockUsers: UserRow[] = [
  { name: "Name Surname", email: "you@company.com", role: "Admin", access: "Enable", api: "Enable", permissions: "All", lastActive: "Jan 1, 2025 07:59 am" },
  { name: "User1", email: "user1@company.com", role: "User", access: "Enable", api: "Enable", permissions: "User", lastActive: "Jan 1, 2025 07:59 am" },
  { name: "User2", email: "user2@company.com", role: "User", access: "Enable", api: "Enable", permissions: "User", lastActive: "Jan 1, 2025 07:59 am" },
  { name: "User3", email: "user3@company.com", role: "User", access: "Enable", api: "Enable", permissions: "User", lastActive: "Jan 1, 2025 07:59 am" },
];

export default function SettingsUserManagementPage() {
  const adminCount = mockUsers.filter(u => u.role === "Admin").length;
  const userCount = mockUsers.filter(u => u.role === "User").length;

  return (
    <section className="stg-section">
      <header className="stg-section-head">
        <div className="stg-section-title">
          <span className="stg-badge-ico" aria-hidden>👥</span>
          <h2>User Management</h2>
        </div>
        <div className="stg-section-desc">Manage roles, access, and API permissions</div>
      </header>

      <div className="stg-block">
        <div className="stg-stats">
          <div className="stg-stat">
            <div className="stg-stat-top">
              <div className="stg-stat-title">Admin</div>
              <div className="stg-stat-num">{adminCount}</div>
            </div>
            <div className="stg-muted">Account manager • Full access</div>
          </div>

          <div className="stg-stat">
            <div className="stg-stat-top">
              <div className="stg-stat-title">User</div>
              <div className="stg-stat-num">{userCount}</div>
            </div>
            <div className="stg-muted">Standard access</div>
          </div>

          <div className="stg-stat-action">
            <button className="stg-primary">＋ Add New</button>
          </div>
        </div>

        <div className="stg-tablewrap">
          <table className="stg-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Access</th>
                <th>API</th>
                <th>Permissions</th>
                <th>Last Active</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {mockUsers.map((u) => (
                <tr key={u.email}>
                  <td>
                    <div className="stg-usercell">
                      <div className="stg-user-name">{u.name}</div>
                      <a className="stg-user-mail" href={`mailto:${u.email}`}>{u.email}</a>
                    </div>
                  </td>
                  <td>
                    <select className="stg-select sm" defaultValue={u.role}>
                      <option>Admin</option>
                      <option>User</option>
                    </select>
                  </td>
                  <td>
                    <select className="stg-select sm" defaultValue={u.access}>
                      <option>Enable</option>
                      <option>Disable</option>
                    </select>
                  </td>
                  <td>
                    <select className="stg-select sm" defaultValue={u.api}>
                      <option>Enable</option>
                      <option>Disable</option>
                    </select>
                  </td>
                  <td>{u.permissions}</td>
                  <td className="stg-last">{u.lastActive}</td>
                  <td className="stg-more" title="More">⋮</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
