import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/PFP-01__5_-removebg-preview.png";

export default function Navbar() {
  return (
    <nav className="navbar-simple">
      <div className="navbar-container-simple">
        <Link to="/" className="navbar-logo-large">
          <img src={logo} alt="Top Mobile" className="logo-image" />
          <span className="brand-name-large">Top Mobile</span>
        </Link>
      </div>
    </nav>
  );
}