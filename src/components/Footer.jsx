import React from "react";

function Footer() {
   const currentYear = new Date().getFullYear();
   return (
      <footer className="bg-secondary text-white py-4">
         <div className="container text-center">
            <p className="mb-1">&copy; {currentYear} NHS Feedback Analysis Project | All Rights Reserved</p>
            <p className="mb-0">Contact: <a href="" className="text-white">admin@nhsfeedbacksystem.org</a></p>
            <div className="mt-3">
               <a href="#" className="text-white me-3">Facebook</a>
               <a href="#" className="text-white me-3">Twitter</a>
               <a href="#" className="text-white">LinkedIn</a>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
