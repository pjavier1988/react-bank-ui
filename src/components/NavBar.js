import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        YourAppName
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/transfers">
              Transfers
            </Link>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
