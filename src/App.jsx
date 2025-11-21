import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CookieConsent from "./components/CookieConsent";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserDashboard from "./components/pages/Dashboard/User/UserDashboard";
import Profile from "./components/pages/Dashboard/User/Profile";
import Feedbacks from "./components/pages/Dashboard/User/Feedbacks";
//admin @system.com

// admin imports can go here when needed
import AdminDashboard from "./components/pages/Dashboard/Admin/AdminDashboard";
import ManageUsers from "./components/pages/Dashboard/Admin/ManageUsers";
import Analytics from "./components/pages/Dashboard/Admin/Analytics";
import ManageFeedbacks from "./components/pages/Dashboard/Admin/ManageFeedbacks";


function App() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Router>
        <Routes>

          <Route
            path="/"
            element={
              <>
                <CookieConsent />
                <Navbar />
                <Hero />
                <Footer />
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            }
          />

          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            }
          />


          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/feedbacks"
            element={
              <ProtectedRoute>
                <Feedbacks />
              </ProtectedRoute>
            }
          />


          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly={true}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/feedbacks"
            element={
              <ProtectedRoute adminOnly={true}>
                <ManageFeedbacks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute adminOnly={true}>
                <Analytics />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
