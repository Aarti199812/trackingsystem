import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home'; 
import TruckBookingPage from '../components/Truckpage/TruckBookingPage'; 

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-truck" element={<TruckBookingPage />} />
        </Routes>
    );
};

export default AppRoutes;