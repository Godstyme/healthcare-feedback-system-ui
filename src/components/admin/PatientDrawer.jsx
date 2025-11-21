import React from "react";
import "./PatientDrawer.css";
import { FaTimes } from "react-icons/fa";

const PatientDrawer = ({ show, onClose, patient }) => {
   return (
      <>
         {/* Overlay (dim background) */}
         {show && <div className="drawer-overlay" onClick={onClose}></div>}

         {/* Drawer panel */}
         <div className={`drawer ${show ? "open" : ""}`}>
            <div className="drawer-header d-flex justify-content-between align-items-center">
               <h5 className="mb-0 fw-bold">Patient Details</h5>
               <button className="btn drawer-close-btn" onClick={onClose}>
                  <FaTimes size={20} />
               </button>
            </div>

            <div className="drawer-body">

               <h6 className="fw-bold">Personal Information</h6>
               <div className="mb-3">
                  <p className="mb-1"><strong>Name:</strong> {patient?.name}</p>
                  <p className="mb-1"><strong>Email:</strong> {patient?.email}</p>
                  <p className="mb-1"><strong>Status:</strong> {patient?.status}</p>
               </div>

               <h6 className="fw-bold">Feedback Summary</h6>
               <p className="text-muted small">
                  Total feedback submitted by this patient and any adverse-event flags.
               </p>

               <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                     Total Feedbacks
                     <span className="badge bg-primary">{patient?.feedbackCount}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                     Adverse Event Flags
                     <span className="badge bg-danger">{patient?.flagCount}</span>
                  </li>
               </ul>

               <h6 className="fw-bold">Recent Feedback</h6>
               <p className="text-muted small">Most recent entry from this patient:</p>

               <div className="border rounded p-2 bg-light small">
                  {patient?.recentFeedback || "No recent feedback available."}
               </div>

            </div>
         </div>
      </>
   );
};

export default PatientDrawer;
