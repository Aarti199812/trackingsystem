import React, { useState } from 'react';
import axios from 'axios';
import './DriverPartner.css';

const DriverPartner = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        city: 'MUMBAI',
        vehicle: '',
        source: ''
    });

    const bannerImg = "/assests/safeparcel.png"; 

    // Note: In images ke paths ko apne public/assets folder ke hisab se update kar lein
    const tripImg = "/assests/SF1.png"; 
    const earningImg = "/assests/SF2.png";
    const paymentImg = "/assests/SF3.png";
    const comm = "/assests/Dexperience.gif";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9023/api/partners/register", formData);
            alert("Registration Successful!");
            console.log(res.data);
        } catch (err) {
            console.error("Submission Error:", err);
            alert("Error registering driver partner");
        }
    };

    return (
        <div className="dp-page-wrapper">
            
            {/* Hero Section */}
            <div className="dp-hero-container" style={{ backgroundImage: `url(${bannerImg})` }}>
                <div className="dp-overlay"></div>
                
                <div className="dp-content-layer">
                    <div className="dp-text-block">
                        <h1 className="dp-main-heading">Attach trucks or bike!</h1>
                        <p className="dp-sub-heading">
                            Transport goods, earn big. Join as a part-time or full-time SafeParcel Partner.
                        </p>
                    </div>

                    <div className="dp-form-card">
                        <h3 className="dp-form-title">Attach Vehicle Now</h3>
                        <form onSubmit={handleSubmit} className="dp-form-element">
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="Name" 
                                onChange={handleChange} 
                                required 
                            />
                            <input 
                                type="tel" 
                                name="mobileNumber" 
                                placeholder="Mobile Number" 
                                onChange={handleChange} 
                                required 
                            />
                            
                            <div className="dp-form-row">
                                <select name="city" onChange={handleChange}>
                                    <option value="RADAUR">RADAUR</option>
                                    <option value="YAMUNANAGAR">YAMUNANAGAR</option>
                                    <option value="KURUKSHETRA">KURUKSHETRA</option>
                                    <option value="KARNAL">KARNAL</option>
                                </select>
                                <select name="vehicle" onChange={handleChange} required>
                                    <option value="">Vehicle</option>
                                    <option value="Bike">Bike</option>
                                    <option value="Scooter">Scooter</option>
                                    <option value="Mini Truck">Mini Truck</option>
                                    <option value="Pickup">Pickup Truck</option>
                                </select>
                            </div>

                            <select name="source" className="dp-full-select" onChange={handleChange} required>
                                <option value="">Source</option>
                                <option value="Google Search">Google Search</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Friend Referral">Friend Referral</option>
                                <option value="Hoarding/Banner">Hoarding / Banner</option>
                            </select>

                            <button type="submit" className="dp-submit-btn">REGISTER</button>
                        </form>

                        <div className="dp-download-footer">
                            <p className="dp-footer-bold">Start Earning Immediately</p>
                            <span className="dp-footer-light">Download the partner app and register</span>
                            <a href="https://play.google.com" target="_blank" rel="noreferrer" className="dp-play-store">
                                <span className="dp-play-icon">▶</span>
                                <div className="dp-play-text">
                                    <small>GET IT ON</small>
                                    <strong>Google Play</strong>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features/Advantage Section */}
            <div className="features-container">
                <div className="feature-card">
                    <img src={tripImg} alt="Regular Trips" className="feature-img" />
                    <h3 className="feature-title">Regular Trips</h3>
                    <p className="feature-desc">With our growing presence across multiple cities, we always have our hands full! This means you will never run out of trips.</p>
                </div>

                <div className="feature-card">
                    <img src={earningImg} alt="Better Earning" className="feature-img" />
                    <h3 className="feature-title">Better Earning</h3>
                    <p className="feature-desc">Earn more by partnering with the best! Regular trips and efficient service can grow your earnings!</p>
                </div>

                <div className="feature-card">
                    <img src={paymentImg} alt="On-Time Payment" className="feature-img" />
                    <h3 className="feature-title">On-Time Payment</h3>
                    <p className="feature-desc">Be assured to receive all payments on time & get the best in class support, when you attach mini truck with Porter.</p>
                </div>
            </div>

            <div className="dp-cta-section">
    <h3 className="cta-main-title">MAKING YOUR LIFE EASY</h3>
    
    <div className="cta-content-wrapper">
        <div className="cta-image-block">
            <img src={comm} alt="commercial" className="cta-img" />
        </div>
        <div className="cta-text-block">
            <p className="cta-desc">
                Attach any of your pickup, 2-wheeler, canter commercial vehicles. If you have a pickup or a commercial vehicle, you are good to go! With Porter, get a job and transport goods. No more waiting on the stand Have a steady stream of trips with minimum assured income and added incentives, so that there is no waiting and idle time at the stand! No more bargaining. Standard Rates The rates and calculation methods are standardised and completely transparent. No more wasting time in fixing the rates for every trip. Hassle Free Navigation With our GPS-based navigation you can drive anywhere across your city without worrying about the directions. Get real-time navigation assistance on the go!
            </p>
        </div>
    </div>
</div>
        </div>
    );
};

export default DriverPartner;