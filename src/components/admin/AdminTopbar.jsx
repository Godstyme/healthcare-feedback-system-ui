import React from "react";
import { FaUserShield } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";

const AdminTopbar = () => {
   return (
      <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
         <span className="navbar-brand fw-bold">
            Healthcare Feedback Admin
         </span>

         <div className="ms-auto d-flex align-items-center gap-3">

            {/* Notification bell */}
            <div className="dropdown">
               <button
                  className="btn position-relative"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none", background: "transparent" }}
               >
                  <FaBell size={20} className="text-secondary" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                     3
                  </span>
               </button>
               <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li className="dropdown-header small fw-bold">Alerts</li>
                  <li><span className="dropdown-item small">2 new adverse-event flags</span></li>
                  <li><span className="dropdown-item small">New admin added</span></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item small text-primary">View all</button></li>
               </ul>
            </div>

            {/* Admin profile dropdown */}
            <div className="dropdown">
               <button
                  className="btn d-flex align-items-center gap-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none", background: "transparent" }}
               >
                  <FaUserShield size={26} className="text-primary" />
                  <span className="fw-semibold d-none d-md-inline">Admin</span>
               </button>
               <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li><button className="dropdown-item">Admin Profile</button></li>
                  <li><button className="dropdown-item">System Settings</button></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger">Logout</button></li>
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default AdminTopbar;
