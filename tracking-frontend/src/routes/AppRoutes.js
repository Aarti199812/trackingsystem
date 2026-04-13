import React from 'react';
import { Routes, Route } from 'react-router-dom';

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

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<Home />} />

      {/* Booking & Tracking */}
      <Route path="/track" element={<TrackingSection />} />
      
      <Route path="/book-truck" element={<TruckBookingPage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboards */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user-dashboard" element={<Dashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/book-truck" element={<TruckBookingPage />} />  
      <Route path="/book-bike" element={<BikePage />} /> 
      <Route path="/book-movers" element={<PackerPage />} />
      <Route path="/track" element={<TrackingSection />} />
      <Route path="/book" element={<BookingForm/>} />

      {/* 404 Fallback */}
      <Route path="*" element={<div style={{padding: '50px', textAlign: 'center'}}><h2>404 - Page Not Found</h2></div>} />
    </Routes>
  );
};

export default AppRoutes;