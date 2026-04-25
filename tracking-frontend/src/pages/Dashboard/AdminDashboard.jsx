import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Users, Package, DollarSign, Settings,LogOut } from 'lucide-react';
import './AdminDashboard.css';
import BookingForm from '../../components/booking/BookingForm';

const AdminDashboard = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser || loggedInUser.role !== 'ADMIN') {
            alert("Access Denied. Admins Only.");
            navigate('/login');
        }
        else  {
            fetchAdminData();
        }
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
            console.log(`Updating ID ${id}`);
            await axios.put(`http://localhost:9023/api/parcels/update-status/${id}`, {
                     status: newStatus
                });

            alert("Status Updated Successfully!");
            fetchAdminData(); 
        } catch (err) {
            alert("Error updating status");
        }
    };

        const totalRevenue = allBookings.reduce((acc, curr) => {
        const p = curr.totalPrice || curr.total_price||curr.price ||0;
        return acc + Number(p);
    }, 0);


    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <h2 className="logo-text">SafeParcel <span className="admin-tag">Admin</span></h2>
                <nav>
                    <div className="nav-item active"><Package /> Bookings</div>
                    <div className="nav-item"><Users /> Users</div>
                    <div className="nav-item"><Settings /> Settings</div>
                </nav>
                <div className='nav-item' style={{marginTop:'auto',color:'#e74c3c',cursor:'pointer',padding:'10px 20px'}}
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = '/';
                    }}
                >
                    <LogOut size={20}/><span style={{marginLeft:'10px'}} >Logout</span>
                </div>
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
                        <div className='stat-info'>
                            <h3>₹{totalRevenue}</h3>
                            <p>Total Revenue</p>
                        </div>
                    </div>
                </div>

                <div className="admin-table-section">
                    <h3>All Deliveries</h3>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tracking Id</th>
                                <th>Sender</th>
                                <th>From - To</th>
                                <th>Vehicle</th>
                                <th>Status</th>
                                <th>Action</th></tr>
                        </thead>
                        <tbody>
                            {allBookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>{booking.trackingId}</td>
                                    <td>{booking.senderName}</td>
                                    <td>{booking.sourceAddress} + {booking.destinationAddress}</td>
                                    <td className="capitalize">{booking.vehicleType}</td>
                                    <td>
                                        <span className={`a-badge ${booking.status?.toLowerCase()}`}>
                                            {booking.status}
                                            </span>
                                            </td>
                                        <td>
                                        <select 
                                            className="status-select"
                                            value={booking.status}
                                            onChange={(e) => updateStatus(booking.id, e.target.value)}
                                            style={{
                                                padding:'5px',
                                                borderRadius:'5px',
                                                backgroundColor:booking.status==='DELIVERED'?'#d4edda':'fff3cd'
                                            }}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="IN_TRANSIT">In Transit</option>
                                            <option value="DELIVERED">Delivered</option>
                                            <option value="CANCELLED">Cancelled</option>
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