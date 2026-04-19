import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
  return (
    <div className="event-card glass">
      <div className="event-image-container">
        <img src={event.image || `https://source.unsplash.com/random/800x600?${event.category}`} alt={event.title} className="event-image" />
        <div className="event-category">{event.category}</div>
      </div>
      
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        
        <div className="event-details">
          <div className="event-detail-item">
            <Calendar size={16} className="detail-icon" />
            <span>{event.date}</span>
          </div>
          <div className="event-detail-item">
            <Clock size={16} className="detail-icon" />
            <span>{event.time}</span>
          </div>
          <div className="event-detail-item">
            <MapPin size={16} className="detail-icon" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <div className="event-footer">
          <div className="event-price">{event.price === 0 ? 'Free' : `₹${event.price}`}</div>
          <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
