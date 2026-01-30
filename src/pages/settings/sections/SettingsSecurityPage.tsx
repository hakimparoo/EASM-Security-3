import { useState } from "react";
import "../Settings.css";

export default function SettingsSecurityPage() {
  const [otp, setOtp] = useState(false);

  return (
    <section className="stg-section">
      <header className="stg-section-head">
        <div className="stg-section-title">
          <span className="stg-badge-ico" aria-hidden>🛡️</span>
          <h2>Two-Factor Authentication</h2>
        </div>
        <div className="stg-section-desc">Extra protection for your account</div>
      </header>

      <div className="stg-block">
        <div className="stg-row stg-row-top">
          <div>
            <h3 className="stg-h3-inline">Turn On/Off authenticate with OTP</h3>
            <div className="stg-muted">
              Recommended for admin accounts and organizations managing multiple assets.
            </div>
          </div>

          <label className="stg-switch" aria-label="Toggle OTP">
            <input type="checkbox" checked={otp} onChange={(e) => setOtp(e.target.checked)} />
            <span className="stg-slider" />
          </label>
        </div>

        <div className="stg-callout">
          <div className="stg-callout-title">Best practice for EASM</div>
          <div className="stg-callout-desc">
            Enable 2FA to reduce account takeover risk, especially when you can manage
            organization profiles, users, and scan configurations.
          </div>
        </div>
      </div>
    </section>
  );
}
