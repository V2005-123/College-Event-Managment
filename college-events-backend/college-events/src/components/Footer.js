import React from 'react';
import { Globe, MessageCircle, Briefcase } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3 className="text-gradient">WIT College Solapur</h3>
          <p className="footer-description">
            Your one-stop destination for all college activities, workshops, and fests at Walchand Institute of Technology.
          </p>
        </div>
        
        <div className="footer-links-group">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/events">Events</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-social">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a href="#" className="social-icon"><Globe size={20} /></a>
            <a href="#" className="social-icon"><MessageCircle size={20} /></a>
            <a href="#" className="social-icon"><Briefcase size={20} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} WIT College Solapur. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
