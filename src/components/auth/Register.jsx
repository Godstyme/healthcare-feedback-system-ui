import React, { useState } from 'react';
import loginBg from  '../../assets/imgs/register_bg.avif';
import './Register.css';
import { Link } from 'react-router-dom';


export default function RegistrationPage() {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const toggleShowPassword = () => setShowPassword(!showPassword);
   const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

   const rightPanelStyle = {
      backgroundImage: `linear-gradient(135deg, rgba(0,94,184,0.85), rgba(0,165,223,0.7)), url(${loginBg})`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
   };

   return (
      <div className="registration-container">
         <div className="registration-left">
            <form className="registration-form" onSubmit={(e) => e.preventDefault()}>
               <h2>Create Your Account</h2>

               <label htmlFor="fullname">Full Name</label>
               <input id="fullname" type="text" placeholder="Godstime Onyibe" required />

               <label htmlFor="email">Email address</label>
               <input id="email" type="email" placeholder="user@gmail.com" required />

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
                  />
               </div>

               <label htmlFor="confirmPassword">Confirm Password</label>
               <div className="password-wrapper">
                  <input
                     id="confirmPassword"
                     type={showConfirmPassword ? 'text' : 'password'}
                     placeholder="********"
                     required
                  />
                  <button
                     type="button"
                     className="show-password-btn"
                     onClick={toggleShowConfirmPassword}
                  />
               </div>

               <button type="submit" className="register-button">Register</button>

               <p className="signin-text">
                  Already have an account? <Link to="/">Sign in</Link>
               </p>
            </form>
         </div>
         <div className="registration-right" style={rightPanelStyle}>
            <div className="registration-right-content">
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
