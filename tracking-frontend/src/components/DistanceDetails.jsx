import React, { useState } from 'react';

const DistanceDetails = () => {
    const [routeData, setRouteData] = useState(null);
    const [error, setError] = useState(null);

    const handleCheckDistance = async () => {
        try {
    
            const response = await fetch("http://localhost:9023/get-distance?sLat=28.6139&sLng=77.2090&dLat=19.0760&dLng=72.8777");
            
            if (!response.ok) throw new Error("Network response was not ok");
            
            const data = await response.json();
            setRouteData(data);
            setError(null);
        } catch (err) {
            setError("Backend se connect nahi ho pa raha: " + err.message);
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <h3>Route Tracker</h3>
            <button onClick={handleCheckDistance}>Check Distance</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {routeData && routeData.rows && (
                <div style={{ marginTop: '15px' }}>
                    <p><strong>Distance:</strong> {routeData.rows[0].elements[0].distance.text}</p>
                    <p><strong>Time:</strong> {routeData.rows[0].elements[0].duration.text}</p>
                    <p><strong>Status:</strong> {routeData.status}</p>
                </div>
            )}
        </div>
    );
};

export default DistanceDetails;