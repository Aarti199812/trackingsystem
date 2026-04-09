import React from 'react'
import "./Footer.css";
import { FaFacebook, FaTwitter,FaInstagram, FaLinkedin, FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-section">
          <div className="footer-logo">
            <Link to="/">
              <img
                src="/assests/logo.jpg"
                alt="SafeParcel Logo"
                className="logo-img"
              />
            </Link>
          </div>
          <p className="footer-text">Your Trust, Our Journey</p>
        </div>

        {/* Links */}
        <div className="footer-section">
            <h3 className="footer-heading">Quick Links</h3>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/book">Book Parcel</Link></li>
                <li><Link to="/track">Track Parcel</Link></li>
                <li>Contact</li>
            </ul>
        </div>

        {/* services */}
        <div className="footer-section">
            <h3 className="footer-heading">Services</h3>
            <ul>
                <li>Same Day Delivery</li>
                <li>International Shipping</li>
                <li>Bulk Orders</li>
                <li>Logistics Support</li>
            </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
            <h3 className="footer-heading">Contact</h3>
            <p>Email: support@safeparcel.com</p>
            <p>Phone: +91 00000 00000</p>

            <div className="footer-socials">
                <FaFacebookF/>
                <FaTwitter/>
                <FaInstagram/>
                <FaLinkedin/>
            </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} SafeParcel. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer
