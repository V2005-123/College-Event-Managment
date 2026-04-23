import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Tag, User, ArrowLeft, CheckCircle } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    // Check if already registered
    const currentRegistrations = JSON.parse(localStorage.getItem('registeredEventIds') || '[]');
    if (currentRegistrations.includes(parseInt(id))) {
      setIsRegistered(true);
    }

    fetch(`http://localhost:5000/api/events/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.message === "Event not found") {
          setEvent(null);
        } else {
          setEvent(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching event:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="container event-not-found glass"><h2>Loading...</h2></div>;
  }

  if (!event) {
    return (
      <div className="container event-not-found glass">
        <h2>Event not found</h2>
        <Link to="/events" className="btn btn-primary mt-4">Back to Events</Link>
      </div>
    );
  }

  const handleRegisterClick = () => {
    if (event.price > 0) {
      setShowPaymentModal(true);
    } else {
      executeRegistration();
    }
  };

  const executeRegistration = () => {
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: event.id, userEmail: 'student@wit.edu' })
    })
    .then(res => res.json())
    .then(data => {
      // Save to localStorage
      const currentRegistrations = JSON.parse(localStorage.getItem('registeredEventIds') || '[]');
      if (!currentRegistrations.includes(event.id)) {
        localStorage.setItem('registeredEventIds', JSON.stringify([...currentRegistrations, event.id]));
      }
      setIsRegistered(true);
      setShowPaymentModal(false);
      setShowSuccessModal(true);
    })
    .catch(err => alert("Error registering for event"));
  };

  return (
    <div className="event-details-page container">
      <Link to="/events" className="back-link">
        <ArrowLeft size={16} /> Back to Events
      </Link>
      
      <div className="event-details-grid">
        <div className="event-main-info">
          <div className="event-hero-image">
            <img src={event.image} alt={event.title} />
            <div className="event-badge">{event.category}</div>
          </div>
          
          <div className="event-description-box glass">
            <h2>About this Event</h2>
            <p>{event.description}</p>
          </div>
        </div>
        
        <div className="event-sidebar">
          <div className="registration-card glass">
            <h1 className="event-title">{event.title}</h1>
            <div className="event-price-large">
              {event.price === 0 ? 'Free' : `₹${event.price}`}
            </div>
            
            <div className="event-meta-list">
              <div className="meta-item">
                <Calendar className="meta-icon" />
                <div>
                  <div className="meta-label">Date</div>
                  <div className="meta-value">{event.date}</div>
                </div>
              </div>
              <div className="meta-item">
                <Clock className="meta-icon" />
                <div>
                  <div className="meta-label">Time</div>
                  <div className="meta-value">{event.time}</div>
                </div>
              </div>
              <div className="meta-item">
                <MapPin className="meta-icon" />
                <div>
                  <div className="meta-label">Location</div>
                  <div className="meta-value">{event.location}</div>
                </div>
              </div>
              <div className="meta-item">
                <User className="meta-icon" />
                <div>
                  <div className="meta-label">Organizer</div>
                  <div className="meta-value">{event.organizer}</div>
                </div>
              </div>
            </div>
            
            <button 
              className={`btn btn-lg full-width ${isRegistered ? 'btn-secondary' : 'btn-primary'}`} 
              onClick={handleRegisterClick}
              disabled={isRegistered}
            >
              {isRegistered 
                ? 'Registered Successfully ✓' 
                : (event.price > 0 ? `Pay ₹${event.price} & Register` : 'Register Now')
              }
            </button>
            <p className="registration-note">
              {isRegistered ? 'Your seat is confirmed!' : 'Limited seats available. Register early!'}
            </p>
          </div>
        </div>
      </div>

      {/* Render Payment Modal */}
      {showPaymentModal && (
        <PaymentModal 
          event={event} 
          user={{ email: 'student@wit.edu' }} 
          onSuccess={executeRegistration} 
          onClose={() => setShowPaymentModal(false)} 
        />
      )}

      {/* Render Success Modal */}
      {showSuccessModal && (
        <div className="ticket-modal-overlay">
          <div className="ticket-modal-container glass" style={{ maxWidth: '400px', textAlign: 'center', padding: '40px 20px', background: '#ffffff', color: '#0f172a' }}>
            <CheckCircle color="#10b981" size={64} style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Congratulations!</h2>
            <p style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '20px' }}>
              You have successfully registered for <strong>{event.title}</strong>.
            </p>
            <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '8px', marginBottom: '30px' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase' }}>Upcoming Date</p>
              <p style={{ margin: '5px 0 0', fontWeight: 'bold', fontSize: '1.2rem' }}>{event.date} at {event.time}</p>
            </div>
            <button className="btn btn-primary full-width" onClick={() => setShowSuccessModal(false)}>
              Awesome, Thanks!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
