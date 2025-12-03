import React, { useState } from "react";
import UserLayout from "../../layouts/UserLayout";

const SubmitFeedback = () => {
   // In a real app, these would come from backend (treatment info)
   const treatmentInfo = {
      medication: "Amoxicillin 500mg",
      startDate: "2025-10-05",
      endDate: "2025-10-09",
      symptomSummary: "Chest pain and shortness of breath",
   };

   const [form, setForm] = useState({
      feeling: "",
      sideEffects: "",
      effectiveness: "",
      extraNotes: "",
   });

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // TODO: POST to Flask: /api/feedback with treatmentId + answers
      console.log("Feedback submitted:", form);
   };

   return (
      <UserLayout>
         <div className="mb-3">
            <h3 className="fw-bold">How did your treatment go?</h3>
            <p className="text-muted mb-1">
               We’re checking in about your recent medication to help improve your care and future treatments for others.
            </p>
            <p className="small text-muted">
               Medication: <strong>{treatmentInfo.medication}</strong> (
               {treatmentInfo.startDate} → {treatmentInfo.endDate})
            </p>
         </div>

         <div className="card shadow-sm border-0">
            <div className="card-body">
               <form className="row g-3" onSubmit={handleSubmit}>
                  {/* Question 1 */}
                  <div className="col-12">
                     <label className="form-label fw-semibold">
                        1️⃣ In your own words, how do you feel today compared to before treatment?
                     </label>
                     <textarea
                        name="feeling"
                        className="form-control"
                        rows="3"
                        value={form.feeling}
                        onChange={handleChange}
                        required
                     ></textarea>
                  </div>

                  {/* Question 2 */}
                  <div className="col-12">
                     <label className="form-label fw-semibold">
                        2️⃣ Did you experience any side effects (e.g. headache, nausea, dizziness, rash, or others)?
                     </label>
                     <textarea
                        name="sideEffects"
                        className="form-control"
                        rows="3"
                        placeholder="If yes, please describe them."
                        value={form.sideEffects}
                        onChange={handleChange}
                     ></textarea>
                  </div>

                  {/* Question 3 */}
                  <div className="col-md-6">
                     <label className="form-label fw-semibold">
                        3️⃣ On a scale from 1 to 5, how effective was this medication for your symptoms?
                     </label>
                     <select
                        name="effectiveness"
                        className="form-select"
                        value={form.effectiveness}
                        onChange={handleChange}
                        required
                     >
                        <option value="">Select rating</option>
                        <option value="1">1 - No improvement</option>
                        <option value="2">2 - Slight improvement</option>
                        <option value="3">3 - Some improvement</option>
                        <option value="4">4 - Good improvement</option>
                        <option value="5">5 - Symptoms resolved</option>
                     </select>
                  </div>

                  {/* Question 4 */}
                  <div className="col-12">
                     <label className="form-label fw-semibold">
                        4️⃣ Anything else you would like your care team to know?
                     </label>
                     <textarea
                        name="extraNotes"
                        className="form-control"
                        rows="3"
                        value={form.extraNotes}
                        onChange={handleChange}
                     ></textarea>
                  </div>

                  <div className="col-12 text-end">
                     <button type="submit" className="btn btn-primary">
                        Submit Feedback
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </UserLayout>
   );
};

export default SubmitFeedback;
