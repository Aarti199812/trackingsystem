import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Redirection ke liye
import './BookingForm.css';

const BookingForm = () => {
    const navigate = useNavigate(); // Navigation hook
    
    const savedName = localStorage.getItem('userName') || "";
    const savedPhone = localStorage.getItem('userPhone') || "";

    const [booking, setBooking] = useState({
        senderName: savedName,
        senderPhone: savedPhone,
        pickupAddress: '',
        fromCity: '',
        recipientName: '',
        recipientPhone: '',
        dropAddress: '',
        toCity: '',
        parcelType: 'General Goods'
    });

    const [weight, setWeight] = useState(123);
    const [selectedVehicle, setSelectedVehicle] = useState('3 Wheeler');
    const [fareData, setFareData] = useState(null);
    const [loading, setLoading] = useState(false);

    const vehicles = [
        { name: '3 Wheeler', cap: '500kg', type: 'bike', img: 'https://nest-platform-assets.porter.in/3_wheeler_d873d6117b.svg' },
        { name: 'Tata Ace', cap: '750kg', type: 'tataace', img: 'https://nest-platform-assets.porter.in/tata_ace_190014022a.svg' },
        { name: 'Pickup 8ft', cap: '1.2 Ton', type: 'pickup8ft', img: 'https://nest-platform-assets.porter.in/pickup_8ft_7d781b29d9.svg' },
        { name: 'Medium Truck', cap: '3 Ton', type: 'mediumtruck', img: 'https://nest-platform-assets.porter.in/truck_14ft_9731295982.svg' }
    ];

    const cities = ["Yamunanagar", "Radaur", "Kurukshetra", "Karnal", "Ambala", "Chandigarh"];

    const handleCalculate = async () => {
        if (!booking.fromCity || !booking.toCity) {
            alert("Please select both cities!");
            return;
        }
        setLoading(true);
        try {
            const vType = vehicles.find(v => v.name === selectedVehicle).type;
            const res = await fetch(`http://localhost:9023/api/tracking/get-fare?from=${booking.fromCity}&to=${booking.toCity}&vehicleType=${vType}&weight=${weight}`);

            if (!res.ok) throw new Error("backend error");
            const data = await res.json();
            setFareData(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
        
   const handleConfirm = async () => {
    if (!fareData) {
        alert("Pehle Fare Calculate karein!");
        return;
    }

    // 1. Local Storage se data nikalne ka sabse safe tarika
    const storedUser = localStorage.getItem('user');
    const storedUserId = localStorage.getItem('userId');
    
    let finalUserId = null;

    if (storedUserId) {
        finalUserId = storedUserId;
    } else if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        finalUserId = parsedUser.id;
    }

    // Agar ID abhi bhi nahi mili toh error dikhao
    if (!finalUserId) {
        alert("Session expired! Please Login again.");
        return;
    }
    if (!booking.recipientPhone|| booking.recipientPhone.trim()===""){
        alert("recieved phone no required");
        return;
    }

    const generatedTrackingId = "SP-" + Math.floor(100000 + Math.random() * 900000);

    // 2. Payload Structure (Dhyan rakho: user object ke andar ID honi chahiye)
    const payload = {
        trackingId: generatedTrackingId,
        senderName: booking.senderName,
        recipientName: booking.recipientName,
        sourceAddress: booking.pickupAddress,
        destinationAddress: booking.dropAddress,
        weight: parseFloat(weight),
        status: "Awaiting Payment",
        vehicleType: selectedVehicle,
        totalPrice: parseFloat(fareData.fare),
        distanceKm: parseFloat(fareData.distance.replace(/[^0-9.]/g, '')),
        senderPhone: booking.senderPhone,
        recipientPhone: booking.recipientPhone,
        // Backend entity ki mandatory field
        userId: Number(storedUserId) 
        
    };

    console.log("Final Payload checking before fetch:", payload);

    try {
        const response = await fetch("http://localhost:9023/api/parcels/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload) // Make sure JSON is CAPITAL
        });

        if (response.ok) {
            // SUCCESS: Redirect to Payment Page
            navigate(`/payment?id=${generatedTrackingId}`);
        } else {
            const errorMsg = await response.text();
            console.error("Backend Error:", errorMsg);
            alert("Backend Error: " + errorMsg);
        }
    } catch (err) {
        console.error("Connection Error:", err);
        alert("Server se connect nahi ho pa rha! Check Spring Boot.");
    }
};
       
        
    return (
        <div className="booking-page">
            <div className="form-container">
                <div className="step-card">
                    <div className="step-badge">1</div>
                    <h3>Sender Details</h3>
                    <div className="input-grid">
                        <div className="input-field">
                            <label>SENDER NAME *</label>
                            <input type="text" value={booking.senderName} onChange={(e) => setBooking({...booking, senderName: e.target.value})} />
                        </div>
                        <div className="input-field">
                            <label>MOBILE *</label>
                            <input type="text" value={booking.senderPhone} onChange={(e) => setBooking({...booking, senderPhone: e.target.value})} />
                        </div>
                        <div className="input-field full">
                            <label>PICKUP ADDRESS *</label>
                            <input type="text" placeholder="Street / Area" onChange={(e) => setBooking({...booking, pickupAddress: e.target.value})} />
                        </div>
                        <div className="input-field">
                            <label>FROM CITY *</label>
                            <select value={booking.fromCity} onChange={(e) => setBooking({...booking, fromCity: e.target.value})}>
                                <option value="">Select City</option>
                                {cities.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="step-card">
                    <div className="step-badge">2</div>
                    <h3>Receiver Details</h3>
                    <div className="input-grid">
                        <div className="input-field">
                            <label>RECEIVER NAME *</label>
                            <input type="text" placeholder="Full Name" onChange={(e) => setBooking({...booking, recipientName: e.target.value})} />
                        </div>
                        <div className="input-field">
                            <label>MOBILE *</label>
                            <input type="text" placeholder="Mobile No" value= {booking.recipientPhone || ""} onChange={(e) => setBooking({...booking, recipientPhone: e.target.value})} />
                        </div>
                        <div className="input-field full">
                            <label>DROP ADDRESS *</label>
                            <input type="text" placeholder="Delivery Address" onChange={(e) => setBooking({...booking, dropAddress: e.target.value})} />
                        </div>
                        <div className="input-field">
                            <label>TO CITY *</label>
                            <select value={booking.toCity} onChange={(e) => setBooking({...booking, toCity: e.target.value})}>
                                <option value="">Select City</option>
                                {cities.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="step-card">
                    <div className="step-badge">3</div>
                    <h3>Weight & Vehicle</h3>
                    <div className="weight-section">
                        <h2>{weight} kg</h2>
                        <input type="range" min="1" max="500" value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </div>
                    <div className="vehicle-grid">
                        {vehicles.map(v => (
                            <div key={v.name} className={`v-card ${selectedVehicle === v.name ? "active" : ""}`} onClick={() => setSelectedVehicle(v.name)}><img src={v.img} alt={v.name} style={{width:'40px'}}/>
                                <h4>{v.name}</h4>
                                <span>{v.cap}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="step-card">
                    <div className="step-badge">4</div>
                    <button className="calc-btn" onClick={handleCalculate} disabled={loading}>
                        {loading ? "Calculating..." : "Calculate Estimate"}
                    </button>
                    {fareData && (
                        <div className="fare-box">
                            <h1>₹{fareData.fare}</h1>
                            <p>Distance: {fareData.distance} | {selectedVehicle}</p>
                            <button className="confirm-btn" onClick={handleConfirm}>Confirm & Pay</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingForm;