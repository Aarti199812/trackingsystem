<<<<<<< Updated upstream
=======
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import TrackingSection from '../components/tracking/TrackingSection';
 import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="/" element={<Navigate to="/book" />} /> */}

        <Route path="/book" element={<BookingForm />} />

        <Route path="/track" element={<TrackingSection />} />

        <Route path="/login" element={<Login />} />

        <Route path="/admin-dashboard" element={<Home />} />

        <Route path="/user-dashboard" element={<Home />} />

        {/* <Route path="/admin" element={<div style={{padding: '50px', textAlign: 'center'}}><h2>Admin Panel Coming Soon...</h2></div>} /> */}

        {/* <Route path="*" element={<div style={{padding: '50px', textAlign: 'center'}}><h2>404 - Page Not Found</h2></div>} /> */}
      </Routes>
    );
};

export default AppRoutes;
>>>>>>> Stashed changes
