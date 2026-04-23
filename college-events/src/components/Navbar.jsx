import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, User, LogOut, Menu, X, Shield } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Mock user for now
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <Calendar size={24} />
          </div>
          <span>WIT<span>Events</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links desktop">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>Events</Link>
          
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="admin-link">
                  <Shield size={18} />
                  Admin
                </Link>
              )}
              <div className="user-profile">
                <div className="avatar">
                  <User size={18} />
                </div>
                <span className="user-name">{user.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/events" onClick={() => setIsMenuOpen(false)}>Events</Link>
        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>
            )}
            <button onClick={handleLogout} className="mobile-logout">
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="mobile-login" onClick={() => setIsMenuOpen(false)}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
