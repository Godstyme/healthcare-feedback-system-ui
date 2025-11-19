import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser, FaHome, FaCog, FaCommentDots, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
   const [isOpen, setIsOpen] = useState(false);

   const toggleSidebar = () => setIsOpen(!isOpen);
   const closeSidebar = () => setIsOpen(false);

   return (
      <>
         <button className="btn d-lg-none toggle-sidebar-btn" onClick={toggleSidebar} style={{ backgroundColor: "#2e1645", color: "#fff" }}>
            <FaBars />
         </button>
         {isOpen && <div className="sidebar-overlay d-lg-none" onClick={closeSidebar}></div>}

         <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header">
               <h4 className="text-white mb-3 px-2 me-2">User Panel</h4>
               <button className="toggle-btn d-lg-none text-danger" onClick={closeSidebar}>&#10006;</button>
            </div>

            <ul className="list-unstyled px-2">
               <li>
                  <Link to="/user/dashboard" className="sidebar-link">
                     <FaHome className="me-2" /> Dashboard
                  </Link>
               </li>
               <li>
                  <Link to="/user/profile" className="sidebar-link">
                     <FaUser className="me-2" /> Profile
                  </Link>
               </li>
               <li>
                  <Link to="/user/feedbacks" className="sidebar-link">
                     <FaCommentDots className="me-2" /> Feedbacks
                  </Link>
               </li>
               <li>
                  <Link to="/user/settings" className="sidebar-link">
                     <FaCog className="me-2" /> Settings
                  </Link>
               </li>
               <li>
                  <Link to="/logout" className="sidebar-link">
                     <FaSignOutAlt className="me-2" /> Logout
                  </Link>
               </li>
            </ul>
         </div>
      </>
   );
};

export default Sidebar;