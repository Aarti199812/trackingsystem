import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Layout/Navbar/Navbar.jsx';
// import Home from './pages/Home/Home.jsx';
import AppRoutes from './routes/AppRoutes'; 
import './App.css';

function App() {
    return (
    <div className="App">
      
      <Navbar />
      <header className="app-header">
        <h1 style={{textAlign: 'center',margin: '20px'}}>SafeParcel Management System</h1>
      </header>

      
      <main className="container">
        <AppRoutes />
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default App;