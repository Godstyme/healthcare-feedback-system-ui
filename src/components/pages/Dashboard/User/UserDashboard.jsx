import React, { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import api from "../.../../../../../services/axiosInstance";

const UserDashboard = () => {
   const [profile, setProfile] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      api.get("/patient/profile")
         .then((res) => {
            setProfile(res.data);
            setLoading(false);
         })
         .catch((err) => {
            console.error("Profile fetch error:", err);
            setLoading(false);
         });
   }, []);

   if (loading) {
      return (
         <UserLayout>
            <div className="container">
               <h2>Loading your dashboard...</h2>
            </div>
         </UserLayout>
      );
   }

   if (!profile) {
      return (
         <UserLayout>
            <div className="container">
               <h2>Error loading profile.</h2>
            </div>
         </UserLayout>
      );
   }

   return (
      <UserLayout>
         <div className="container">
            <h2 className="mb-4">
               Welcome Back, <span className="text-primary fw-bold">{profile.profile.fullname}</span> 
            </h2>

            <div className="mb-4">
               <p><strong>Email:</strong> {profile.email}</p>
               <p><strong>Hospital ID:</strong> {profile.profile.hospital_id}</p>
            </div>

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
