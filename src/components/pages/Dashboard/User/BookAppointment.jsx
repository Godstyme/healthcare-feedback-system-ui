import React, { useState } from "react";
import UserLayout from "../../layouts/UserLayout";

const BookAppointment = () => {
   const [form, setForm] = useState({
      date: "",
      time: "",
      reason: "",
   });

   const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      // TODO: call Flask API to create appointment, e.g. POST /api/appointments
      // using fetch or axios
      console.log("Booking appointment:", form);
   };

   return (
      <UserLayout>
         <h3 className="fw-bold mb-3">Book an Appointment</h3>
         <p className="text-muted">
            Choose a date and time, and briefly describe how you’re feeling. The system will assign a doctor.
         </p>

         <div className="card shadow-sm border-0">
            <div className="card-body">
               <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-md-4">
                     <label className="form-label">Date</label>
                     <input
                        type="date"
                        name="date"
                        className="form-control"
                        value={form.date}
                        onChange={handleChange}
                        required
                     />
                  </div>

                  <div className="col-md-4">
                     <label className="form-label">Time</label>
                     <input
                        type="time"
                        name="time"
                        className="form-control"
                        value={form.time}
                        onChange={handleChange}
                        required
                     />
                  </div>

                  <div className="col-12">
                     <label className="form-label">Reason / Symptoms</label>
                     <textarea
                        name="reason"
                        className="form-control"
                        rows="3"
                        placeholder="Describe your symptoms..."
                        value={form.reason}
                        onChange={handleChange}
                        required
                     ></textarea>
                  </div>

                  <div className="col-12 text-end">
                     <button type="submit" className="btn btn-primary">
                        Confirm Booking
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </UserLayout>
   );
};

export default BookAppointment;
