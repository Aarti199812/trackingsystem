import React, { useState } from 'react';
import './Home.css';

const Home = () => {
    const [selected, setSelected] = useState('truck');

    const categories = [
        { id: 'truck', label: 'Truck', icon: '/assests/image3.png' },
        { id: 'bike', label: 'Two Wheeler', icon: '/assests/image1.png' },
        { id: 'movers', label: 'Packers & Movers', icon: '/assests/image4.png' },
    ];

    return (
        <div className="home-container">
            {/* Hero Section with Background */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Your Trust,<br />
                    <span className="highlight-text">Our Journey</span></h1>
                </div>
            </div>

            {/* Floating Selection Box */}
            <div className="floating-card-wrapper">
                <div className="white-card">
                    {/* City Selector Line */}
                    <div className="city-selector">
                        <span className="pin-icon">📍</span>
                        <span className="city-label">City: </span>
                        <select className="city-select">
                            <option>Yamunanagar</option>
                            <option>Kurukshetra</option>
                            <option>Ambala</option>
                        </select>
                    </div>

                    {/* Icons and Estimate Button Grid */}
                    <div className="action-grid">
                        {categories.map((item) => (
                            <div 
                                key={item.id} 
                                className={`icon-card ${selected === item.id ? 'selected' : ''}`}
                                onClick={() => setSelected(item.id)}
                            >
                                <div className="img-box">
                                    <img src={item.icon} alt={item.label} />
                                </div>
                                <p className="icon-label">{item.label}</p>
                            </div>
                        ))}

                        {/* Blue Estimate Card */}
                        <div className="estimate-card">
                            <div className="estimate-info">
                                <h3>Get an Estimate</h3>
                                <p>(takes ~20 mins)</p>
                            </div>
                            <div className="arrow-btn">→</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;