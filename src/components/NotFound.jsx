import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";
import { FaStethoscope, FaHeartbeat, FaPills, FaUserMd } from "react-icons/fa";

const NotFound = () => {
   return (
      <div className="nf-wrapper">
         {/* Floating Medical Icons */}
         <div className="floating-icons">
            <FaStethoscope className="icon icon-1" />
            <FaHeartbeat className="icon icon-2" />
            <FaPills className="icon icon-3" />
            <FaUserMd className="icon icon-4" />
         </div>

         <div className="nf-content text-center">
            <img
               src="https://i.imgur.com/8Km9tLL.png"
               alt="Doctor Illustration"
               className="nf-illustration"
            />

            <h1 className="nf-title">404</h1>
            <h3 className="nf-subtitle">Page Not Found</h3>

            <p className="nf-desc">
               We couldn't locate the page you're looking for.<br />
               It may have been moved, deleted, or is temporarily unavailable.
            </p>

            <Link to="/" className="btn btn-primary nf-btn">
               Return to Home
            </Link>
         </div>
      </div>
   );
};

export default NotFound;
