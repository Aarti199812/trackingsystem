import React, { useState } from 'react';
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            setMessage("Password do not match");
            return;
        }
        try{
            const response = await axios.post("http://localhost:9023/api/users/register",
                {
                    name:formData.name,
                    email: formData.email,
                    password: formData.password
                }
            );

            setMessage(response.data.message);

            setTimeout(()=>{
                navigate("/login");
            },1500);
        }catch (err){
            if(err.message){
                setMessage(err.response.data);
            }else{
                setMessage("Something went wrong");
            }
        }
    };
  return (
    <div className="register-container">
        <div className="register-card">
            <h2>Create Account</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required/>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required/>

                <button type="submit">Register</button>
            </form>

            {message && <p className="message">{message}</p>}
            <p className="login-link">
                Already have an account?{" "}
                <span onClick={()=>navigate("/login")}>Login</span>
            </p>
        </div>

      
    </div>
  );
};

export default Register
