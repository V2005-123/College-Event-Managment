import React from 'react';
import { Calendar, Mail, Phone, MapPin, Github, Twitter, Instagram } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-icon">
              <Calendar size={20} />
            </div>
            <span>WIT<span>Events</span></span>
          </div>
          <p>Walchand Institute of Technology's premier event management platform. Connecting students with opportunities and excellence.</p>
          <div className="social-links">
            <a href="#"><Github size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/admin">Admin Panel</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <ul>
            <li><MapPin size={18} /> Solapur, Maharashtra, India</li>
            <li><Phone size={18} /> +91 1234567890</li>
            <li><Mail size={18} /> info@wit.edu</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 WIT Events. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
