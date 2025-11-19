import React from "react";
import UserLayout from "../../layouts/UserLayout";

const UserDashboard = () => {
   return (
      <UserLayout>
         <div className="container">
            <h2 className="mb-4">Welcome Back!</h2>
            <div className="row g-4">
               <div className="col-md-4">
                  <div className="card shadow-sm p-3">
                     <h5>Total Feedbacks</h5>
                     <p className="display-6 text-primary fw-bold">24</p>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="card shadow-sm p-3">
                     <h5>Resolved</h5>
                     <p className="display-6 text-success fw-bold">18</p>
                  </div>
               </div>
               <div className="col-md-4">
                  <div className="card shadow-sm p-3">
                     <h5>Pending</h5>
                     <p className="display-6 text-warning fw-bold">6</p>
                  </div>
               </div>
            </div>
         </div>
      </UserLayout>
   );
};

export default UserDashboard;
