import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const checkUser = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  };

  useEffect(() => {
    checkUser();
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser); 
    };
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId"); 
    setUser(null);
    navigate('/login'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/assests/logo.jpg" alt="SafeParcel Logo" className="logo-img" />
        </Link>
      </div>
      
      {/* --- NAVBAR LINKS --- */}
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/book">Book Parcel</Link></li>
        <li><Link to="/track">Track Status</Link></li>
        {/* Yahan naya option perfectly integrate ho gaya hai */}
        <li><Link to="/driver-partner">Driver Partner</Link></li>
      </ul>
      
      <div className="navbar-auth">
        {user ? (
          <div className="auth-flex-container" style={{ display: 'flex', alignItems: 'center' }}>
            <button className="login-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login / Register</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;