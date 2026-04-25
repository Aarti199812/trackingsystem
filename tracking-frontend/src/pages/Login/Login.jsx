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
        { email, password }
      );

      const user = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);

      // Handle both ADMIN and admin
      if (user.role?.toLowerCase() === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } catch (error) {
      console.log("ERROR:", error);

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

      

        <h2>SafeParcel Login</h2>
        <p>Login to access your SafeParcel account</p>

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
        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register">Sign Up</Link>
        </p>

      </div>
    </div>
  );
};
export default Login;
