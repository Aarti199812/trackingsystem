import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, CheckCircle, ShieldCheck } from 'lucide-react';
import './PaymentPage.css';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [parcel, setParcel] = useState(null);
    const [loading, setLoading] = useState(true);

    const queryParams = new URLSearchParams(location.search);
    const trackingId = queryParams.get('id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Backend se parcel ki details fetch karna calculations ke liye
                const res = await axios.get(`http://localhost:9023/api/parcels/track/${trackingId}`);
                setParcel(res.data);
            } catch (err) {
                console.error("Fetch error", err);
            } finally {
                setLoading(false);
            }
        };
        if (trackingId) fetchData();
    }, [trackingId]);

    if (loading) return <div className="loader">Calculating Bill...</div>;

    // Real Calculations
    const baseFare = parcel?.totalPrice || 0;
    const gst = baseFare * 0.18; // 18% GST
    const platformFee = 5.00;
    const totalPayable = baseFare + gst + platformFee;

    const handleDummyPayment = async () => {
        try {
            // Real Project Logic: Database mein status update karna
            await axios.put(`http://localhost:9023/api/parcels/update-status/${parcel.id}`, {
                status: "PAID_SUCCESSFULLY"
            });
            alert("Payment Successful! Your order is being processed.");
            navigate('/user-dashboard');
        } catch (err) {
            alert("Payment Failed: Server Error");
        }
    };

    return (
        <div className="payment-page-container">
            {/* Header Navigation jaisa image mein tha */}
            <nav className="payment-nav">
                <Link to="/">Home</Link>
                <Link to="/book">Book Parcel</Link>
                <span className="nav-active">Payment</span>
            </nav>

            <div className="payment-content">
                <div className="payment-main-card">
                    <div className="payment-header-info">
                        <div className="brand-logo">SP</div>
                        <div>
                            <h3>SafeParcel Logistics</h3>
                            <p>Order ID: {parcel?.trackingId}</p>
                        </div>
                    </div>

                    <div className="price-summary-box">
                        <div className="price-row">
                            <span>Base Amount</span>
                            <span>₹{baseFare.toFixed(2)}</span>
                        </div>
                        <div className="price-row">
                            <span>GST (18%)</span>
                            <span>₹{gst.toFixed(2)}</span>
                        </div>
                        <div className="price-row">
                            <span>Platform Fee</span>
                            <span>₹{platformFee.toFixed(2)}</span>
                        </div>
                        <hr />
                        <div className="price-row total-row">
                            <span>Total Payable</span>
                            <span>₹{totalPayable.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="payment-methods-section">
                        <p className="section-title">CHOOSE PAYMENT METHOD</p>
                        <div className="method-item active">
                            <CreditCard size={20} />
                            <span>Cards (Visa, Mastercard, RuPay)</span>
                        </div>
                        <div className="method-item disabled">
                            <span>Netbanking / UPI (Coming Soon)</span>
                        </div>
                    </div><button className="pay-now-btn" onClick={handleDummyPayment}>
                        Pay ₹{totalPayable.toFixed(0)}
                    </button>

                    <div className="secure-footer">
                        <ShieldCheck size={14} color="green" />
                        <span>Secure SSL Encryption | Powered by Razorpay (Test)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;