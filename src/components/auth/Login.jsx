import React, { useState, useEffect } from "react";
import loginBg from "../../assets/imgs/login_bg.jpg";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaMicrosoft } from "react-icons/fa";

export default function Login() {
   const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   useEffect(() => {
      document.querySelector(".login-form").classList.add("slide-in");
   }, []);

   const toggleShowPassword = () => setShowPassword(!showPassword);

   const rightPanelStyle = {
      backgroundImage: `linear-gradient(135deg, rgba(0,94,184,0.85), rgba(0,165,223,0.7)), url(${loginBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
   };

   const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         const res = await AuthService.login(email, password);

         toast.success("Login successful!");

         localStorage.setItem("access_token", res.access_token);
         localStorage.setItem("user_id", res.user.user_id);

         if (res.user.role === "admin") navigate("/admin/dashboard");
         else navigate("/user/dashboard");
      } catch (err) {
         toast.error(err?.response?.data?.message || "Login failed");
      }

      setLoading(false);
   };

   const handleSocialLogin = (provider) => {
      toast.info(`Redirecting to ${provider} login...`);
   };

   return (
      <div className="login-container">
         <div className="login-left">
            <form className="login-form" onSubmit={handleLogin}>
               <h2>Welcome Back</h2>
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
                     type={showPassword ? "text" : "password"}
                     placeholder="********"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
                  <button type="button" className="icon-btn" onClick={toggleShowPassword}>
                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
               </div>
               <button type="submit" className="login-button" disabled={loading}>
                  {loading ? "Signing in..." : "Login"}
               </button>
               <div className="login-divider">
                  <span>or continue with</span>
               </div>
               <div className="social-login-group">

                  <button
                     type="button"
                     className="social-btn google-btn"
                     onClick={() => handleSocialLogin("Google")}
                  >
                     <FcGoogle size={22} className="me-2" />
                     Continue with Google
                  </button>

                  <button
                     type="button"
                     className="social-btn apple-btn"
                     onClick={() => handleSocialLogin("Apple")}
                  >
                     <FaApple size={22} className="me-2" />
                     Sign in with Apple
                  </button>

                  <button
                     type="button"
                     className="social-btn microsoft-btn"
                     onClick={() => handleSocialLogin("Microsoft")}
                  >
                     <FaMicrosoft size={22} className="me-2" />
                     Sign in with Outlook
                  </button>

               </div>

               <p className="signup-text mt-3">
                  Don't have an account? <Link to="/register">Sign Up</Link>
               </p>
            </form>
         </div>

         <div className="login-right" style={rightPanelStyle}>
            <div className="login-right-content">
               <h2>Healthcare Feedback System</h2>
               <p>
                  Log in to manage your appointments, submit feedback, and track your health insights.
               </p>
            </div>
         </div>
      </div>
   );
}
