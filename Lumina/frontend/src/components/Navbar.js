import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/g">
          <img src="/images/lumina.png" alt="Shopping Mall Logo" height="60" />
        </Link>
      </div>
      <div className="navbar-links">
        {/* <Link to="/g" className="nav-link">Home</Link>
        <Link to="/add" className="nav-link">Add Product</Link>
        <Link to="/" className="nav-link">Product Dashboard</Link> */}
        <Link to="/" className="nav-link">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
