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

      // 1. User data save karo
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);

      window.dispatchEvent(new Event("storage"));

      // 3. Role based redirect
      if (user.role?.toLowerCase() === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } catch (xhrError) {
      console.log("ERROR:", xhrError);
      
      if (xhrError.response && xhrError.response.data) {
        // Safe Extraction: Store the raw data object or string directly
        setError(xhrError.response.data);
      } else {
        setError("Network error. Please try again later.");
      }
    }
  };

  // Helper function to safely read error text in JSX
  const renderErrorMessage = () => {
    if (!error) return null;
    
    // If the error state somehow became an object, extract text safely
    if (typeof error === "object") {
      return error.message || error.error || "Internal Server Error (500)";
    }
    
    return error;
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
          
          {/* SAFE RENDER: Calls our helper function to guarantee a primitive string output */}
          {error && <p className="error">{renderErrorMessage()}</p>}
          
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;