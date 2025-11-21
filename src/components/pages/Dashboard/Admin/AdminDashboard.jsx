import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { Modal, Button } from "react-bootstrap";

// NEW IMPORTS
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { Pie } from "react-chartjs-2";
import {
   Chart as ChartJS,
   ArcElement,
   Tooltip,
   Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PAGE_SIZE = 10;

const AdminDashboard = () => {
   const STATIC_PATIENTS = [
      {
         id: 1,
         name: "Jane Smith",
         hospitalId: "83927",
         category: "Medication Error",
         risk: "High",
         received: "2h ago",
         status: "Pending",
         feedback:
            "Nurse administered wrong dosage. Patient experienced dizziness shortly after.",
      },
      {
         id: 2,
         name: "John Doe",
         hospitalId: "28983",
         category: "Communication Problem",
         risk: "Medium",
         received: "6h ago",
         status: "Reviewed",
         feedback: "Patient felt unclear communication regarding treatment plan.",
      },
      {
         id: 3,
         name: "Amira Khan",
         hospitalId: "03723",
         category: "Follow-up Delay",
         risk: "Low",
         received: "Yesterday",
         status: "Pending",
         feedback: "Follow-up appointment delayed by 3 days.",
      },
      {
         id: 4,
         name: "Daniel Nwachi",
         hospitalId: "55321",
         category: "Medication Error",
         risk: "High",
         received: "1h ago",
         status: "Escalated",
         feedback:
            "Incorrect medication prescribed. Pharmacy caught it before administration.",
      },
   ];

   const [patients, setPatients] = useState(STATIC_PATIENTS);
   const [show, setShow] = useState(false);
   const [selectedPatient, setSelectedPatient] = useState(null);

   const [searchTerm, setSearchTerm] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [sortBy, setSortBy] = useState("received");
   const [sortDirection, setSortDirection] = useState("desc");

   const handleClose = () => setShow(false);
   const handleShow = (patient) => {
      setSelectedPatient(patient);
      setShow(true);
   };

   // SEARCH
   const filteredPatients = patients.filter((p) => {
      const term = searchTerm.toLowerCase();
      return (
         p.name.toLowerCase().includes(term) ||
         p.hospitalId.toLowerCase().includes(term) ||
         p.category.toLowerCase().includes(term) ||
         p.risk.toLowerCase().includes(term) ||
         p.status.toLowerCase().includes(term)
      );
   });

   // SORTING
   const sortedPatients = [...filteredPatients].sort((a, b) => {
      const dir = sortDirection === "asc" ? 1 : -1;

      const getVal = (obj) => obj[sortBy]?.toString().toLowerCase() || "";

      const aVal = getVal(a);
      const bVal = getVal(b);

      if (aVal < bVal) return -1 * dir;
      if (aVal > bVal) return 1 * dir;
      return 0;
   });

   // PAGINATION
   const totalPages = Math.ceil(sortedPatients.length / PAGE_SIZE);
   const startIndex = (currentPage - 1) * PAGE_SIZE;
   const paginatedPatients = sortedPatients.slice(
      startIndex,
      startIndex + PAGE_SIZE
   );

   const handleSort = (key) => {
      if (sortBy === key) {
         setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
         setSortBy(key);
         setSortDirection("asc");
      }
   };

   const renderSortIndicator = (key) =>
      sortBy === key ? (sortDirection === "asc" ? " ▲" : " ▼") : "";

   const riskBadge = (risk) => {
      if (risk === "High") return "badge bg-danger";
      if (risk === "Medium") return "badge bg-warning text-dark";
      return "badge bg-success";
   };

   const statusBadge = (status) => {
      if (status === "Pending") return "badge bg-warning text-dark";
      if (status === "Reviewed") return "badge bg-success";
      if (status === "Escalated") return "badge bg-danger";
      return "badge bg-secondary";
   };

   // MARK AS REVIEWED
   const handleMarkReviewed = () => {
      if (!selectedPatient) return;

      setPatients((prev) =>
         prev.map((p) =>
            p.id === selectedPatient.id ? { ...p, status: "Reviewed" } : p
         )
      );

      setSelectedPatient((prev) =>
         prev ? { ...prev, status: "Reviewed" } : null
      );
   };

   // EXPORT TO EXCEL
   const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(patients);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Patients");
      XLSX.writeFile(wb, "patients_data.xlsx");
   };

   // EXPORT TO CSV
   const exportToCSV = () => {
      const headers = Object.keys(patients[0]).join(",");
      const rows = patients.map((obj) => Object.values(obj).join(",")).join("\n");

      const csvContent = headers + "\n" + rows;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "patients_data.csv");
   };

   // RISK CHART DATA
   const riskCounts = {
      High: patients.filter((p) => p.risk === "High").length,
      Medium: patients.filter((p) => p.risk === "Medium").length,
      Low: patients.filter((p) => p.risk === "Low").length,
   };

   const riskChartData = {
      labels: ["High Risk", "Medium Risk", "Low Risk"],
      datasets: [
         {
            data: [
               riskCounts.High,
               riskCounts.Medium,
               riskCounts.Low
            ],
            backgroundColor: ["#dc3545", "#ffc107", "#28a745"],
            borderWidth: 1,
         },
      ],
   };

   return (
      <AdminLayout>
         <div className="mb-4">
            <h2 className="fw-bold">Dashboard Overview</h2>
            <p className="text-muted">Development mode — static data</p>
         </div>

         <div className="row g-4">
            {/* LEFT SIDE TABLE */}
            <div className="col-lg-7">
               <div className="card shadow-sm border-0">
                  <div className="card-header bg-white d-flex justify-content-between">
                     <h6 className="fw-bold mb-0">Recent Feedback Flags</h6>

                     {/* EXPORT BUTTONS */}
                     <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-success" onClick={exportToExcel}>
                           Excel
                        </button>
                        <button className="btn btn-sm btn-primary" onClick={exportToCSV}>
                           CSV
                        </button>
                     </div>
                  </div>

                  <div className="card-body">
                     <div className="mb-3">
                        <input
                           type="text"
                           className="form-control form-control-sm"
                           placeholder="Search by name, ID, category..."
                           value={searchTerm}
                           onChange={(e) => {
                              setSearchTerm(e.target.value);
                              setCurrentPage(1);
                           }}
                        />
                     </div>

                     <div className="table-responsive">
                        <table className="table table-sm align-middle">
                           <thead>
                              <tr>
                                 <th onClick={() => handleSort("id")}>
                                    # {renderSortIndicator("id")}
                                 </th>
                                 <th onClick={() => handleSort("name")}>
                                    Patient {renderSortIndicator("name")}
                                 </th>
                                 <th onClick={() => handleSort("hospitalId")}>
                                    Hospital ID {renderSortIndicator("hospitalId")}
                                 </th>
                                 <th onClick={() => handleSort("category")}>
                                    Category {renderSortIndicator("category")}
                                 </th>
                                 <th onClick={() => handleSort("risk")}>
                                    Risk {renderSortIndicator("risk")}
                                 </th>
                                 <th>Status</th>
                                 <th>Action</th>
                              </tr>
                           </thead>

                           <tbody>
                              {paginatedPatients.map((p) => (
                                 <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>{p.hospitalId}</td>
                                    <td>{p.category}</td>
                                    <td>
                                       <span className={riskBadge(p.risk)}>{p.risk}</span>
                                    </td>
                                    <td>
                                       <span className={statusBadge(p.status)}>{p.status}</span>
                                    </td>
                                    <td>
                                       <button
                                          className="btn btn-sm btn-primary"
                                          onClick={() => handleShow(p)}
                                       >
                                          View
                                       </button>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>

                     {/* PAGINATION */}
                     <div className="d-flex justify-content-between mt-3">
                        <small className="text-muted">
                           Showing {startIndex + 1}–
                           {Math.min(startIndex + PAGE_SIZE, sortedPatients.length)} of{" "}
                           {sortedPatients.length}
                        </small>

                        <div>
                           <button
                              className="btn btn-sm btn-outline-secondary me-2"
                              onClick={() =>
                                 setCurrentPage((p) => Math.max(1, p - 1))
                              }
                              disabled={currentPage === 1}
                           >
                              Prev
                           </button>

                           <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() =>
                                 setCurrentPage((p) => Math.min(totalPages, p + 1))
                              }
                              disabled={currentPage === totalPages}
                           >
                              Next
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* RIGHT SIDE ANALYTICS */}
            <div className="col-lg-5">
               {/* SENTIMENT BREAKDOWN */}
               <div className="card shadow-sm border-0 mb-3">
                  <div className="card-header bg-white">
                     <h6 className="fw-bold mb-0">Sentiment Breakdown</h6>
                  </div>
                  <div className="card-body">
                     <div className="mb-2 d-flex justify-content-between">
                        <span>Positive</span>
                        <span>62%</span>
                     </div>
                     <div className="progress mb-3">
                        <div className="progress-bar bg-success" style={{ width: "62%" }}></div>
                     </div>

                     <div className="mb-2 d-flex justify-content-between">
                        <span>Neutral</span>
                        <span>23%</span>
                     </div>
                     <div className="progress mb-3">
                        <div className="progress-bar bg-info" style={{ width: "23%" }}></div>
                     </div>

                     <div className="mb-2 d-flex justify-content-between">
                        <span>Negative</span>
                        <span>15%</span>
                     </div>
                     <div className="progress">
                        <div className="progress-bar bg-danger" style={{ width: "15%" }}></div>
                     </div>
                  </div>
               </div>

               {/* SERVICE AREAS */}
               <div className="card shadow-sm border-0 mb-3">
                  <div className="card-header bg-white">
                     <h6 className="fw-bold mb-0">Service Areas with Most Flags</h6>
                  </div>
                  <div className="card-body">
                     <ul className="list-group list-group-flush small">
                        <li className="list-group-item d-flex justify-content-between">
                           Emergency &amp; A&amp;E
                           <span className="badge bg-danger">12</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                           Outpatient Clinics
                           <span className="badge bg-warning text-dark">9</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                           Inpatient Wards
                           <span className="badge bg-info text-dark">7</span>
                        </li>
                     </ul>
                  </div>
               </div>

               {/* RISK DISTRIBUTION PIE CHART */}
               <div className="card shadow-sm border-0">
                  <div className="card-header bg-white">
                     <h6 className="fw-bold mb-0">Risk Level Distribution</h6>
                  </div>
                  <div className="card-body">
                     <Pie data={riskChartData} />
                  </div>
               </div>
            </div>
         </div>

         {/* MODAL */}
         <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
               <Modal.Title>Patient Feedback Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               {selectedPatient && (
                  <div className="row">
                     <div className="col-md-6">
                        <p><strong>Name:</strong> {selectedPatient.name}</p>
                        <p><strong>Hospital ID:</strong> {selectedPatient.hospitalId}</p>
                        <p><strong>Category:</strong> {selectedPatient.category}</p>
                     </div>

                     <div className="col-md-6">
                        <p>
                           <strong>Risk:</strong>{" "}
                           <span className={riskBadge(selectedPatient.risk)}>
                              {selectedPatient.risk}
                           </span>
                        </p>
                        <p>
                           <strong>Status:</strong>{" "}
                           <span className={statusBadge(selectedPatient.status)}>
                              {selectedPatient.status}
                           </span>
                        </p>
                        <p><strong>Received:</strong> {selectedPatient.received}</p>
                     </div>

                     <div className="col-12 mt-3">
                        <strong>Full Feedback:</strong>
                        <div className="border p-2 rounded mt-1" style={{ minHeight: "80px" }}>
                           <small>{selectedPatient.feedback}</small>
                        </div>
                     </div>
                  </div>
               )}
            </Modal.Body>

            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button
                  variant="success"
                  onClick={handleMarkReviewed}
                  disabled={selectedPatient?.status === "Reviewed"}
               >
                  {selectedPatient?.status === "Reviewed"
                     ? "Already Reviewed"
                     : "Mark as Reviewed"}
               </Button>
            </Modal.Footer>
         </Modal>
      </AdminLayout>
   );
};

export default AdminDashboard;
