import React, { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import api from "../.../../../../../services/axiosInstance";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const Profile = () => {
   const [loading, setLoading] = useState(true);

   const [formData, setFormData] = useState({
      fullname: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      date_of_birth: "",
      hospital_id: "",
   });

   // -------------------------------------
   // FETCH USER PROFILE
   // -------------------------------------
   useEffect(() => {
      const fetchProfile = async () => {
         try {
            const response = await api.get("/patient/profile");
            const data = response.data.profile;

            setFormData({
               fullname: data.fullname || "",
               email: response.data.email || "",
               phone: data.phone || "",
               address: data.address || "",
               gender: data.gender || "",
               date_of_birth: data.date_of_birth || "",
               hospital_id: data.hospital_id || "",
            });

            setLoading(false);
         } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error("Failed to load profile");
            setLoading(false);
         }
      };

      fetchProfile();
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         await api.put("/patient/profile", formData);
         toast.success("Profile updated successfully!");
      } catch (error) {
         console.error("Error updating profile:", error);
         toast.error("Update failed!");
      }
   };

   if (loading) return <UserLayout><p>Loading profile...</p></UserLayout>;

   return (
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
                        <h5 className="card-title">{formData.fullname}</h5>
                        <p className="text-muted">{formData.email}</p>

                        <hr />

                        <div className="text-start">
                           <p><strong>Hospital ID:</strong> {formData.hospital_id}</p>
                           <p><strong>Phone:</strong> {formData.phone || "—"}</p>
                           <p>
                              <strong>Gender: </strong>
                              {formData.gender
                                 ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)
                                 : "—"
                              }
                           </p>
                           <p><strong>DOB:</strong> {formData.date_of_birth || "—"}</p>
                           <address><strong>Address:</strong> {formData.address || "—"}</address>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-8">
                  <div className="card shadow-sm mb-4">
                     <div className="card-header text-white" style={{ backgroundColor: "#2e1645" }}>
                        <strong>Edit Profile</strong>
                     </div>

                     <div className="card-body">
                        <form onSubmit={handleSubmit}>
                           <div className="row">
                              <div className="col-12 mb-3">
                                 <label className="form-label">Full Name</label>
                                 <input
                                    type="text"
                                    name="fullname"
                                    className="form-control"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                 />
                              </div>

                              <div className="col-12 mb-3">
                                 <label className="form-label">Email</label>
                                 <input
                                    type="email"
                                    className="form-control"
                                    value={formData.email}
                                    readOnly
                                 />
                              </div>

                              <div className="col-12 mb-3">
                                 <label className="form-label">Phone</label>
                                 <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                 />
                              </div>

                              <div className="col-12 mb-3">
                                 <label className="form-label">Gender</label>
                                 <select
                                    name="gender"
                                    className="form-control"
                                    value={formData.gender}
                                    onChange={handleChange}
                                 >
                                    <option value="">Select...</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                 </select>
                              </div>

                              <div className="col-12 mb-3">
                                 <label className="form-label">Date of Birth</label>
                                 <input
                                    type="date"
                                    name="date_of_birth"
                                    className="form-control"
                                    value={formData.date_of_birth}
                                    onChange={handleChange}
                                 />
                              </div>

                              <div className="col-12 mb-3">
                                 <label className="form-label">Address</label>
                                 <textarea
                                    name="address"
                                    className="form-control"
                                    rows="2"
                                    value={formData.address}
                                    onChange={handleChange}
                                 ></textarea>
                              </div>
                           </div>

                           <div className="text-end">
                              <button type="submit" className="btn text-light px-4" style={{ backgroundColor: "#687dff" }}>
                                 Save Changes
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
};

export default Profile;
