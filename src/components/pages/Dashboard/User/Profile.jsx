import React from "react";
import UserLayout from "../../layouts/UserLayout";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => (
   <UserLayout>
      <div className="container py-4">
         <div className="d-flex align-items-center mb-4">
            <div>
               <h3 className="mb-0">Your Profile</h3>
               <small className="text-muted">Manage your account information</small>
            </div>
         </div>

         <div className="row">
            <div className="col-lg-4 mb-4">
               <div className="card shadow-sm">
                  <div className="card-body text-center">
                     <FaUserCircle size={80} className="text-secondary mb-3" />
                     <h5 className="card-title">Godstime Onyibe</h5>
                     <p className="text-muted">godstime@email.com</p>

                     <hr />

                     <div className="text-start">
                        <p><strong>Hospital ID:</strong> 8638</p>
                        <p><strong>Phone:</strong> +44 708-394-6581</p>
                        <p><strong>Role:</strong> Patient</p>
                        <p><strong>Member Since:</strong> Jan 2025</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* RIGHT CARD — Editable Form */}
            <div className="col-lg-8">
               <div className="card shadow-sm">
                  <div className="card-header text-white" style={{ backgroundColor: "#2e1645" }}> 
                     <strong>Edit Profile</strong>
                  </div>

                  <div className="card-body">
                     <form>
                        <div className="row">
                           <div className="col-12 mb-3">
                              <label className="form-label">Full Name</label>
                              <input type="text" className="form-control" placeholder="Enter full name" />
                           </div>

                           <div className="col-12 mb-3">
                              <label className="form-label">Email</label>
                              <input type="email" className="form-control" placeholder="Enter email" readOnly/>
                           </div>

                           <div className="col-12 mb-3">
                              <label className="form-label">Phone</label>
                              <input type="text" className="form-control" placeholder="Enter phone number" />
                           </div>

                           <div className="col-12 mb-3">
                              <label className="form-label">Address</label>
                              <textarea className="form-control" rows="2" placeholder="Enter address"></textarea>
                           </div>
                        </div>

                        <div className="text-end">
                           <button type="submit" className="btn text-light px-4" style={{ backgroundColor: "#687dff"}}>
                              Save Changes
                           </button>
                        </div>
                     </form>
                  </div>
               </div>

               <div className="card shadow-sm mt-4">
                  <div className="card-header text-white" style={{ backgroundColor: "#2e1645" }}>
                     <strong>Update Password</strong>
                  </div>

                  <div className="card-body">
                     <form>
                        <div className="row">
                           <div className="col-md-6 mb-3">
                              <label className="form-label">Current Password</label>
                              <input type="password" className="form-control" placeholder="Enter current password" />
                           </div>

                           <div className="col-md-6 mb-3">
                              <label className="form-label">New Password</label>
                              <input type="password" className="form-control" placeholder="Enter new password" />
                           </div>

                           <div className="col-md-12 mb-3">
                              <label className="form-label">Confirm New Password</label>
                              <input type="password" className="form-control" placeholder="Confirm new password" />
                           </div>
                        </div>

                        <div className="text-end">
                           <button type="submit" className="btn px-4" style={{ backgroundColor: "#687dff", color: "#fff" }}>
                              Update Password
                           </button>
                        </div>
                     </form>
                  </div>
               </div>

            </div>
         </div>

      </div>
   </UserLayout>
);

export default Profile;
