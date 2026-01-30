import { useNavigate } from "react-router-dom";
import "../../styles/pages.css";
import "./SubscriptionPlan.css";

export default function SubscriptionPlanPage() {
  const navigate = useNavigate();

  return (
    <div className="plan-page">
      <button className="plan-close" onClick={() => navigate("/subscription")}>
        ✕
      </button>

      <div className="plan-wrap">
        <div className="plan-card active">
          <h2 className="plan-title">free trial</h2>

          <div className="plan-price">
            <span className="amount">0</span>
            <span className="unit">
              Bath/<br />14 day (first attempt)
            </span>
          </div>

          <button className="plan-btn current" type="button">
            your current plan
          </button>

          <ul className="plan-features">
            <li>cannot doing user management</li>
            <li>view information like a full plan</li>
            <li>single account.</li>
            <li>limit in 14 days</li>
          </ul>
        </div>

        <div className="plan-card">
          <h2 className="plan-title">pro</h2>

          <div className="plan-price">
            <span className="amount">2k</span>
            <span className="unit">
              Bath/<br />month
            </span>
          </div>

          <button className="plan-btn select" type="button">
            select
          </button>

          <ul className="plan-features">
            <li>doing user management</li>
            <li>provide admin account</li>
            <li>manage organization profile</li>
            <li>view user log</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
