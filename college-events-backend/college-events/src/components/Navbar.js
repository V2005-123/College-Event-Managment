import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, User, LogIn } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <nav className="navbar glass">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          <Calendar className="brand-icon" size={24} />
          <span className="text-gradient font-bold">WIT Events</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/events" className={`nav-link ${isActive('/events')}`}>Events</Link>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Dashboard</Link>
          <Link to="/analytics" className={`nav-link ${isActive('/analytics')}`}>Analytics</Link>
          {user && user.role === 'admin' && (
            <Link to="/admin" className={`nav-link ${isActive('/admin')}`}>Admin</Link>
          )}
          
          {user ? (
            <button onClick={handleLogout} className="btn btn-secondary btn-sm login-btn">
              <User size={16} />
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm login-btn">
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
