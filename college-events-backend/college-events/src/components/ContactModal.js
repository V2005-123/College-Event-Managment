import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import './ContactModal.css';

const ContactModal = ({ onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="ticket-modal-overlay" onClick={onClose}>
      <div className="contact-modal-container glass" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        {isSubmitted ? (
          <div className="contact-success">
            <CheckCircle color="#10b981" size={64} style={{ margin: '0 auto 20px' }} />
            <h2>Message Sent!</h2>
            <p>Thank you for reaching out. The admin team will review your request and get back to you shortly.</p>
            <button className="btn btn-primary full-width mt-4" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <div className="contact-form-section">
            <h2>Contact Admin</h2>
            <p className="contact-subtitle">Have a question or want to list an event? Send us a message.</p>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" className="form-control" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  className="form-control" 
                  rows="4" 
                  placeholder="How can we help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required 
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg full-width">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
