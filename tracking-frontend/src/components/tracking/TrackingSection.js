import React, { useState } from 'react';
import axios from 'axios';

const TrackingSection = () => {
  const [trackingId, setTrackingId] = useState('');
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!trackingId) {
      setError("Please enter a tracking ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cleanId = trackingId.trim().toUpperCase();
      const response = await axios.get(`http://localhost:9023/api/parcels/track/${cleanId}`);
      
      if (response.data) {
        setParcel(response.data);
      } else {
        setError('No data found for this ID');
        setParcel(null);
      }
    } catch (err) {
      setError('Parcel not found. Please check the ID');
      setParcel(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tracking-section">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter tracking number (e.g. PRT-123)"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button onClick={handleTrack} disabled={loading}>
          {loading ? 'Searching...' : 'Track Now'}
        </button>
      </div>

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
        <div className="result-card" style={{ marginTop: '20px', border: '1px solid #ddd', padding: '15px' }}>
          <h2>Order Details</h2>
          <div className="info-grid">
            <p><strong>Tracking ID:</strong> {parcel.trackingId}</p>
            <p><strong>Status:</strong> <span className="status-tag">{parcel.status}</span></p>
            <p><strong>Vehicle:</strong> {parcel.vehicleType}</p>
            <p><strong>Total Price:</strong> ₹{parcel.totalPrice}</p>
            <hr />
            <p><strong>From:</strong> {parcel.sourceAddress}</p>
            <p><strong>To:</strong> {parcel.destinationAddress}</p>
            <p><strong>Distance:</strong> {parcel.distanceKm} km</p>
            <p><strong>Sender:</strong> {parcel.senderName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingSection;