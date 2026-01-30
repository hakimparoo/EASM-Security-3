import "./Auth.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-header">
          <img src={logo} alt="App Logo" className="login-logo" />
          <h2>Log in</h2>
        </div>

        <p className="auth-desc">
          Please enter your email address to ensure the password
          reset and correction process is accurate and secure.
        </p>

        <label>Email</label>
        <input type="email" />

        <span className="auth-link" onClick={() => navigate("/login")}>
          Cancel
        </span>

        <br /><br />

        <button className="btn-primary" onClick={() => navigate("/reset")}>
          Confirm
        </button>
      </div>
    </div>
  );
}
