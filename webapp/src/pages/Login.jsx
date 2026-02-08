import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setform] = useState({
    email: "",
    password: ""
  });

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  function handleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      seterror("");
      setloading(true);
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      seterror("Login Failed");
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button disabled={loading} className="auth-btn">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-link">
          Don’t have an account? <Link to="/">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;