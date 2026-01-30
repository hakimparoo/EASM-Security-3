import { useState } from "react";
import "../Settings.css";

export default function SettingsNotificationPage() {
  const [enabled, setEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [alertEnabled, setAlertEnabled] = useState(true);
  const [timing, setTiming] = useState<"daily" | "weekly" | "realtime">("daily");

  return (
    <section className="stg-section">
      <header className="stg-section-head">
        <div className="stg-section-title">
          <span className="stg-badge-ico" aria-hidden>🔔</span>
          <h2>Notification</h2>
        </div>
        <div className="stg-section-desc">Control alerts from scans, issues, and changes</div>
      </header>

      <div className="stg-block">
        <div className="stg-row stg-row-top">
          <div>
            <h3 className="stg-h3-inline">Turn On/Off Notification</h3>
            <div className="stg-muted">Disable to pause all notifications</div>
          </div>

          <label className="stg-switch" aria-label="Toggle Notification">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
            <span className="stg-slider" />
          </label>
        </div>

        <div className={`stg-formgrid ${enabled ? "" : "disabled"}`}>
          <div className="stg-field">
            <div className="stg-field-title">Email Notification</div>
            <button
              className={`stg-pill ${emailEnabled ? "on" : "off"}`}
              onClick={() => enabled && setEmailEnabled((v) => !v)}
              disabled={!enabled}
            >
              {emailEnabled ? "Enable" : "Disable"}
            </button>
          </div>

          <div className="stg-field">
            <div className="stg-field-title">Alert Notification</div>
            <button
              className={`stg-pill ${alertEnabled ? "on" : "off"}`}
              onClick={() => enabled && setAlertEnabled((v) => !v)}
              disabled={!enabled}
            >
              {alertEnabled ? "Enable" : "Disable"}
            </button>
          </div>

          <div className="stg-field">
            <div className="stg-field-title">Notification Timing</div>
            <select
              className="stg-select"
              value={timing}
              onChange={(e) => setTiming(e.target.value as any)}
              disabled={!enabled}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="realtime">Real-time</option>
            </select>
          </div>
        </div>

        <button className="stg-secondary">
          Set Rules Notification
        </button>
      </div>
    </section>
  );
}
