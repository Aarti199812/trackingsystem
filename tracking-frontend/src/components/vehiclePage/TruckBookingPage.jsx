import React, { useState } from 'react';
import './TruckBookingPage.css';

const TruckBookingPage = () => {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [mobile, setMobile] = useState('');
  const [fare, setFare] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Yamunanagar");
  const [loading, setLoading] = useState(false);

  const handleFareEstimate = async () => {
    if (!pickup || !drop) {
      alert("Please enter both pickup and drop locations");
      return;
    }

    setLoading(true);
    try {
      // Sending vehicleType=truck to backend
      const response = await fetch(
        `http://localhost:9023/api/tracking/get-fare?from=${pickup}&to=${drop}&vehicleType=truck`
      );
      
      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();
      setFare(data.fare);
      
      window.scrollTo({ top: 300, behavior: 'smooth' });

    } catch (error) {
      console.error('Error fetching fare estimate:', error);
      alert("Backend not responding! Check if Spring Boot is running on port 9023.");
    } finally {
      setLoading(false);
    }
  };

  const cityData = {
    "Yamunanagar": "https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2024/10/Chaneti-Stupa.jpg",
    "Kurukshetra": "https://thumbs.dreamstime.com/b/sarveshwar-mahadev-temple-brahma-sarovar-kurukshetra-sarveshwar-mahadev-temple-located-brahma-sarovar-kurukshetra-india-428706026.jpg",
    "Chandigarh": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/4c/43/64/the-rock-garden-of-chandigarh.jpg?w=900&h=500&s=1",
    "Karnal": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/7a/f4/f0/noor-mahal.jpg?w=1400&h=1400&s=1",
    "Ambala": "https://static.where-e.com/India/Gurudwara-Panjokhra-Sahib_4a681ef6e540a5634542a6af91fda8e1.jpg",
    "Panchkula": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/58/ae/62/morni-hills.jpg?w=1200&h=-1&s=1"
  };

  const vehicles = [
    { id: 1, name: '3 Wheeler', cap: '500kg', price: '₹160', img: 'https://nest-platform-assets.porter.in/3_Wheeler_b9de267bde/3_Wheeler_b9de267bde.svg' }, 
    { id: 2, name: 'Tata Ace', cap: '750kg', price: '₹205', img: 'https://nest-platform-assets.porter.in/Tata_Ace_5fd23cdaf0/Tata_Ace_5fd23cdaf0.svg' },
    { id: 3, name: 'Pickup 8ft', cap: '1.2 Ton', price: '₹400', img: 'https://nest-platform-assets.porter.in/Pickup_8ft_cd75c39294/Pickup_8ft_cd75c39294.svg' }
  ];

  return (
    <div className="booking-wrapper">
      <section className="hero-section" style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url(${cityData[selectedCity]})` }}>
        <div className="city-selector-top">
           <span className="location-icon">📍</span>
           <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            {Object.keys(cityData).map(city => (<option key={city} value={city}>{city}</option>))}
          </select>
        </div>

        <div className="hero-text-center">
            <h1>Mini Truck Booking in <span className="highlight">{selectedCity}</span></h1>
            <p>Affordable. Reliable. Professional.</p>
        </div>

        <div className="booking-bar-white">
          <div className="form-input">
            <label>Pickup Point *</label>
            <input type="text" placeholder="e.g. Model Town" value={pickup} onChange={(e) => setPickup(e.target.value)} />
          </div>
          <div className="form-input">
            <label>Drop Location *</label>
            <input type="text" placeholder="e.g. Sector 17" value={drop} onChange={(e) => setDrop(e.target.value)} />
          </div>
          <div className="form-input">
            <label>Mobile Number *</label>
            <input type="tel" placeholder="+91 XXXXX XXXXX" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </div>
          <button className="fare-estimate-btn" onClick={handleFareEstimate} disabled={loading}>
            {loading ? "Calculating..." : "Get Fare Estimate"} <span className="arrow-icon">→</span>
          </button>
        </div>
        
        {fare && (
          <div className="fare-display-popup fade-in">
            <div className="fare-content">
                <span>Total Estimated Truck Fare</span>
                <h2>{fare}</h2>
                <small>*Final price may vary based on traffic</small>
            </div>
          </div>
        )}
      </section>

      <section className="vehicle-selection-area">
        <h2 className="section-title">Available Trucks in {selectedCity}</h2>
        <div className="vehicle-cards-flex">
          {vehicles.map((v, index) => (
            <div key={v.id} className="truck-card slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="cap-tag">{v.cap}</div>
              <img src={v.img} alt={v.name} />
              <h4>{v.name}</h4>
              <p>Starts at <strong>{v.price}</strong></p>
              <button className="select-truck-btn">Select Vehicle</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TruckBookingPage;