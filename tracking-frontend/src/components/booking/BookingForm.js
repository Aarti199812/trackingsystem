import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BookingForm.css';

const BookingForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        senderName: '',
        recipientName: '',
        senderPhone: '',
        sourceAddress: '',
        destinationAddress: '',
        vehicleType: 'bike',
        weight: '',
        distanceKm: ''
    });

    const vehicleOptions = [
        { id: 'bike', label: 'Two-Wheeler', desc: 'Up to 20kg' },
        { id: 'tata ace', label: 'Tata Ace', desc: '700kg Capacity' },
        { id: 'pickup 8ft', label: 'Pickup 8ft', desc: '1.5 Tonne' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleVehicleSelect = (id) => {
        setFormData({ ...formData, vehicleType: id });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const loggedInUser = JSON.parse(localStorage.getItem('user'));

            if (!loggedInUser || !loggedInUser.id) {
                alert("Please log in first");
                navigate('/login');
                return;
            }

            // ✅ Ensure clean numeric values
            const weight = parseFloat(formData.weight);
            const distance = parseFloat(formData.distanceKm);

            if (isNaN(weight) || isNaN(distance)) {
                alert("Please enter valid weight and distance");
                return;
            }

            const completeData = {
    senderName: formData.senderName,
    recipientName: formData.recipientName,
    senderPhone: formData.senderPhone,
    sourceAddress: formData.sourceAddress,
    destinationAddress: formData.destinationAddress,
    weight: weight,
    distanceKm: distance,
    vehicleType: formData.vehicleType.toLowerCase().trim(),
    userId: loggedInUser.id
            };

            console.log("Payload:", completeData);

            const res = await axios.post(
                "http://localhost:9023/api/parcels/book",
                completeData
            );

            if (res.data && res.data.trackingId) {
                alert(`Booking Successful! Tracking ID: ${res.data.trackingId}`);
                navigate('/user-dashboard');
            }

        } catch (error) {
            console.error("FULL ERROR:", error);
            console.error("RESPONSE:", error.response);

            alert(
                error.response?.data?.message ||
                JSON.stringify(error.response?.data) ||
                "Server error"
            );
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
                        <input
                            type="text"
                            name="senderName"
                            placeholder="Sender Name"
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="recipientName"
                            placeholder="Recipient Name"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <input
                            type="text"
                            name="senderPhone"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <input
                        type="text"
                        name="sourceAddress"
                        placeholder="Pickup Address"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="destinationAddress"
                        placeholder="Drop Address"
                        onChange={handleChange}
                        required
                    />

                    <label className="section-label">Select Vehicle Type</label>

                    <div className="vehicle-grid">
                        {vehicleOptions.map((vehicle) => (
                            <div
                                key={vehicle.id}
                                className={`vehicle-item ${
                                    formData.vehicleType === vehicle.id ? 'active' : ''
                                }`}
                                onClick={() => handleVehicleSelect(vehicle.id)}
                            >
                                <span>{vehicle.label}</span>
                                <small>{vehicle.desc}</small>
                            </div>
                        ))}
                    </div>

                    <div className="form-row">
                        <input
                            type="number"
                            name="distanceKm"
                            placeholder="Distance (km)"
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="number"
                            name="weight"
                            placeholder="Weight (kg)"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Processing...' : 'Book Now'}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default BookingForm;