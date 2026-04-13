import React, { useState } from 'react';
import './BikePage.css';

const BikePage = () => {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [mobile, setMobile] = useState('');
  const [fare, setFare] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Yamunanagar");
  const [loading, setLoading] = useState(false);

  const handleFareEstimate = async () => {
    if (!pickup || !drop) {
      alert("Please enter pickup and drop locations");
      return;
    }

    setLoading(true);
    try {
      // Sending vehicleType=bike to backend
      const response = await fetch(
        `http://localhost:9023/api/tracking/get-fare?from=${pickup}&to=${drop}&vehicleType=bike`
      );
      
      const data = await response.json();
      setFare(data.fare);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } catch (error) {
      console.error('Error:', error);
      alert("Error fetching bike fare estimate.");
    } finally {
      setLoading(false);
    }
  };

  const cityData = {
    "Yamunanagar": "https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2024/10/Chaneti-Stupa.jpg",
    "Kurukshetra": "https://thumbs.dreamstime.com/b/sarveshwar-mahadev-temple-brahma-sarovar-kurukshetra-sarveshwar-mahadev-temple-located-brahma-sarovar-kurukshetra-india-428706026.jpg",
    "Chandigarh": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/4c/43/64/the-rock-garden-of-chandigarh.jpg?w=900&h=500&s=1"
  };

  return (
    <div className="booking-wrapper">
      <section className="hero-section" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url(${cityData[selectedCity] || cityData["Yamunanagar"]})` }}>
        <div className="city-selector-top">
           <span className="location-icon">📍</span>
           <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            {Object.keys(cityData).map(city => (<option key={city} value={city}>{city}</option>))}
          </select>
        </div>

        <div className="hero-text-center">
            <h1>Two Wheeler Booking in <span className="highlight">{selectedCity}</span></h1>
            <p>Fast. Safe. Affordable</p>
        </div>

        <div className="booking-bar-white">
          <div className="form-input">
            <label>Pickup Point *</label>
            <input type="text" placeholder="Pickup Area" value={pickup} onChange={(e) => setPickup(e.target.value)} />
          </div>
          <div className="form-input">
            <label>Drop Location *</label>
            <input type="text" placeholder="Drop Area" value={drop} onChange={(e) => setDrop(e.target.value)} />
          </div>
          <button className="fare-estimate-btn" onClick={handleFareEstimate} disabled={loading}>
            {loading ? "Calculating..." : "Get Fare Estimate"} <span className="arrow-icon">→</span>
          </button>
        </div>

        {fare && (
          <div className="fare-display-popup fade-in">
            <div className="fare-content">
                <span>Total Estimated Bike Fare</span>
                <h2>{fare}</h2>
                <small>*Calculated at ₹20/km</small>
            </div>
          </div>
        )}
      </section>

      <section className="vehicle-selection-area">
        <h2 className="section-title">Available Bikes in {selectedCity}</h2>
        <div className="vehicle-cards-flex">
            <div className="truck-card slide-up">
              <div className="cap-tag">20kg</div>
              <img src="https://nest-platform-assets.porter.in/2_wheeler_5624a12e03_cd20b2a174.svg" alt="bike" />
              <h4>2 Wheeler</h4>
              <p>Starts at <strong>₹20</strong></p>
              <button className="select-truck-btn">Select Bike</button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default BikePage;