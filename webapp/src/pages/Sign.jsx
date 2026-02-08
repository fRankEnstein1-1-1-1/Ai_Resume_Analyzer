import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sign.css";

function Sign() {
  const [form, setform] = useState({
    email: "",
    name: "",
    password: ""
  });

  const navigate = useNavigate();
  const { register } = useAuth();

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  function handleChange(e) {
    setform({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setloading(true);
      seterror("");
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      seterror("Sign up Failed");
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Full Name"
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
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="auth-link">
          Have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Sign;