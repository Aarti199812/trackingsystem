import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/assests/logo.jpg" alt="SafeParcel Logo" className="logo-img" />
        </Link>
      </div>
      
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/book">Book Parcel</Link></li>
        <li><Link to="/track">Track Status</Link></li>
        {/* <li><Link to="/admin">Admin Panel</Link></li> */}
      </ul>
      
      <div className="navbar-auth">
        <Link to="/login">
          <button className="login-btn">Login / Register</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;