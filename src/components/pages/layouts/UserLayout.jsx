import React from "react";
import Sidebar from "../../Sidebar";
import Topbar from "../../Topbar";

const UserLayout = ({ children }) => {
   return (
      <div className="d-flex">
         <Sidebar />
         <div className="flex-grow-1" style={{ marginLeft: "240px" }}>
            <Topbar />
            <main className="p-4 bg-light min-vh-100">{children}</main>
         </div>
      </div>
   );
};

export default UserLayout;
