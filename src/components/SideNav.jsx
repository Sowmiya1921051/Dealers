import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserAlt, FaCog, FaInfoCircle } from 'react-icons/fa'; // Import different icons

const SideNav = () => {
  return (
    <div className="sidenav">
      <ul className="sidenav-list">
        <li>
          <Link to="/" className="sidenav-link">
            <FaHome className="sidenav-icon" /> Home
          </Link>
        </li>
        <li>
          <Link to="/add-broker" className="sidenav-link">
            <FaUserAlt className="sidenav-icon" /> Add Broker
          </Link>
        </li>
        <li>
          <Link to="/broker-details" className="sidenav-link"> {/* Updated the link */}
            <FaCog className="sidenav-icon" /> Broker Details
          </Link>
        </li>
        <li>
          <Link to="/settings" className="sidenav-link">
            <FaCog className="sidenav-icon" /> Settings
          </Link>
        </li>
        <li>
          <Link to="/about" className="sidenav-link">
            <FaInfoCircle className="sidenav-icon" /> About
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;