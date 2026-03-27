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
}

export default App;