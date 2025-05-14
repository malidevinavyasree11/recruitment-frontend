import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './Capgemini1.png';
const Navbar = () => {
  return (
    <div className="sidebar">
      <div>
        <img src={logo} alt="Capgemini Logo" className="logo" />
      </div>
      <div>
      <p>Data</p>
      <p>Project wise Data</p>
      <Link to="/5days"><p>5 days Delta</p></Link>
      <Link to="/upload-excel">
        <p>Upload Excel</p>
      </Link>
      </div>
    </div>
  );
};
export default Navbar;
