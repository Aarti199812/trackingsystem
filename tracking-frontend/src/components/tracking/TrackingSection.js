import React, { useState } from 'react';
import axios from 'axios';
import './TrackingSection.css';

const TrackingSection = () => {
    const [trackingId, setTrackingId] = useState('');
    const [parcel, setParcel] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = async (e) => {
        if (e) e.preventDefault(); // Form submit refresh rokne ke liye
        
        if (!trackingId) {
            setError("Please enter a valid Tracking ID");
            return;
        }

        setLoading(true);
        setError(null);
        setParcel(null);

        try {
            const cleanId = trackingId.trim().toUpperCase();
            const response = await axios.get(`http://localhost:9023/api/parcels/track/${cleanId}`);
            
            if (response.data) {
                setParcel(response.data);
            } else {
                setError('No parcel found with this ID.');
            }
        } catch (err) {
            setError('Invalid Tracking ID. Please try again.');
        } finally {
            setLoading(false);
        }
    };

<<<<<<< Updated upstream
      {error && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
=======
    return (
        <div className="tracking-container" >
            <div className="tracking-search-card">
                <h2>🔍 Track Your Shipment</h2>
                <p>Enter your tracking number to get real-time updates.</p>
                
                <form onSubmit={handleTrack} className="search-box">
                    <input
                        type="text"
                        placeholder="e.g. PRT-XXXXXX"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Searching...' : 'Track Now'}
                    </button>
                </form>
                {error && <p className="error-text">{error}</p>}
            </div>
>>>>>>> Stashed changes

            {parcel && (
                <div className="status-card">
                    <div className="status-header">
                        <h3>Order Details</h3>
                        <span className={`status-badge ${parcel.status.toLowerCase().replace(' ', '-')}`}>
                            {parcel.status}
                        </span>
                    </div>
                    
                    <div className="status-grid">
                        <div className="info-item">
                            <label>Tracking ID</label>
                            <span>{parcel.trackingId}</span>
                        </div>
                        <div className="info-item">
                            <label>Customer Name</label>
                            <span>{parcel.senderName}</span>
                        </div>
                        <div className="info-item">
                            <label>From</label>
                            <span>{parcel.sourceAddress}</span>
                        </div>
                        <div className="info-item">
                            <label>To</label>
                            <span>{parcel.destinationAddress}</span>
                        </div>
                        <div className="info-item">
                            <label>Vehicle</label>
                            <span>{parcel.vehicleType}</span>
                        </div>
                        <div className="info-item">
                            <label>Total Price</label>
                            <span>₹{parcel.totalPrice}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackingSection;