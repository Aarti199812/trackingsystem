import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        senderName: '',
        senderPhone: '',
        sourceAddress: '',
        destinationAddress: '',
        vehicleType: 'bike', // Default selection
        weight: '',
        distanceKm: ''
    });

    const vehicleOptions = [
        {
            id: 'bike',
            label: 'Two-Wheeler',
            desc: 'Up to 20kg',
            icon: <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm14.2-6.4c-1.3 0-2.4.5-3.2 1.4L13.2 12c1-.6 1.8-1.7 1.8-3 0-1.9-1.6-3.5-3.5-3.5S8 7.1 8 9c0 .7.2 1.3.5 1.9l-3.3 3.3c-.3-.1-.6-.2-.9-.2-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5c0-1.1-.4-2.1-1-2.9l3.1-3.1 2.1 2.1c-.5.7-.8 1.6-.8 2.6 0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5zm-14.2 7.9c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zM19 19c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/></svg>
        },
        {
            id: 'tata ace',
            label: 'Tata Ace',
            desc: '700kg Capacity',
            icon: <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
        },
        {
            id: 'pickup 8ft',
            label: 'Pickup 8ft',
            desc: '1.5 Tonne',
            icon: <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"><path d="M17 11h2l3 4v2h-2c0 1.66-1.34 3-3 3s-3-1.34-3-3H9c0 1.66-1.34 3-3 3s-3-1.34-3-3H1V7c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v4zM6 18.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm11 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"/></svg>
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        const finalValue = (name === 'weight' || name === 'distanceKm') ? parseFloat(value) : value;
        setFormData({ ...formData, [name]: finalValue });
    };

    const handleVehicleSelect = (id) => {
        setFormData({ ...formData, vehicleType: id });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:9023/api/parcels/book", formData);
            if (res.data && res.data.trackingId) {
                alert(`Booking Successful! Tracking ID: ${res.data.trackingId}`);
                navigate('/track'); 
            }
        } catch (error) {
            console.error("Error booking parcel:", error);
            alert("Booking failed. Please check if Backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-container">
            <div className="booking-card-main">
                <h2>🚀 Book Your Parcel</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <input type="text" name="senderName" placeholder="Full Name" onChange={handleChange} required />
                        <input type="text" name="senderPhone" placeholder="Phone Number" onChange={handleChange} required />
                    </div>

                    <input type="text" name="sourceAddress" placeholder="Pickup Address (From)" onChange={handleChange} required />
                    <input type="text" name="destinationAddress" placeholder="Drop Address (To)" onChange={handleChange} required />
                    
                    <label className="section-label">Select Vehicle Type</label>
                    <div className="vehicle-grid">
                        {vehicleOptions.map((vehicle) => (
                            <div 
                                key={vehicle.id}
                                className={`vehicle-item ${formData.vehicleType === vehicle.id ? 'active' : ''}`}
                                onClick={() => handleVehicleSelect(vehicle.id)}
                            >
                                <div className="vehicle-icon">{vehicle.icon}</div>
                                <div className="vehicle-info">
                                    <span className="v-title">{vehicle.label}</span>
                                    <span className="v-desc">{vehicle.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="form-row">
                        <input type="number" name="distanceKm" placeholder="Distance (km)" onChange={handleChange} required />
                        <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="book-btn" disabled={loading}>
                        {loading ? 'Processing...' : 'Calculate Price & Book Now'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingForm;