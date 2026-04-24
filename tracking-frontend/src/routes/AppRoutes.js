import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

// Pages & Components
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import TrackingSection from '../components/tracking/TrackingSection';
import TruckBookingPage from '../components/vehiclePage/TruckBookingPage'; 
import PackerPage from '../components/vehiclePage/PackerPage';
import BikePage from '../components/vehiclePage/BikePage';
import BookingForm from '../components/booking/BookingForm';

// Simple Protected Route Logic
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', background: '#f8f9fa', minHeight: '60vh' }}>
        <div style={{ maxWidth: '450px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>🔒</h1>
          <h2 style={{ color: '#1d4ed8', marginBottom: '15px' }}>Login Required</h2>
          <p style={{ color: '#666', marginBottom: '25px' }}>Please login or sign up to book your parcel and see your history.</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Link to="/login" style={{ padding: '12px 30px', background: '#1d4ed8', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
            <Link to="/register" style={{ padding: '12px 30px', border: '2px solid #1d4ed8', color: '#1d4ed8', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
          </div>
        </div>
      </div>
    );
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. PUBLIC ROUTES (Hamesha dikhenge) */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/track" element={<TrackingSection />} />
      
      {/* 2. PROTECTED ROUTES (Sirf Login par dikhenge) */}
      <Route path="/book" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
      <Route path="/user-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

      {/* 3. OTHER PAGES */}
      <Route path="/book-truck" element={<TruckBookingPage />} />  
      <Route path="/book-bike" element={<BikePage />} /> 
      <Route path="/book-movers" element={<PackerPage />} />

      {/* 4. 404 FALLBACK */}
      <Route path="*" element={<div style={{padding: '100px', textAlign: 'center'}}><h2>Page Not Found</h2><Link to="/">Back to Home</Link></div>} />
    </Routes>
  );
};

export default AppRoutes;