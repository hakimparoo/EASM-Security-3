import "./Auth.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-header">
          <img src={logo} alt="App Logo" className="login-logo" />
          <h2>Log in</h2>
        </div>

        <label>Email</label>
        <input type="email" />

        <label>Password</label>
        <input type="password" />

        <span className="auth-link" onClick={() => navigate("/forgot-password")}>
          forgot your password ?
        </span>

        <br /><br />

        <button className="btn-primary" onClick={() => navigate("/dashboard")}>
          Log in
        </button>
      </div>
    </div>
  );
}
