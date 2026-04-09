import React from 'react';
import Navbar from './components/Layout/Navbar/Navbar.jsx';
import AppRoutes from './routes/AppRoutes'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      
      <header className="app-header">
        <h1 style={{ textAlign: 'center', margin: '20px' }}>
          SafeParcel Management System
        </h1>
      </header>

      <main className="container">
        {/* Saare pages yahan load honge */}
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;