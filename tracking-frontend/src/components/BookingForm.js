import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        senderName: '',
        senderPhone: '',
        sourceAddress: '',
        destinationAddress: '',
        vehicleType: 'bike',
        weight: 0,
        distanceKm: 0 
    });

    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
    
            const res = await axios.post("http://localhost:9023/api/parcels/book", formData);
            setResponse(res.data);
            alert("Booking Successful! Tracking ID: " + res.data.trackingId);
        } catch (error) {
            console.error("Error booking parcel:", error);
            alert("Booking failed. Check console.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', border: '1px solid #ddd', borderRadius: '10px' }}>
            <h2>Porter Booking</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="senderName" placeholder="Your Name" onChange={handleChange} required style={inputStyle} />
                <input type="text" name="senderPhone" placeholder="Phone Number" onChange={handleChange} required style={inputStyle} />
                <input type="text" name="sourceAddress" placeholder="Pickup Address" onChange={handleChange} required style={inputStyle} />
                <input type="text" name="destinationAddress" placeholder="Drop Address" onChange={handleChange} required style={inputStyle} />
                
                <label>Vehicle Type:</label>
                <select name="vehicleType" onChange={handleChange} style={inputStyle}>
                    <option value="bike">Two-Wheeler (Bike)</option>
                    <option value="tata ace">Tata Ace (700kg)</option>
                    <option value="pickup 8ft">Pickup 8ft (1.5 Tonne)</option>
                </select>

                <input type="number" name="distanceKm" placeholder="Distance (in km)" onChange={handleChange} required style={inputStyle} />
                <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} style={inputStyle} />

                <button type="submit" style={buttonStyle}>Get Price & Book</button>
            </form>

            {response && (
                <div style={{ marginTop: '20px', padding: '10px', background: '#f9f9f9' }}>
                    <h3>Booking Summary:</h3>
                    <p><strong>Tracking ID:</strong> {response.trackingId}</p>
                    <p><strong>Estimated Price:</strong> ₹{response.totalPrice}</p>
                    <p><strong>Status:</strong> {response.status}</p>
                </div>
            )}
        </div>
    );
};


const inputStyle = { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' };
const buttonStyle = { width: '100%', padding: '10px', background: '#87925d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default BookingForm;