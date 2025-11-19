import React, { useState, useRef, useEffect } from "react";
import loginBg from "../../assets/imgs/register_bg.avif";
import "./Register.css";
import { Link } from "react-router-dom";
import AuthService from "../../services/authService";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export default function RegistrationPage() {
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const fullNameRef = useRef(null);

   useEffect(() => {
      if (fullNameRef.current) {
         fullNameRef.current.focus();
      }
   }, []);

   useEffect(() => {
      document.querySelector(".registration-form").classList.add("slide-in");
   }, []);

   const toggleShowPassword = () => setShowPassword(!showPassword);
   const toggleShowConfirmPassword = () =>
      setShowConfirmPassword(!showConfirmPassword);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const full_name = e.target.fullname.value.trim();
      const email = e.target.email.value.trim();
      const password = e.target.password.value.trim();
      const confirmPassword = e.target.confirmPassword.value.trim();

      if (password !== confirmPassword) {
         toast.error("Passwords do not match!");
         return;
      }

      try {
         await AuthService.register({
            fullname: full_name,
            email,
            password,
         });

         toast.success("Registration successful! Please login.");
      } catch (error) {
         toast.error(error.response?.data?.message || "Registration failed.");
      }
   };

   const rightPanelStyle = {
      backgroundImage: `linear-gradient(135deg, rgba(0,94,184,0.85), rgba(0,165,223,0.7)), url(${loginBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
   };

   return (
      <div className="registration-container">
         <div className="registration-left">
            <form className="registration-form" onSubmit={handleSubmit}>
               <h2>Create Your Account</h2>

               <label htmlFor="fullname">Full Name</label>
               <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="Godstime Onyibe"
                  ref={fullNameRef}
                  required
               />

               <label htmlFor="email">Email address</label>
               <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="user@gmail.com"
                  required
               />

               <label htmlFor="password">Password</label>
               <div className="password-wrapper">
                  <input
                     id="password"
                     name="password"
                     type={showPassword ? "text" : "password"}
                     placeholder="********"
                     required
                  />
                  <button type="button" className="icon-btn" onClick={toggleShowPassword}>
                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
               </div>

               <label htmlFor="confirmPassword">Confirm Password</label>
               <div className="password-wrapper">
                  <input
                     id="confirmPassword"
                     name="confirmPassword"
                     type={showConfirmPassword ? "text" : "password"}
                     placeholder="********"
                     required
                  />
                  <button
                     type="button"
                     className="icon-btn"
                     onClick={toggleShowConfirmPassword}
                  >
                     {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
               </div>

               <button type="submit" className="register-button">
                  Register
               </button>

               <p className="signin-text">
                  Already have an account? <Link to="/login">Sign in</Link>
               </p>
            </form>
         </div>

         <div className="registration-right" style={rightPanelStyle}>
            <div className="registration-right-content">
               <h2>Welcome to Healthcare Feedback System</h2>
               <p>
                  Access real-time patient feedback, insights, and analytics to improve care quality.
               </p>
            </div>
         </div>
      </div>
   );
}
