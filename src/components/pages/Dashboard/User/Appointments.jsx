
import React from "react";
import UserLayout from "../../layouts/UserLayout";
import { Link } from "react-router-dom";

const Appointments = () => {
   const appointments = [
      {
         id: 1,
         date: "2025-10-05",
         time: "10:30",
         status: "Scheduled",
         reason: "Follow-up on chest pain",
      },
      {
         id: 2,
         date: "2025-09-20",
         time: "14:00",
         status: "Completed",
         reason: "Headache and dizziness",
      },
   ];

   return (
      <UserLayout>
         <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
               <h3 className="fw-bold mb-1">Appointments</h3>
               <p className="text-muted mb-0">
                  View your upcoming and past appointments.
               </p>
            </div>
            <Link to="/user/appointments/book" className="btn btn-primary">
               Book Appointment
            </Link>
         </div>

         <div className="card shadow-sm border-0">
            <div className="card-body">
               {appointments.length === 0 ? (
                  <p className="text-muted mb-0">You have no appointments yet.</p>
               ) : (
                  <div className="table-responsive">
                     <table className="table table-hover align-middle">
                        <thead className="table-light">
                           <tr>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Status</th>
                              <th>Reason</th>
                           </tr>
                        </thead>
                        <tbody>
                           {appointments.map((appt) => (
                              <tr key={appt.id}>
                                 <td>{appt.date}</td>
                                 <td>{appt.time}</td>
                                 <td>
                                    <span
                                       className={`badge ${appt.status === "Scheduled"
                                             ? "bg-primary"
                                             : appt.status === "Completed"
                                                ? "bg-success"
                                                : "bg-secondary"
                                          }`}
                                    >
                                       {appt.status}
                                    </span>
                                 </td>
                                 <td>{appt.reason}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               )}
            </div>
         </div>
      </UserLayout>
   );
};

export default Appointments;
