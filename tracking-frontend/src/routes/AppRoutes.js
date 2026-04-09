import React from 'react';
import { Routes, Route } from 'react-router-dom';

import BookingForm from '../components/booking/BookingForm';
import TrackingSection from '../components/tracking/TrackingSection';

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import Register from '../pages/Register/Register';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Core Features */}
      <Route path="/book" element={<BookingForm />} />
      <Route path="/track" element={<TrackingSection />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>}/>

      {/* Dashboards */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user-dashboard" element={<Dashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* 404 fallback */}
      {/* <Route path="*" element={<div style={{padding: '50px', textAlign: 'center'}}><h2>404 - Page Not Found</h2></div>} /> */}
    </Routes>
  );
};

export default AppRoutes;