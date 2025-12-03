import React, { useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import FeedbackDetailsModal from "./FeedbackDetailsModal";
import { FaSmile, FaMeh, FaFrown, FaSearch } from "react-icons/fa";

const Feedbacks = () => {
   const [selectedFeedback, setSelectedFeedback] = useState(null);
   const [showModal, setShowModal] = useState(false);

   const handleViewDetails = (item) => {
      setSelectedFeedback(item);
      setShowModal(true);
   };

   // Dummy data — replace later with API call
   const feedbackData = [
      {
         id: 1,
         date: "2025-10-09",
         medication: "Amoxicillin 500mg",
         sentiment: "positive",
         severity: "low",
         summary:
            "Felt much better after 3 days. Mild headache but nothing serious.",
         timeline: [
            { date: "Day 1", text: "Headache began but was manageable." },
            { date: "Day 2", text: "Chest pain reduced." },
            { date: "Day 4", text: "Almost fully recovered." },
         ],
         recommendation: "Continue hydration and rest.",
      },
      {
         id: 2,
         date: "2025-09-15",
         medication: "Ibuprofen 400mg",
         sentiment: "neutral",
         severity: "moderate",
         summary: "Symptoms improved slowly. Some stomach discomfort.",
         timeline: [
            { date: "Day 1", text: "Stomach felt unsettled." },
            { date: "Day 3", text: "Mild improvement." },
         ],
         recommendation: "Avoid taking on an empty stomach.",
      },
      {
         id: 3,
         date: "2025-07-01",
         medication: "Azithromycin",
         sentiment: "negative",
         severity: "high",
         summary: "Experienced dizziness and vomiting. Doctor follow-up required.",
         timeline: [
            { date: "Day 1", text: "Severe dizziness." },
            { date: "Day 2", text: "Vomiting began." },
         ],
         recommendation: "Follow-up appointment scheduled.",
      },
   ];

   const getSentimentIcon = (sentiment) => {
      switch (sentiment) {
         case "positive":
            return <FaSmile className="text-success me-1" />;
         case "neutral":
            return <FaMeh className="text-warning me-1" />;
         case "negative":
            return <FaFrown className="text-danger me-1" />;
         default:
            return <FaMeh className="text-secondary me-1" />;
      }
   };

   const getSeverityBadge = (severity) => {
      switch (severity) {
         case "low":
            return <span className="badge bg-success">Low Risk</span>;
         case "moderate":
            return (
               <span className="badge bg-warning text-dark">Moderate Risk</span>
            );
         case "high":
            return <span className="badge bg-danger">High Risk</span>;
         default:
            return <span className="badge bg-secondary">Unknown</span>;
      }
   };

   return (
      <UserLayout>
         <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
               <h3 className="fw-bold mb-1">Feedback History</h3>
               <p className="text-muted mb-0">
                  View your feedback submissions and ML severity predictions.
               </p>
            </div>

            {/* Search Bar */}
            <div className="input-group" style={{ maxWidth: "260px" }}>
               <span className="input-group-text bg-white">
                  <FaSearch />
               </span>
               <input type="search" className="form-control" placeholder="Search..." />
            </div>
         </div>

         {/* Feedback Cards */}
         <div className="row g-3">
            {feedbackData.map((item) => (
               <div className="col-md-6 col-lg-4" key={item.id}>
                  <div className="card shadow-sm border-0 h-100">
                     <div className="card-body">
                        <h6 className="fw-bold">{item.medication}</h6>
                        <p className="small text-muted mb-1">
                           Submitted on {item.date}
                        </p>

                        {/* Sentiment + Severity */}
                        <div className="d-flex align-items-center mb-2">
                           {getSentimentIcon(item.sentiment)}
                           <span className="me-3 text-capitalize">{item.sentiment}</span>
                           {getSeverityBadge(item.severity)}
                        </div>

                        {/* Summary */}
                        <p className="small mb-2">{item.summary}</p>

                        {/* Action Button */}
                        <button
                           className="btn btn-sm btn-outline-primary w-100"
                           onClick={() => handleViewDetails(item)}
                        >
                           View Full Feedback
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* No data message */}
         {feedbackData.length === 0 && (
            <p className="text-muted text-center mt-4">
               No feedback submitted yet.
            </p>
         )}

         {/* Modal */}
         <FeedbackDetailsModal
            show={showModal}
            feedback={selectedFeedback}
            onClose={() => setShowModal(false)}
         />
      </UserLayout>
   );
};

export default Feedbacks;
