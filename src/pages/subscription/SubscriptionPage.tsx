import { useOrganization } from "../../context/OrganizationContext";
import { useNavigate } from "react-router-dom";
import "../../styles/pages.css";
import "./Subscription.css";

export default function SubscriptionPage() {
  const { org } = useOrganization();
  const navigate = useNavigate();

  const subscription = {
    name: "Premium ASM",
    type: "Standard",
    start: "01/01/2025",
    expire: "01/01/2026",
  };

  return (
    <div className="page">
      <h1 className="page-title" style={{ textAlign: "center" }}>
        Subscription
      </h1>

      <div className="sub-card">
        <div className="sub-header">
          <span className="sub-icon">ℹ️</span>
          <span className="sub-title">information</span>
        </div>

        <div className="sub-body">
          <div className="sub-row">
            <span className="sub-label">Organization:</span>
            <span className="sub-value">
              <b>{org?.name}</b> • {org?.domain}
            </span>
          </div>

          <div className="sub-row">
            <span className="sub-label">Subscription Name:</span>
            <span className="sub-value">{subscription.name}</span>
          </div>

          <div className="sub-row">
            <span className="sub-label">Subscription Type:</span>
            <span className="sub-value">{subscription.type}</span>
          </div>

          <div className="sub-row">
            <span className="sub-label">Subscription Date:</span>
            <span className="sub-value">
              <span className="start">Start: {subscription.start}</span>
              <br />
              <span className="expired">Expired: {subscription.expire}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="sub-footer">
        <button className="sub-link" onClick={() => navigate("/subscriptionPlan")}>
          💎 view subscription plan
        </button>
      </div>
    </div>
  );
}
