import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Users, Package, DollarSign, Settings, LogOut } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [allUsers, setAllUsers] = useState([]); // Users data ke liye state
    const [activeTab, setActiveTab] = useState('bookings'); // Active tab control karne ke liye
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser || loggedInUser.role !== 'ADMIN') {
            alert("Access Denied. Admins Only.");
            navigate('/login');
        } else {
            fetchAdminData();
            fetchUsersData(); // Users fetch karne wala function
        }
    }, []);

    // 1. Fetch All Bookings
    const fetchAdminData = async () => {
        try {
            const res = await axios.get("http://localhost:9023/api/parcels/all");
            setAllBookings(res.data);
        } catch (err) {
            console.error("Admin Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // 2. Fetch All Users
    const fetchUsersData = async () => {
        try {
            // Note: Apne backend ke hisaab se users ka sahi api endpoint url check kar lena
            const res = await axios.get("http://localhost:9023/api/users/all"); 
            setAllUsers(res.data);
        } catch (err) {
            console.error("Users Fetch Error:", err);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
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
        const p = curr.totalPrice || curr.total_price || curr.price || 0;
        return acc + Number(p);
    }, 0);

    return (
        <div className="admin-container">
            {/* --- SIDEBAR --- */}
            <aside className="admin-sidebar">
                <h2 className="logo-text">SafeParcel <span className="admin-tag">Admin</span></h2>
                <nav>
                    <div 
                        className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bookings')}
                    >
                        <Package /> Bookings
                    </div>
                    <div 
                        className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <Users /> Users
                    </div>
                    <div 
                        className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('settings')}
                    >
                        <Settings /> Settings
                    </div>
                </nav>
                <div className='nav-item' style={{marginTop:'auto', color:'#e74c3c', cursor:'pointer', padding:'10px 20px'}}
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = '/';
                    }}
                >
                    <LogOut size={20}/><span style={{marginLeft:'10px'}} >Logout</span>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>Management Overview</h1>
                    <div className="admin-profile">Admin Panel | Aarti</div>
                </header>

                {/* Stats Section (Dono panels ke liye top par analytics dikhaega) */}
                <div className="admin-stats">
                    <div className="a-stat-card">
                        <Package color="#1a2a6c" />
                        <div><h3>{allBookings.length}</h3><p>Total Orders</p></div>
                    </div>
                    <div className="a-stat-card">
                        <Users color="#2ecc71" />
                        <div><h3>{allUsers.length}</h3><p>Total Users</p></div>
                    </div>
                    <div className="a-stat-card">
                        <DollarSign color="#b8860b" />
                        <div className='stat-info'>
                            <h3>₹{totalRevenue}</h3>
                            <p>Total Revenue</p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div style={{padding: '20px', textAlign: 'center'}}>Loading data...</div>
                ) : (
                    <>
                        {/* --- CONDITIONALLY RENDER PANELS --- */}
                        
                        {/* 1. BOOKINGS TAB */}
                        {activeTab === 'bookings' && (
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
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allBookings.map((booking) => (
                                            <tr key={booking.id}>
                                                <td>{booking.id}</td>
                                                <td>{booking.trackingId}</td>
                                                <td>{booking.senderName}</td>
                                                <td>{booking.sourceAddress} → {booking.destinationAddress}</td>
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
                                                            backgroundColor:booking.status==='DELIVERED'?'#d4edda':'#fff3cd'
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
                        )}

                        {/* 2. USERS TAB */}
                        {activeTab === 'users' && (
                            <div className="admin-table-section">
                                <h3>Registered Users</h3>
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allUsers.length === 0 ? (
                                            <tr><td colSpan="4" style={{textAlign: 'center'}}>No users found</td></tr>
                                        ) : (
                                            allUsers.map((user) => (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>
                                                        <span className={`a-badge ${user.role?.toLowerCase() === 'admin' ? 'delivered' : 'pending'}`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* 3. SETTINGS TAB */}
                        {activeTab === 'settings' && (
                            <div className="admin-table-section">
                                <h3>Account Settings</h3>
                                <div style={{padding: '20px', background: '#f9f9f9', borderRadius: '8px', marginTop: '15px'}}>
                                    <p><strong>Admin Name:</strong> Aarti</p>
                                    <p>System settings and configurations can be added here.</p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;