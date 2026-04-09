
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
}

export default App;