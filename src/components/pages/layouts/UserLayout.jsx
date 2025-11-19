import React from "react";
import Sidebar from "../../Sidebar";
import Topbar from "../../Topbar";
import "./UserLayout.css";

const UserLayout = ({ children }) => {
   return (
      <div className="d-flex">
         <Sidebar />
         <div className="main-content flex-grow-1">
            <Topbar />
            <div className="content-wrapper p-3">{children}</div>
         </div>
      </div>
   );
};

export default UserLayout;
