<<<<<<< Updated upstream
import React, { useState } from 'react';
import BookingForm from './components/BookingForm';
import TrackingSection from './components/TrackingSection';
import './App.css';

function App() {
    return (
    <div className="App">
      
      <Navbar />
      <Home />
      <header className="app-header">
        <h1>SafeParcel Management System</h1>
      </header>

      
      <main className="container">
        <AppRoutes />
      </main>

      {/* <Footer /> */}
    </div>
  );
=======
import React from 'react';
import Navbar from './components/Layout/Navbar/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import AppRoutes from './routes/AppRoutes';
import { useLocation } from 'react-router-dom'; 
import './App.css';

function App() {
  const location = useLocation();

  const headerRoutes = ["/book", "/track"];
  const showHeader = headerRoutes.includes(location.pathname);
    return (
      <div className="App">
        <Navbar />
        {/* <Home /> */}
        {showHeader && (
          <header className="app-header">
            <h1>SafeParcel Management System</h1>
          </header>
        )}

        <main className="container">
          <AppRoutes />
        </main>

        {/* <Footer /> */}
      </div>
    );
>>>>>>> Stashed changes
}

export default App;