import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Package, Truck, CheckCircle } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const loggedInUser = JSON.parse(localStorage.getItem('user'));
                
                if (loggedInUser && loggedInUser.email) {
                    const res = await axios.get(`http://localhost:9023/api/parcels/user?email=${loggedInUser.email}`);
                    console.log("Backend Se Aaya Data:", res.data);
                    setBookings(res.data);
                } else {
                    console.warn("No user found in localStorage");
                }
            } catch (err) {
                console.error("Data fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-content">
                <header className="db-header">
                    <h2>Welcome back to <span className="gold-text">SafeParcel</span> 👋</h2>
                    <p>Manage your SafeParcel deliveries and overview</p>
                </header>

                {/* 📊 STATS CARDS */}
                <div className="stats-grid">
                    <div className="stat-card blue-border">
                        <div className="stat-icon bg-blue"><Package size={24} /></div>
                        <div className="stat-text">
                            <h3>{bookings.length}</h3>
                            <p>Total Bookings</p>
                        </div>
                    </div>

                    <div className="stat-card gold-border">
                        <div className="stat-icon bg-gold"><Truck size={24} /></div>
                        <div className="stat-text">
                            <h3>{bookings.filter(b => b.status?.toUpperCase() === 'IN_TRANSIT' || b.status?.toUpperCase() === 'IN TRANSIT').length}</h3>
                            <p>Active Shipments</p>
                        </div>
                    </div>

                    <div className="stat-card green-border">
                        <div className="stat-icon bg-green"><CheckCircle size={24} /></div>
                        <div className="stat-text">
                            <h3>{bookings.filter(b => b.status?.toUpperCase() === 'DELIVERED').length}</h3>
                            <p>Completed</p>
                        </div>
                    </div>
                </div>

                {/* 📝 RECENT TRANSACTIONS TABLE */}
                <div className="table-section">
                    <div className="table-header">
                        <h3>Recent Transactions</h3>
                    </div>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tracking ID</th>
                                    <th>Destination</th>
                                    <th>Vehicle</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" className="text-center">Loading Data...</td></tr>
                                ) : bookings.length > 0 ? (
                                    bookings.slice(0, 5).map((order) => (
                                        <tr key={order.id || order.trackingId}>
                                            <td><strong>#{order.trackingId || order.tracking_id}</strong></td>
                                            <td>{order.destinationAddress || order.destination_address}</td>
                                            <td className="capitalize">{order.vehicleType || order.vehicle_type}</td>
                                            <td>
                                                <span className={`status-tag ${order.status?.toLowerCase().replace("_", "-")}`}>
                                                    {order.status || 'PENDING'}
                                                </span>
                                            </td>
                                            <td>
                                                {order.createdAt || order.created_at 
                                                    ? new Date(order.createdAt || order.created_at).toLocaleDateString() 
                                                    : 'N/A'
                                                }
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="5" className="text-center">No bookings found. Start by booking a parcel!</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;