import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser, FaHome, FaCog, FaCommentDots, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleSidebar = () => setIsOpen(!isOpen);

   return (
      <>
         <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header">
               <h4 className="text-white text-center mb-3">User Panel</h4>
               <button className="toggle-btn d-lg-none" onClick={toggleSidebar}>
                  ✖
               </button>
            </div>
            <ul className="list-unstyled px-2">
               <li>
                  <Link to="/user/dashboard" className="text-white text-decoration-none d-block py-2 px-3">
                     <FaHome className="me-2" /> Dashboard
                  </Link>
               </li>
               <li>
                  <Link to="/user/profile" className="text-white text-decoration-none d-block py-2 px-3">
                     <FaUser className="me-2" /> Profile
                  </Link>
               </li>
               <li>
                  <Link to="/user/feedbacks" className="text-white text-decoration-none d-block py-2 px-3">
                     <FaCommentDots className="me-2" /> Feedbacks
                  </Link>
               </li>
               <li>
                  <Link to="/user/settings" className="text-white text-decoration-none d-block py-2 px-3">
                     <FaCog className="me-2" /> Settings
                  </Link>
               </li>
               <li>
                  <Link to="/logout" className="text-white text-decoration-none d-block py-2 px-3">
                     <FaSignOutAlt className="me-2" /> Logout
                  </Link>
               </li>
            </ul>
         </div>

         {/* Mobile toggle */}
         <button className="btn btn-primary d-lg-none toggle-sidebar-btn" onClick={toggleSidebar}>
            <FaBars />
         </button>
      </>
   );
};

export default Sidebar;
