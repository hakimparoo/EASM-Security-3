import "../Settings.css";

export default function SettingsOrganizationPage() {
  return (
    <section className="stg-section">
      <header className="stg-section-head">
        <div className="stg-section-title">
          <span className="stg-badge-ico" aria-hidden>🏢</span>
          <h2>My Organization</h2>
        </div>
        <div className="stg-section-desc">Organization profile used across EASM modules</div>
      </header>

      <div className="stg-block">
        <div className="stg-org-title">
          <div className="stg-org-mark" aria-hidden>🏛️</div>
          <div>
            <div className="stg-org-name">Your Organization Name</div>
            <div className="stg-muted">company.com • education</div>
          </div>
        </div>

        <div className="stg-org-grid">
          <div className="stg-kv">
            <div className="stg-k">Company Logo</div>
            <button className="stg-secondary">Import file picture</button>
          </div>

          <div className="stg-kv">
            <div className="stg-k">Organization Name</div>
            <div className="stg-v">
              Company name <button className="stg-linkbtn">Edit</button>
            </div>
          </div>

          <div className="stg-kv">
            <div className="stg-k">Domain name</div>
            <div className="stg-v">company.com</div>
          </div>

          <div className="stg-kv">
            <div className="stg-k">Organization type</div>
            <select className="stg-select">
              <option>education</option>
              <option>enterprise</option>
              <option>government</option>
              <option>startup</option>
            </select>
          </div>

          <div className="stg-kv">
            <div className="stg-k">Employee</div>
            <select className="stg-select">
              <option>1-20</option>
              <option>21-100</option>
              <option>101-500</option>
              <option>501+</option>
            </select>
          </div>

          <div className="stg-kv">
            <div className="stg-k">Headquarters</div>
            <div className="stg-v">Thailand</div>
          </div>
        </div>
      </div>
    </section>
  );
}
