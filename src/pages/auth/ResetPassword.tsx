import "./Auth.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-header">
          <img src={logo} alt="App Logo" className="login-logo" />
          <h2>Set A New Password</h2>
        </div>

        <p className="auth-desc">
          Create a new password. Ensure it differs from previous one
          for security.
        </p>

        <label>New password</label>
        <input type="password" />

        <label>Confirm password</label>
        <input type="password" />

        <ul className="rules">
          <li>✔ Must be at least 8 characters</li>
          <li>✔ Must contain one special character</li>
        </ul>

        <span className="auth-link" onClick={() => navigate("/login")}>
          Cancel
        </span>

        <br /><br />

        <button className="btn-primary" onClick={() => navigate("/login")}>
          Reset New Password
        </button>
      </div>
    </div>
  );
}
