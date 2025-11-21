import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import PatientModalModern from "../../../../components/admin/PatientModalModern";
import { FaSearch, FaEye } from "react-icons/fa";

const ManageUsers = () => {
   const [showModal, setShowModal] = useState(false);
   const [selectedPatient, setSelectedPatient] = useState(null);

   const openModal = (patient) => {
      setSelectedPatient(patient);
      setShowModal(true);
   };

   const closeModal = () => {
      setSelectedPatient(null);
      setShowModal(false);
   };

   const patients = [
      {
         name: "Godstime Onyibe",
         email: "godstime@nhs.org",
         sentiments: { positive: 60, neutral: 25, negative: 15 },
         severity: "Low",
         timeline: [
            { time: "2025-01-20 10:22", message: "Care was excellent.", sentiment: "Positive" },
            { time: "2025-01-15 14:10", message: "Waiting time was long.", sentiment: "Negative" }
         ],
         auditLogs: [
            { action: "Viewed profile", time: "2025-01-20 12:08" }
         ]
      },
      {
         name: "Jane Smith",
         email: "jane.smith@nhs.org",
         sentiments: { positive: 80, neutral: 10, negative: 10 },
         severity: "Low",
         timeline: [
            { time: "2025-01-22 11:40", message: "Very kind nurses.", sentiment: "Positive" }
         ],
         auditLogs: [
            { action: "Feedback checked", time: "2025-01-22 12:00" }
         ]
      },
      {
         name: "Michael Brown",
         email: "michael.brown@nhs.org",
         sentiments: { positive: 20, neutral: 30, negative: 50 },
         severity: "High",
         timeline: [
            { time: "2025-01-12 16:00", message: "Rude doctor.", sentiment: "Negative" }
         ],
         auditLogs: [
            { action: "Account marked inactive", time: "2025-01-14 09:12" }
         ]
      },

      ...Array.from({ length: 17 }, (_, i) => ({
         name: `Test Patient ${i + 4}`,
         email: `test${i + 4}@nhs.org`,
         status: i % 2 === 0 ? "Active" : "Inactive",
         sentiments: { positive: 50, neutral: 20, negative: 30 },
         severity: "Medium",
         timeline: [],
         auditLogs: []
      }))
   ];

   const rowsPerPage = 5;
   const [currentPage, setCurrentPage] = useState(1);

   const totalPages = Math.ceil(patients.length / rowsPerPage);
   const startIndex = (currentPage - 1) * rowsPerPage;
   const currentPatients = patients.slice(startIndex, startIndex + rowsPerPage);

   const goToPage = (page) => {
      if (page >= 1 && page <= totalPages) setCurrentPage(page);
   };

   return (
      <AdminLayout>
         <div className="mb-4">
            <h2 className="fw-bold">Manage Patients</h2>
            <p className="text-muted">View all patient records and activity.</p>
         </div>

         <div className="card shadow-sm border-0">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
               <h6 className="fw-bold mb-0">All Patients</h6>

               <div className="input-group" style={{ maxWidth: "260px" }}>
                  <span className="input-group-text bg-white"><FaSearch /></span>
                  <input type="search" className="form-control" placeholder="Search name or email" />
               </div>
            </div>

            <div className="card-body">
               <div className="table-responsive">
                  <table className="table table-hover align-middle">
                     <thead className="table-light">
                        <tr>
                           <th>S/N</th>
                           <th>Name</th>
                           <th>Email</th>
                           <th className="text-end">Action</th>
                        </tr>
                     </thead>

                     <tbody>
                        {currentPatients.map((p, i) => (
                           <tr key={i}>
                              <td>{startIndex + i + 1}</td>
                              <td>{p.name}</td>
                              <td>{p.email}</td>
                              <td className="text-end">
                                 <button className="btn btn-sm btn-primary" onClick={() => openModal(p)}>
                                    <FaEye className="me-1" /> View
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               {/* PAGINATION UI */}
               <nav>
                  <ul className="pagination justify-content-center mt-3">

                     {/* Prev */}
                     <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                        <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                           Previous
                        </button>
                     </li>

                     {/* Page numbers */}
                     {Array.from({ length: totalPages }, (_, i) => (
                        <li
                           key={i}
                           className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                        >
                           <button className="page-link" onClick={() => goToPage(i + 1)}>
                              {i + 1}
                           </button>
                        </li>
                     ))}

                     {/* Next */}
                     <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
                        <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                           Next
                        </button>
                     </li>
                  </ul>
               </nav>

            </div>
         </div>

         <PatientModalModern show={showModal} onClose={closeModal} patient={selectedPatient} />
      </AdminLayout>
   );
};

export default ManageUsers;
