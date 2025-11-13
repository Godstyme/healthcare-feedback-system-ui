import React from 'react';
import brand from '../assets/favicons/brand.svg'
import { Link } from 'react-router-dom';



function Header() {

   return (
      <header>
         {/* Main Navbar */}
         <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container-fluid px-4">
               <Link to="/" className="navbar-brand fw-bold">
                  <img src={brand} alt="HFS" width="93" height="34" />
               </Link>     
               <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
               >
                  <span className="navbar-toggler-icon"></span>
               </button>

               <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                  <ul className="navbar-nav mb-2 mb-lg-0">
                     <li className="nav-item">
                        <Link to="/" className="nav-link active text-white" aria-current="page">
                           Home
                        </Link>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link text-white" href="#">
                           About
                        </a>
                     </li>
                     <li className="nav-item">
                        <Link to="/login" className="nav-link text-white">Login</Link>
                     </li>
                     <li className="nav-item">
                        <Link to="/register" className="nav-link text-white">Register</Link>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>
      </header>
   );
}

export default Header;
