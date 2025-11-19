import React, { useState } from 'react';
import loginBg from '../../assets/imgs/login_bg.jpg';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from "../../services/authService";
import { toast } from "react-toastify";

export default function Login() {
   const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const toggleShowPassword = () => setShowPassword(!showPassword);

   const rightPanelStyle = {
      backgroundImage: `linear-gradient(135deg, rgba(0,94,184,0.85), rgba(0,165,223,0.7)), url(${loginBg})`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         const response = await AuthService.login(email, password);

         toast.success("Login successful!");

         localStorage.setItem("access_token", response.access_token);
         localStorage.setItem("user_id", response.user.user_id);

         if (response.user.role === "admin") {
            navigate("/admin/dashboard");
         } else if (response.user.role === "patient") {
            navigate("/user/dashboard");
         }
         else {
            navigate("/user/dashboard");
         }
      } catch (err) {
         toast.error(err?.response?.data?.message || "Login failed");
      }

      setLoading(false);
   };

   return (
      <div className="login-container">
         <div className="login-left">
            <form className="login-form" onSubmit={handleLogin}>
               <h2>Login to Your Account</h2>

               <label htmlFor="email">Email address</label>
               <input
                  id="email"
                  type="email"
                  placeholder="user@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />

               <label htmlFor="password">Password</label>
               <div className="password-wrapper">
                  <input
                     id="password"
                     type={showPassword ? 'text' : 'password'}
                     placeholder="********"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
                  <button
                     type="button"
                     className="show-password-btn"
                     onClick={toggleShowPassword}
                  >
                     {showPassword ? 'Hide' : 'Show'}
                  </button>
               </div>

               <button type="submit" className="login-button" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
               </button>

               <p className="signup-text">
                  Don't have an account? <Link to="/register">Sign up</Link>
               </p>
            </form>
         </div>

         <div className="login-right" style={rightPanelStyle}>
            <div className="login-right-content">
               <h2>Welcome to Healthcare Feedback System</h2>
               <p>
                  Access patient feedback securely and improve healthcare quality.
               </p>
            </div>
         </div>
      </div>
   );
}
