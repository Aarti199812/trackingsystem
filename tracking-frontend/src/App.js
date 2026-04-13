import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar/Navbar.jsx';
import Footer from './components/Layout/Footer/Footer.jsx';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  const location = useLocation();

  // In routes par header dikhega (Add /book-truck here for your new page)
  const headerRoutes = ["/book", "/track", "/book-truck"];
  const showHeader = headerRoutes.includes(location.pathname);

  return (
    <div className="App">
      <Navbar />

      {showHeader && (
        <header className="app-header">
          <h1 style={{ textAlign: 'center', margin: '20px', color: '#1d4ed8' }}>
            SafeParcel Management System
          </h1>
        </header>
      )}

      <main className="container">
        {/* Saare pages yahan load honge */}
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;