import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Topbar = () => {
   return (
      <nav className="navbar navbar-light bg-light shadow-sm px-4">
         <span className="navbar-brand mb-0 h5">Dashboard</span>
         <div className="d-flex align-items-center">
            <FaUserCircle size={28} className="me-2 text-primary" />
         </div>
      </nav>
   );
};

export default Topbar;
