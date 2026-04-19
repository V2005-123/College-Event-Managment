import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Tag, User, ArrowLeft } from 'lucide-react';
import { dummyEvents } from '../data/events';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const event = dummyEvents.find(e => e.id === parseInt(id));

  if (!event) {
    return (
      <div className="container event-not-found glass">
        <h2>Event not found</h2>
        <Link to="/events" className="btn btn-primary mt-4">Back to Events</Link>
      </div>
    );
  }

  const handleRegister = () => {
    alert(`Successfully registered for ${event.title}!`);
    // In a real app, this would update state/database
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
            
            <button className="btn btn-primary btn-lg full-width" onClick={handleRegister}>
              Register Now
            </button>
            <p className="registration-note">Limited seats available. Register early!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
