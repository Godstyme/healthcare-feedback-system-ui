import React, { useState } from 'react';
import loginBg from '../../assets/imgs/login_bg.jpg';
import './Login.css';
import { Link } from 'react-router-dom';


export default function Login() {
   const [showPassword, setShowPassword] = useState(false);

   const toggleShowPassword = () => {
      setShowPassword(!showPassword);
   };

   const rightPanelStyle = {
      backgroundImage: `linear-gradient(135deg, rgba(0,94,184,0.85), rgba(0,165,223,0.7)), url(${loginBg})`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
   };

   return (
      <div className="login-container">
         <div className="login-left">
            <form className="login-form" onSubmit={(e) => e.preventDefault()}>
               <h2>Login to Your Account</h2>

               <label htmlFor="email">Email address</label>
               <input
                  id="email"
                  type="email"
                  placeholder="user@gmail.com"
                  required
               />

               <label htmlFor="password">Password</label>
               <div className="password-wrapper">
                  <input
                     id="password"
                     type={showPassword ? 'text' : 'password'}
                     placeholder="********"
                     required
                  />
                  <button
                     type="button"
                     className="show-password-btn"
                     onClick={toggleShowPassword}
                  >
                     {/* {showPassword ? 'Hide' : 'Show'} */}
                  </button>
               </div>

               <button type="submit" className="login-button">Login</button>

               <p className="signup-text">
                  Don't have an account? <Link to="/register">Sign up</Link>
               </p>
            </form>
         </div>

         <div className="login-right" style={rightPanelStyle}>
            <div className="login-right-content">
               <h2>Welcome to Healthcare Feedback System</h2>
               <p>
                  Access real-time patient feedback, insights, and analytics to improve care quality.
                  Secure login ensures your data and patient information remain protected.
               </p>
            </div>
         </div>
      </div>
   );
}
