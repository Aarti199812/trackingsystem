import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, ShieldCheck } from 'lucide-react';
import './PaymentPage.css';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [parcelData, setParcelData] = useState(null);
    const [loading, setLoading] = useState(true);

    const queryParams = new URLSearchParams(location.search);
    const trackingId = queryParams.get('id');

    useEffect(() => {
        // Force load Razorpay Script
        const script = document.createElement("script");
        script.src = "https://razorpay.com";
        script.async = true;
        document.body.appendChild(script);

        const fetchParcel = async () => {
            try {
                // Tracking ID se data fetch karna
                const res = await axios.get(`http://localhost:9023/api/parcels/track/${trackingId}`);
                setParcelData(res.data);
            } catch (err) {
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        if (trackingId) fetchParcel();
    }, [trackingId]);

    const handlePayment = () => {
        if (!window.Razorpay) {
            alert("Razorpay is loading... Please wait a moment.");
            return;
        }

        // Calculations
        const base = parcelData?.totalPrice || 0;
        const totalAmount = base + (base * 0.18) + 5;

        const options = {
            key: "rzp_test_Sibpa6BSWYy6eZ", // <--- AAPKI NEW KEY ID
            amount: Math.round(totalAmount * 100), // Paise mein
            currency: "INR",
            name: "SafeParcel Logistics",
            description: `Payment for Order ${trackingId}`,
            image: "https://your-logo-url.com",
            handler: async function (response) {
                try {
                    // Success hone par status update
                    await axios.put(`http://localhost:9023/api/parcels/update-status/${parcelData.id}`, {
                        status: "PAID_SUCCESSFULLY"
                    });
                    alert("Payment Successful! ID: " + response.razorpay_payment_id);
                    navigate("/user-dashboard");
                } catch (err) {
                    alert("Payment Success but Database update failed.");
                }
            },
            prefill: {
                name: parcelData?.senderName || "User",
                contact: parcelData?.senderPhone || "9999999999"
            },
            theme: { color: "#1a237e" }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    if (loading) return <div className="loader">Verifying Order Details...</div>;

    return (
        <div className="payment-page-container">
            <div className="payment-content">
                <div className="payment-main-card">
                    <div className="payment-header-info">
                        <div className="brand-logo">SP</div>
                        <div>
                            <h3>SafeParcel Logistics</h3>
                            <p>Order ID: {trackingId}</p>
                        </div>
                    </div>

                    <div className="price-summary-box">
                        <div className="price-row">
                            <span>Base Amount</span>
                            <span>₹{parcelData?.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="price-row">
                            <span>GST (18%)</span>
                            <span>₹{(parcelData?.totalPrice * 0.18).toFixed(2)}</span>
                        </div>
                        <div className="price-row">
                            <span>Platform Fee</span>
                            <span>₹5.00</span>
                        </div>
                        <hr />
                        <div className="price-row total-row">
                            <span>Total Payable</span>
                            <span>₹{(parcelData?.totalPrice * 1.18 + 5).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="payment-methods-section">
                        <p className="section-title">CHOOSE PAYMENT METHOD</p>
                        {/* Hamesha select dikhane ke liye active class */}
                        <div className="method-item active">
                            <CreditCard size={20} />
                            <span>Cards (Visa, Mastercard, RuPay)</span>
                        </div>
                    </div>

                    <button className="pay-now-btn" onClick={handlePayment}>
                        Pay Now
                    </button>

                    <div className="secure-footer">
                        <ShieldCheck size={14} color="green" />
                        <span>Secure SSL Powered by Razorpay (Test Mode)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
