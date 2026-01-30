import "../Settings.css";

export default function SettingsAccountPage() {
  return (
    <section className="stg-section">
      <header className="stg-section-head">
        <div className="stg-section-title">
          <span className="stg-badge-ico" aria-hidden>👤</span>
          <h2>Account</h2>
        </div>
        <div className="stg-section-desc">Personal and login information</div>
      </header>

      <div className="stg-split">
        <div className="stg-block">
          <h3>Personal Information</h3>

          <div className="stg-row">
            <div className="stg-label">Name</div>
            <div className="stg-value">Kantapat Hoonkaew</div>
            <button className="stg-linkbtn">Edit</button>
          </div>

          <div className="stg-row">
            <div className="stg-label">Organization</div>
            <div className="stg-value">Company Name</div>
            <button className="stg-linkbtn">Edit</button>
          </div>
        </div>

        <div className="stg-block">
          <h3>Log Information</h3>

          <div className="stg-row">
            <div className="stg-label">Email</div>
            <div className="stg-value">you@company.com</div>
            <button className="stg-linkbtn">Edit</button>
          </div>

          <div className="stg-row">
            <div className="stg-label">Password</div>
            <div className="stg-value">••••••••</div>
            <button className="stg-linkbtn">Change Password</button>
          </div>
        </div>
      </div>
    </section>
  );
}
