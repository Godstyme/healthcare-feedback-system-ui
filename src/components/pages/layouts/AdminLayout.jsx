import React from "react";
import AdminSidebar from "../../admin/AdminSidebar";
import AdminTopbar from "../../admin/AdminTopbar";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
   return (
      <div className="admin-layout d-flex">
         <AdminSidebar />
         <div className="admin-main flex-grow-1">
            <AdminTopbar />
            <div className="admin-content p-4">{children}</div>
         </div>
      </div>
   );
};

export default AdminLayout;
