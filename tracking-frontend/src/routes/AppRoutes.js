import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import TrackingSection from '../components/tracking/TrackingSection';
 import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />

            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="/book" element={<BookingForm />} />

            <Route path="/track" element={<TrackingSection />} />

            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/admin-dashboard" element={<AdminDashboard />} />


            {/* <Route path="/admin" element={<div style={{padding: '50px', textAlign: 'center'}}><h2>Admin Panel Coming Soon...</h2></div>} /> */}

            {/* <Route path="*" element={<div style={{padding: '50px', textAlign: 'center'}}><h2>404 - Page Not Found</h2></div>} /> */}
        </Routes>
    );
};

export default AppRoutes;