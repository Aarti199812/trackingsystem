
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get("http://localhost:9023/api/parcels/all");
                setBookings(res.data);
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
                <h2>Welcome back, <span className="gold-text">Aarti</span> 👋</h2>
                <p>Manage your SafeParcel deliveries and overview</p>
                </header>

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
                            <h3>{bookings.filter(b => b.status === 'IN_TRANSIT').length}</h3>
                            <p>Active Shipments</p>
                        </div>
                    </div>

                    <div className="stat-card green-border">
                        <div className="stat-icon bg-green"><CheckCircle size={24} /></div>
                        <div className="stat-text">
                        <h3>{bookings.filter(b => b.status === 'DELIVERED').length}</h3>
                        <p>Completed</p>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings Table Section */}
                <div className="table-section">
                    <div className="table-header">
                    <h3>Recent Transactions</h3>
                    </div>
                    <div className="table-container">
                     <table>
                        <thead>
                        <tr>
                        <th>ID</th>
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
                                        <tr key={order.trackingId}>
                                        <td><strong>#{order.trackingId}</strong></td>
                                        <td>{order.destinationAddress}</td>
                                        <td className="capitalize">{order.vehicleType}</td>
                                        <td>
                                        <span className={`status-tag ${order.status?.toLowerCase()}`}>
                                        {order.status || 'Pending'}
                                         </span>
                                        </td>
                                        <td>{new Date(order.bookingDate).toLocaleDateString()}</td>
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