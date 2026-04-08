import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Package, DollarSign, Settings } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            // Admin endpoint to get ALL parcels
            const res = await axios.get("http://localhost:9023/api/parcels/all");
            setAllBookings(res.data);
        } catch (err) {
            console.error("Admin Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:9023/api/parcels/update-status/${id}`, { status: newStatus });
            alert("Status Updated Successfully!");
            fetchAdminData(); // Refresh list
        } catch (err) {
            alert("Error updating status");
        }
    };

    const totalRevenue = allBookings.reduce((acc, curr) => acc + (curr.price || 0), 0);

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <h2 className="logo-text">SafeParcel <span className="admin-tag">Admin</span></h2>
                <nav>
                    <div className="nav-item active"><Package /> Bookings</div>
                    <div className="nav-item"><Users /> Users</div>
                    <div className="nav-item"><Settings /> Settings</div>
                </nav>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <h1>Management Overview</h1>
                    <div className="admin-profile">Admin Panel | Aarti</div>
                </header>

                <div className="admin-stats">
                    <div className="a-stat-card">
                        <Package color="#1a2a6c" />
                        <div><h3>{allBookings.length}</h3><p>Total Orders</p></div>
                    </div>
                    <div className="a-stat-card">
                        <DollarSign color="#b8860b" />
                        <div><h3>₹{totalRevenue}</h3><p>Total Revenue</p></div>
                    </div>
                </div>

                <div className="admin-table-section">
                    <h3>All Deliveries</h3>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>From - To</th>
                                <th>Vehicle</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allBookings.map((b) => (
                                <tr key={b.trackingId}>
                                    <td>{b.senderName}</td>
                                    <td>{b.sourceAddress} → {b.destinationAddress}</td>
                                    <td className="capitalize">{b.vehicleType}</td>
                                    <td><span className={`a-badge ${b.status?.toLowerCase()}`}>{b.status}</span></td>
                                    <td>
                                        <select 
                                            onChange={(e) => updateStatus(b.trackingId, e.target.value)}
                                            defaultValue={b.status}
                                            className="status-select"
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="IN_TRANSIT">In Transit</option>
                                            <option value="DELIVERED">Delivered</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;