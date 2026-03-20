import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
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
        setError(null);
      } else {
        setError('No data found for this ID');
        setParcel(null);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError('Parcel not found. Please check the ID (e.g., TRK-123)');
      setParcel(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Parcel Tracking System</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter tracking number (e.g. TRK-123)"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <button onClick={handleTrack} disabled={loading}>
            {loading ? 'Searching...' : 'Track Parcel'}
          </button>
        </div>

        {error && <p className="error-message" style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

        {parcel && (
          <div className="result-card">
            <h2>Parcel Information</h2>
            <div className="info-grid">
              <p><strong>Tracking ID:</strong> {parcel.trackingId}</p>
              <p><strong>Sender:</strong> {parcel.senderName}</p>
              <p><strong>Receiver:</strong> {parcel.recipientName}</p>
              <p><strong>From:</strong> {parcel.sourceAddress}</p>
              <p><strong>To:</strong> {parcel.destinationAddress}</p>
              <p><strong>Status:</strong> <span className="status-tag">{parcel.status}</span></p>
              <p><strong>Weight:</strong> {parcel.weight} kg</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;