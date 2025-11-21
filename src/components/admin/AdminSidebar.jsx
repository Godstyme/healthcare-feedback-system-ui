import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
   FaBars,
   FaTachometerAlt,
   FaUsers,
   FaUserShield,
   FaComments,
   FaChartBar,
   FaCogs,
   FaSignOutAlt,
   FaUsersCog,
   FaUserTie
} from "react-icons/fa";
import "./AdminSidebar.css";

const AdminSidebar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const location = useLocation();

   const toggleSidebar = () => setIsOpen(!isOpen);
   const closeSidebar = () => setIsOpen(false);

   const isActive = (path) => location.pathname === path;

   return (
      <>
         <button
            className="btn btn-primary d-lg-none admin-toggle-btn"
            onClick={toggleSidebar}
         >
            <FaBars />
         </button>

         {isOpen && <div className="admin-sidebar-overlay d-lg-none" onClick={closeSidebar} />}

         <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
            <div className="admin-sidebar-header d-flex justify-content-between align-items-center px-3">
               <h5 className="text-white mb-0">Admin Panel</h5>
               <button className="admin-close-btn d-lg-none" onClick={closeSidebar}>
                  ✖
               </button>
            </div>

            <ul className="list-unstyled mt-3">
               <li>
                  <Link
                     to="/admin/dashboard"
                     className={`admin-sidebar-link ${isActive("/admin/dashboard") ? "active" : ""}`}
                     onClick={closeSidebar}
                  >
                     <FaTachometerAlt className="me-2" /> Dashboard
                  </Link>
               </li>
               <li>
                  <Link
                     to="/admin/users"
                     className={`admin-sidebar-link ${isActive("/admin/users") ? "active" : ""}`}
                     onClick={closeSidebar}
                  >
                     <FaUsers className="me-2" /> Manage Users
                  </Link>
               </li>
               <li>
                  <Link
                     to="/admin/feedbacks"
                     className={`admin-sidebar-link ${isActive("/admin/feedbacks") ? "active" : ""}`}
                     onClick={closeSidebar}
                  >
                     <FaComments className="me-2" /> Feedbacks
                  </Link>
               </li>
               <li>
                  <Link
                     to="/admin/analytics"
                     className={`admin-sidebar-link ${isActive("/admin/analytics") ? "active" : ""}`}
                     onClick={closeSidebar}
                  >
                     <FaChartBar className="me-2" /> Analytics
                  </Link>
               </li>
               <li>
                  <Link
                     to="/admin/settings"
                     className={`admin-sidebar-link ${isActive("/admin/settings") ? "active" : ""}`}
                     onClick={closeSidebar}
                  >  
                     <FaUsersCog className="me-2" />Manage Admins
                  </Link>
               </li>
               <li>
                  <Link
                     to="/admin/settings"
                     className={`admin-sidebar-link ${isActive("/admin/settings") ? "active" : ""}`}
                     onClick={closeSidebar}
                  >
                     <FaCogs className="me-2" /> Admin Profile
                  </Link>
               </li>
               <li>
                  <button className="admin-sidebar-link text-start border-0 bg-transparent">
                     <FaSignOutAlt className="me-2" /> Logout
                  </button>
               </li>
            </ul>
         </aside>
      </>
   );
};

export default AdminSidebar;
