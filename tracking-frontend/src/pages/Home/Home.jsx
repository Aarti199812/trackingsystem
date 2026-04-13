import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Home.css';

const Home = () => {
    const [selected, setSelected] = useState('truck');
    const navigate = useNavigate(); 

    const categories = [
        { id: 'truck', label: 'Truck', icon: '/assests/image3.png', path: '/book-truck' },
        { id: 'bike', label: 'Two Wheeler', icon: '/assests/image1.png', path: '/book-bike' },
        { id: 'movers', label: 'Packers & Movers', icon: '/assests/image4.png', path: '/book-movers' },
    ];

   
    const handleCardClick = (id, path) => {
        setSelected(id);
        navigate(path);
    };

    return (
        <div className="home-container">
           
            <div className="hero-section">
                <video autoPlay loop muted className="video-bg">
                    <source src="/hero.mp4" type="video/mp4" />
                </video>
                <div className="hero-content">
                    <h1>Your Trust,<br />
                    <span className="highlight-text">Our Journey</span></h1>
                </div>
            </div>

            <div className="floating-card-wrapper">
                <div className="white-card">
                   
                    <div className="city-selector">
                        <span className="pin-icon">📍</span>
                        <span className="city-label">City: </span>
                        <select className="city-select">
                            <option>Yamunanagar</option>
                            <option>Kurukshetra</option>
                            <option>Ambala</option>
                        </select>
                    </div>

                    <div className="action-grid">
                        {categories.map((item) => (
                            <div 
                                key={item.id} 
                                className={`icon-card ${selected === item.id ? 'selected' : ''}`}
                                onClick={() => handleCardClick(item.id, item.path)}
                            >
                                <div className="img-box">
                                    <img src={item.icon} alt={item.label} />
                                </div>
                                <p className="icon-label">{item.label}</p>
                            </div>
                        ))}

                       
                        <div className="estimate-card" onClick={() => navigate('/book-truck')}>
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