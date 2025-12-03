import React, { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import { Link } from "react-router-dom";

const UserDashboard = () => {
   const [profile, setProfile] = useState(null);
   const [loading, setLoading] = useState(true);

   // Notifications (placeholder — will be replaced after backend)
   const [notifications, setNotifications] = useState([]);

   // const navigate = useNavigate();

   const upcomingAppointment = {
      date: "2025-10-05",
      time: "10:30",
      status: "Scheduled",
   };

   const activeTreatment = {
      medication: "Amoxicillin 500mg",
      startDate: "2025-10-05",
      endDate: "2025-10-09",
      daysRemaining: 2,
   };

   useEffect(() => {
      // PLACEHOLDER PROFILE
      setProfile({
         email: "patient@example.com",
         profile: {
            fullname: "John Doe",
            hospital_id: "NHS-2044-8899"
         }
      });

      // PLACEHOLDER NOTIFICATION
      setNotifications([
         {
            id: 1,
            type: "feedback_request",
            is_read: false,
            treatment_id: 90,
            medication_name: "Amoxicillin 500mg",
            message: "How are you feeling after finishing your medication?",
            created_at: "Just now"
         }
      ]);

      setLoading(false);
   }, []);

   // Identify feedback notification
   const feedbackNotif = notifications.find(
      (n) => n.type === "feedback_request" && !n.is_read
   );

   // Auto redirect to feedback when due
   // useEffect(() => {
   //    if (feedbackNotif) {
   //       navigate(
   //          `/user/feedbacks/submit?treatment=${feedbackNotif.treatment_id}`
   //       );
   //    }
   // }, [feedbackNotif, navigate]);

   if (loading) {
      return (
         <UserLayout>
            <div className="container">
               <h2>Loading your dashboard...</h2>
            </div>
         </UserLayout>
      );
   }

   return (
      <UserLayout>
         <div className="container">
            {/* FEEDBACK ALERT BANNER */}
            {feedbackNotif && (
               <div className="alert alert-primary shadow-sm mb-4">
                  <h6 className="fw-bold mb-1">We’d like to check in</h6>
                  <p className="mb-2">
                     Your recent treatment has completed. Please share how you're feeling.
                  </p>
                  <Link
                     to={`/user/feedbacks/submit?treatment=${feedbackNotif.treatment_id}`}
                     className="btn btn-primary"
                  >
                     Complete Feedback
                  </Link>
               </div>
            )}

            <h2 className="mb-4">
               Welcome Back,{" "}
               <span className="text-primary fw-bold">
                  {profile.profile.fullname}
               </span>
            </h2>

            <div className="mb-4">
               <p><strong>Email:</strong> {profile.email}</p>
               <p><strong>Hospital ID:</strong> {profile.profile.hospital_id}</p>
            </div>

            <p className="text-muted">
               Track your appointments, treatments, and share feedback to improve future care.
            </p>

            <div className="row g-4">
               <div className="col-md-4">
                  <div className="card shadow-sm p-3">
                     <h5>Total Feedbacks</h5>
                     <p className="display-6 text-primary fw-bold">24</p>
                  </div>
               </div>

               <div className="col-md-4">
                  <div className="card shadow-sm p-3">
                     <h5>Resolved</h5>
                     <p className="display-6 text-success fw-bold">18</p>
                  </div>
               </div>

               <div className="col-md-4">
                  <div className="card shadow-sm p-3">
                     <h5>Pending</h5>
                     <p className="display-6 text-warning fw-bold">6</p>
                  </div>
               </div>

               <div className="col-md-4">
                  <div className="card shadow-sm border-0 h-100">
                     <div className="card-body">
                        <h6 className="fw-bold mb-2">Next Appointment</h6>
                        <p className="mb-1">
                           <strong>{upcomingAppointment.date}</strong> at{" "}
                           <strong>{upcomingAppointment.time}</strong>
                        </p>
                        <span className="badge bg-primary">{upcomingAppointment.status}</span>
                     </div>
                  </div>
               </div>

               <div className="col-md-4">
                  <div className="card shadow-sm border-0 h-100">
                     <div className="card-body">
                        <h6 className="fw-bold mb-2">Active Treatment</h6>
                        <p className="mb-1">
                           <strong>{activeTreatment.medication}</strong>
                        </p>
                        <p className="mb-1 small text-muted">
                           {activeTreatment.startDate} → {activeTreatment.endDate}
                        </p>
                        <span className="badge bg-info text-dark">
                           {activeTreatment.daysRemaining} day(s) remaining
                        </span>
                     </div>
                  </div>
               </div>

               <div className="col-md-4">
                  <div className="card shadow-sm border-0 h-100">
                     <div className="card-body">
                        <h6 className="fw-bold mb-2">Feedback Status</h6>

                        {feedbackNotif ? (
                           <>
                              <p className="mb-1">
                                 You have pending feedback for{" "}
                                 <strong>{feedbackNotif.medication_name}</strong>.
                              </p>
                              <span className="badge bg-warning text-dark">
                                 Pending Feedback
                              </span>
                           </>
                        ) : (
                           <p className="mb-0 text-muted">
                              No feedback required at the moment.
                           </p>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* Tips */}
            <div className="card shadow-sm border-0 my-4">
               <div className="card-header bg-white">
                  <h6 className="fw-bold mb-0">
                     Health tips based on your current treatment
                  </h6>
               </div>
               <div className="card-body">
                  <ul className="mb-0">
                     <li>Take your medication exactly as prescribed.</li>
                     <li>Drink enough water throughout the day.</li>
                     <li>
                        Contact the hospital if you notice any severe or unexpected reactions.
                     </li>
                  </ul>
                  <p className="mt-2 mb-0 small text-muted">
                     These tips are general. Your doctor may provide specific advice tailored to your condition.
                  </p>
               </div>
            </div>
         </div>
      </UserLayout>
   );
};

export default UserDashboard;
