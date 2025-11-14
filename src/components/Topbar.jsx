import React from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";

const Topbar = () => {
   return (
      <nav className="navbar navbar-light bg-light shadow-sm px-4 d-flex justify-content-between">
         {/* Title */}
         <span className="navbar-brand mb-0 h5">Dashboard</span>

         <div className="d-flex align-items-center gap-3">

            {/* Notifications Dropdown */}
            <div className="dropdown">
               <button
                  className="btn position-relative"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none", background: "transparent" }}
               >
                  <FaBell size={22} className="text-secondary" />
                  <span
                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                     style={{ fontSize: "0.6rem" }}
                  >
                     3
                  </span>
               </button>

               <ul className="dropdown-menu dropdown-menu-end shadow" style={{ width: "260px" }}>
                  <li className="dropdown-header fw-bold">Notifications</li>
                  <li><a className="dropdown-item small" href="#">New feedback submitted</a></li>
                  <li><a className="dropdown-item small" href="#">Your profile was updated</a></li>
                  <li><a className="dropdown-item small" href="#">System maintenance at 3PM</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item text-center small" href="#">View All</a></li>
               </ul>
            </div>

            {/* User Dropdown */}
            <div className="dropdown">
               <button
                  className="btn d-flex align-items-center gap-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ border: "none", background: "transparent" }}
               >
                  <FaUserCircle size={32} className="text-primary" />
                  <span className="fw-semibold d-none d-md-inline">Godstime</span>
               </button>

               <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li><a className="dropdown-item" href="/user/profile">Profile</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger">Logout</button></li>
               </ul>
            </div>

         </div>
      </nav>
   );
};

export default Topbar;
