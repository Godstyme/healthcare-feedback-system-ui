import React from "react";
import "../App.css";

function Hero() {
   return (
      <section className="hero-section d-flex align-items-center justify-content-center text-center text-white">
         <div className="hero-overlay"></div>
         <div className="hero-content position-relative">
            <h1 className="display-4 fw-bold">Your Voice Matters</h1>
            <p className="lead">Share your feedback and help us improve healthcare services.</p>
            <button className="btn btn-light btn-lg mt-3">Give Feedback</button>
         </div>
      </section>
   );
}

export default Hero;
