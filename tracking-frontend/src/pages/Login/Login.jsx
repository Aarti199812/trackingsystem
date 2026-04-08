<<<<<<< Updated upstream
=======
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:9023/api/users/login",
        {
          email,
          password,
        },
      );

      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Top Right Register Link */}
        <div className="register-link">
          <span>New here? </span>
          <Link to="/register">Sign Up</Link>
        </div>

        <h2>SafeParcel Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
>>>>>>> Stashed changes
