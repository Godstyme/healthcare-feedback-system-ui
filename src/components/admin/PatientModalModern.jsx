import React from "react";
import "./PatientModalModern.css";
import { FaTimes, FaDownload } from "react-icons/fa";

const PatientModalModern = ({ show, onClose, patient }) => {
   if (!show || !patient) return null;

   return (
      <div className="modern-modal-overlay" onClick={onClose}>
         <div
            className="modern-modal"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside modal
         >

            {/* HEADER */}
            <div className="modern-modal-header">
               <h4 className="fw-bold mb-0">Patient Details</h4>
               <button className="btn-close-custom" onClick={onClose}>
                  <FaTimes />
               </button>
            </div>

            {/* BODY */}
            <div className="modern-modal-body">

               {/* Personal Info */}
               <h6 className="fw-bold">Personal Information</h6>
               <p><strong>Name:</strong> {patient.name}</p>
               <p><strong>Email:</strong> {patient.email}</p>
               <p><strong>Status:</strong> {patient.status}</p>

               {/* Sentiment */}
               <h6 className="fw-bold mt-4">Sentiment Analysis</h6>
               <div className="sentiment-bars">
                  <div className="bar-label">Positive — {patient.sentiments.positive}%</div>
                  <div className="bar positive" style={{ width: `${patient.sentiments.positive}%` }} />

                  <div className="bar-label">Neutral — {patient.sentiments.neutral}%</div>
                  <div className="bar neutral" style={{ width: `${patient.sentiments.neutral}%` }} />

                  <div className="bar-label">Negative — {patient.sentiments.negative}%</div>
                  <div className="bar negative" style={{ width: `${patient.sentiments.negative}%` }} />
               </div>

               {/* Severity Prediction */}
               <h6 className="fw-bold mt-4">Severity Prediction (ML)</h6>
               <p>
                  Risk Level:{" "}
                  <span className={`severity-badge ${patient.severity.toLowerCase()}`}>
                     {patient.severity}
                  </span>
               </p>

               {/* Feedback Timeline */}
               <h6 className="fw-bold mt-4">Feedback Timeline</h6>
               <div className="timeline">
                  {patient.timeline.map((entry, i) => (
                     <div key={i} className="timeline-item">
                        <div className="time">{entry.time}</div>
                        <div className="msg">{entry.message}</div>
                        <div className={`badge sentiment-badge ${entry.sentiment.toLowerCase()}`}>
                           {entry.sentiment}
                        </div>
                     </div>
                  ))}
               </div>

               {/* Audit Logs */}
               <h6 className="fw-bold mt-4">Audit Logs</h6>
               <div className="audit-logs">
                  {patient.auditLogs.map((log, i) => (
                     <div key={i} className="audit-item">
                        <span>{log.action}</span>
                        <small className="text-muted">{log.time}</small>
                     </div>
                  ))}
               </div>

            </div>

            {/* FOOTER */}
            <div className="modern-modal-footer">
               <button className="btn btn-light" onClick={onClose}>Close</button>
               <button className="btn btn-primary">
                  <FaDownload className="me-1" /> Download PDF
               </button>
            </div>

         </div>
      </div>
   );
};

export default PatientModalModern;
