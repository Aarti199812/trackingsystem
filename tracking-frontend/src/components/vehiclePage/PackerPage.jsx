import React, { useState } from 'react';
import './PackerPage.css'; // Ensure this CSS file exists in the same folder

const PackerPage = () => {
  // Cities and their professional background images
  const cityData = {
    "Yamunanagar": "https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2024/10/Chaneti-Stupa.jpg",
    "Kurukshetra": "https://thumbs.dreamstime.com/b/sarveshwar-mahadev-temple-brahma-sarovar-kurukshetra-sarveshwar-mahadev-temple-located-brahma-sarovar-kurukshetra-india-428706026.jpg",
    "Chandigarh": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/4c/43/64/the-rock-garden-of-chandigarh.jpg?w=900&h=500&s=1",
    "Karnal": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/7a/f4/f0/noor-mahal.jpg?w=1400&h=1400&s=1",
    "Ambala": "https://static.where-e.com/India/Gurudwara-Panjokhra-Sahib_4a681ef6e540a5634542a6af91fda8e1.jpg",
    "Panchkula": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/58/ae/62/morni-hills.jpg?w=1200&h=-1&s=1"
  };

  const [selectedCity, setSelectedCity] = useState("Yamunanagar");

  // Movers Specific Data
  const movingServices = [
    { id: 1, name: 'Mini House (1RK/1BHK)', cap: 'Light Shifting', price: '1200', img: 'https://nest-platform-assets.porter.in/Reliable_shifting_6715bcb424/Reliable_shifting_6715bcb424.svg' },
    { id: 2, name: 'Standard House (2BHK)', cap: 'Medium Shifting', price: '2500', img: 'https://nest-platform-assets.porter.in/Economical_prices_b1e739df37/Economical_prices_b1e739df37.svg' },
    { id: 3, name: 'Large House (3BHK+)', cap: 'Heavy Shifting', price: '4500', img: 'https://nest-platform-assets.porter.in/Damage_proof_packaging_5a579ce845/Damage_proof_packaging_5a579ce845.svg' },
  ];

  const routes = [
    { to: "Delhi", kms: "200 Kms", price: "4500" },
    { to: "Gurgaon", kms: "240 Kms", price: "5200" },
    { to: "Panchkula", kms: "90 Kms", price: "2100" }
  ];

  return (
    <div className="booking-wrapper">
      {/* Dynamic Hero Section */}
      <section 
        className="hero-section" 
        style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${cityData[selectedCity]})` }}
      >
        <div className="city-selector-top">
           <span className="location-icon">📍</span>
           <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            {Object.keys(cityData).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="hero-text-center">
            <h1>Packers and Movers in <span className="highlight">{selectedCity}</span></h1>
            <p>Affordable. Reliable. Professional.</p>
        </div>

        <div className="booking-bar-white">
          <div className="form-input">
            <label>Pickup Location *</label>
            <input type="text" placeholder="Sending from..." />
          </div>
          <div className="form-input">
            <label>Drop Location *</label>
            <input type="text" placeholder="Sending to..." />
          </div>
          <div className="form-input">
            <label>Shifting Date *</label>
            <input type="date" />
          </div>
          <button className="fare-estimate-btn">
            Check Price <span className="arrow-icon">→</span>
          </button>
        </div>
      </section>

      {/* Services Selection */}
      <section className="vehicle-selection-area">
        <h2 className="section-title">Reliable Shifting in {selectedCity}</h2>
        <div className="vehicle-cards-flex">
          {movingServices.map((v, index) => (
            <div key={v.id} className="truck-card slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="cap-tag">{v.cap}</div>
              <img src={v.img} alt={v.name} />
              <h4>{v.name}</h4>
              <p>Starting from <strong>₹{v.price}</strong></p>
              <button className="select-truck-btn">Book Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Routes */}
      <section className="popular-routes">
        <div className="routes-container">
            <h3>Popular Shifting Routes from {selectedCity}</h3>
            <div className="routes-grid">
            {routes.map((route, i) => (
                <div key={i} className="route-card">
                  <strong>to {route.to} ({route.kms})</strong>
                  <p>Est. Fare: ₹{route.price}</p>
                </div>
            ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default PackerPage;