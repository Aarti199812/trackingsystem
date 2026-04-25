import React ,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [user , setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () =>{
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  };
   checkUser();
   window.addEventListener("storage",checkUser);

   return () =>{
    window.removeEventListener("Storage",checkUser);
   };
  },[]);

   
  const handleLogout = () =>{
    localStorage.removeItem("user");
    setUser(null);
    navigate('/');

  }; 

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/assests/logo.jpg" alt="SafeParcel Logo" className="logo-img" />
        </Link>
      </div>
      
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/book">Book Parcel</Link></li>
        <li><Link to="/track">Track Status</Link></li>
        {/* <li><Link to="/admin">Admin Panel</Link></li> */}
      </ul>
      
      <div className="navbar-auth">
        {user ? (
          <>
          <span style={{marginRight:"10px"}}></span>
           <button className="login-btn" onClick= {handleLogout}>Logout</button>
          </>
        ):(
        <Link to="/login">
          <button className="login-btn">Login / Register</button>
        </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;