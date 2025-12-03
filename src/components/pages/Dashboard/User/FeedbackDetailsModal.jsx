import React from "react";
import "./FeedbackDetailsModal.css"; 

const FeedbackDetailsModal = ({ show, feedback, onClose }) => {
   if (!show || !feedback) return null;

   return (
      <div className="modern-modal-overlay" onClick={onClose}>
         <div
            className="modern-modal animated"
            onClick={(e) => e.stopPropagation()}
         >
            {/* Header */}
            <div className="modal-header-custom">
               <h5 className="modal-title-custom">
                  Feedback Details — {feedback.medication}
               </h5>
               <button className="btn-close-custom" onClick={onClose}>
                  ✖
               </button>
            </div>

            {/* Body */}
            <div className="modal-body-custom">
               <div className="info-block">
                  <p>
                     <strong>Date Submitted:</strong> {feedback.date}
                  </p>
                  <p>
                     <strong>Sentiment:</strong>{" "}
                     <span className={`sentiment-${feedback.sentiment}`}>
                        {feedback.sentiment}
                     </span>
                  </p>
                  <p>
                     <strong>Severity Level:</strong>{" "}
                     <span className={`severity-${feedback.severity}`}>
                        {feedback.severity.toUpperCase()}
                     </span>
                  </p>
               </div>

               {/* Conversation-Style Feedback */}
               <div className="conversation-box">
                  <h6 className="fw-bold mb-2">Your Response</h6>
                  <p>{feedback.summary}</p>
               </div>

               {/* ML Insights */}
               <div className="insights-box mt-3">
                  <h6 className="fw-bold mb-2">AI Insights</h6>
                  <ul className="ps-3 mb-0">
                     <li>Predicted severity: <strong>{feedback.severity}</strong></li>
                     <li>Sentiment detected: <strong>{feedback.sentiment}</strong></li>
                     <li>
                        Recommendation:
                        <em> {feedback.recommendation || "No recommendation available yet."}</em>
                     </li>
                  </ul>
               </div>

               {/* Timeline */}
               {feedback.timeline && (
                  <div className="timeline-box mt-3">
                     <h6 className="fw-bold mb-2">Feedback Timeline</h6>
                     {feedback.timeline.map((item, index) => (
                        <div key={index} className="timeline-item">
                           <div className="timeline-date">{item.date}</div>
                           <div className="timeline-content">{item.text}</div>
                        </div>
                     ))}
                  </div>
               )}
            </div>

            {/* Footer */}
            <div className="modal-footer-custom">
               <button className="btn btn-primary w-100" onClick={onClose}>
                  Close
               </button>
            </div>
         </div>
      </div>
   );
};

export default FeedbackDetailsModal;
