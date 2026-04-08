<<<<<<< Updated upstream
import React, { useState } from 'react';
import BookingForm from './components/BookingForm';
import TrackingSection from './components/TrackingSection';
import './App.css';

function App() {
  const [view, setView] = useState('book'); 

  return (
    <div className="App">
      <header className="app-header">
        <h1>Porter Logistics System</h1>
        
        <div className="nav-tabs">
          <button 
            className={view === 'book' ? 'active' : ''} 
            onClick={() => setView('book')}
          >
            Book a Vehicle
          </button>
          <button 
            className={view === 'track' ? 'active' : ''} 
            onClick={() => setView('track')}
          >
            Track Order
          </button>
        </div>

        <hr />

  
        <main className="container">
          {view === 'book' ? <BookingForm /> : <TrackingSection />}
        </main>
        
      </header>
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