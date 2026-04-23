import React from 'react';
import { X, Calendar, MapPin, Clock } from 'lucide-react';
import QRCode from 'react-qr-code';
import './TicketModal.css';

const TicketModal = ({ event, user, onClose }) => {
  if (!event) return null;

  // Generate a random ticket ID
  const ticketId = `WIT-${event.id}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  const userName = user ? user.email.split('@')[0] : 'Guest User';
  
  // Create data for the QR code (URL format makes it scannable to open a browser)
  const qrData = `https://wit-college-events.com/verify-ticket?id=${ticketId}&user=${encodeURIComponent(userName)}`;

  return (
    <div className="ticket-modal-overlay" onClick={onClose}>
      <div className="ticket-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="ticket">
          {/* Left Side: Event Details */}
          <div className="ticket-details">
            <div className="ticket-header">
              <span className="ticket-badge">{event.category}</span>
              <h2>{event.title}</h2>
            </div>
            
            <div className="ticket-info-grid">
              <div className="info-item">
                <Calendar className="info-icon" size={16} />
                <div>
                  <label>Date</label>
                  <p>{event.date}</p>
                </div>
              </div>
              <div className="info-item">
                <Clock className="info-icon" size={16} />
                <div>
                  <label>Time</label>
                  <p>{event.time}</p>
                </div>
              </div>
              <div className="info-item full-width">
                <MapPin className="info-icon" size={16} />
                <div>
                  <label>Location</label>
                  <p>{event.location}</p>
                </div>
              </div>
            </div>
            
            <div className="ticket-footer">
              <div className="attendee-info">
                <label>Attendee</label>
                <p>{userName}</p>
              </div>
              <div className="price-info">
                <label>Price</label>
                <p>{event.price === 0 ? 'FREE' : `₹${event.price}`}</p>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="ticket-divider">
            <div className="notch top"></div>
            <div className="dash-line"></div>
            <div className="notch bottom"></div>
          </div>
          
          {/* Right Side: QR and Stub */}
          <div className="ticket-stub">
            <div className="qr-container" style={{ background: 'white', padding: '16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
              <QRCode 
                value={qrData}
                size={100}
                bgColor="#ffffff"
                fgColor="#0f172a"
                level="L"
              />
            </div>
            <div className="ticket-id">
              <label>Ticket ID</label>
              <p>{ticketId}</p>
            </div>
            <p className="stub-note">Scan at entrance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
