import React from "react";
import { FaDownload } from "react-icons/fa";

const PatientModal = ({ show, onClose, patient }) => {
   if (!patient) return null;

   return (
      <div className={`modal fade ${show ? "show d-block" : ""}`} tabIndex="-1">
         {/* BACKDROP */}
         {show && <div className="modal-backdrop fade show"></div>}

         <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">

               {/* HEADER */}
               <div className="modal-header">
                  <h5 className="modal-title fw-bold">Patient Details</h5>
                  <button className="btn-close" onClick={onClose}></button>
               </div>

               {/* BODY */}
               <div className="modal-body">
                  <h6 className="fw-bold mb-2">Personal Information</h6>
                  <p className="mb-1"><strong>Name:</strong> {patient.name}</p>
                  <p className="mb-1"><strong>Email:</strong> {patient.email}</p>
                  <p className="mb-3"><strong>Status:</strong> {patient.status}</p>

                  {/* Sentiment Summary */}
                  <h6 className="fw-bold mt-4">Sentiment Analysis</h6>
                  <small className="text-muted">AI-generated sentiment distribution.</small>

                  <div className="mt-2">
                     <label className="fw-semibold">Positive</label>
                     <div className="progress mb-2">
                        <div className="progress-bar bg-success" style={{ width: `${patient.sentiments.positive}%` }}></div>
                     </div>

                     <label className="fw-semibold">Neutral</label>
                     <div className="progress mb-2">
                        <div className="progress-bar bg-info" style={{ width: `${patient.sentiments.neutral}%` }}></div>
                     </div>

                     <label className="fw-semibold">Negative</label>
                     <div className="progress">
                        <div className="progress-bar bg-danger" style={{ width: `${patient.sentiments.negative}%` }}></div>
                     </div>
                  </div>

                  {/* ML Severity Prediction */}
                  <h6 className="fw-bold mt-4">Severity Prediction (ML)</h6>
                  <p>
                     Risk Level:{" "}
                     <span className={`badge ${patient.severity === "High"
                           ? "bg-danger"
                           : patient.severity === "Medium"
                              ? "bg-warning text-dark"
                              : "bg-success"
                        }`}>
                        {patient.severity}
                     </span>
                  </p>
                  <small className="text-muted">Predicted based on recent feedback patterns.</small>

                  {/* Feedback Timeline */}
                  <h6 className="fw-bold mt-4">Feedback Timeline</h6>
                  <ul className="list-group small">
                     {patient.timeline.map((item, i) => (
                        <li key={i} className="list-group-item">
                           <div className="fw-semibold">{item.time}</div>
                           <div>{item.message}</div>
                           <span
                              className={`badge mt-1 ${item.sentiment === "Positive"
                                    ? "bg-success"
                                    : item.sentiment === "Neutral"
                                       ? "bg-info text-dark"
                                       : "bg-danger"
                                 }`}
                           >
                              {item.sentiment}
                           </span>
                        </li>
                     ))}
                  </ul>

                  {/* Audit Logs */}
                  <h6 className="fw-bold mt-4">Audit Logs</h6>
                  <ul className="list-group small">
                     {patient.auditLogs.map((log, i) => (
                        <li key={i} className="list-group-item d-flex justify-content-between">
                           <span>{log.action}</span>
                           <span className="text-muted">{log.time}</span>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* FOOTER */}
               <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={onClose}>Close</button>
                  <button className="btn btn-primary">
                     <FaDownload className="me-1" /> Download PDF
                  </button>
               </div>

            </div>
         </div>
      </div>
   );
};

export default PatientModal;
