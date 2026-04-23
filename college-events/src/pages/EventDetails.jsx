import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, User, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_URL } from '../config';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/events/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Event not found");
        return res.json();
      })
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleRegister = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    setRegistering(true);
    fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: id, userEmail: user.email })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setRegistered(true);
      }
      setRegistering(false);
    })
    .catch(err => {
      console.error(err);
      setRegistering(false);
    });
  };

  if (loading) return <div className="container py-20">Loading event details...</div>;
  if (!event) return <div className="container py-20">Event not found.</div>;

  return (
    <div className="event-details-page container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <ArrowLeft size={20} /> Back to Events
      </button>

      <div className="details-grid">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="details-content"
        >
          <span className="category-badge">{event.category}</span>
          <h1>{event.title}</h1>
          
          <div className="info-cards">
            <div className="info-card glass">
              <Calendar className="icon text-primary" />
              <div>
                <strong>Date</strong>
                <span>{event.date}</span>
              </div>
            </div>
            <div className="info-card glass">
              <Clock className="icon text-secondary" />
              <div>
                <strong>Time</strong>
                <span>{event.time}</span>
              </div>
            </div>
            <div className="info-card glass">
              <MapPin className="icon text-accent" />
              <div>
                <strong>Location</strong>
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          <div className="description">
            <h3>About this Event</h3>
            <p>{event.description}</p>
          </div>

          <div className="organizer glass">
            <div className="org-avatar">
              <User size={24} />
            </div>
            <div>
              <strong>Organized by</strong>
              <span>{event.organizer}</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="details-sidebar"
        >
          <div className="registration-card glass">
            <div className="sidebar-img">
              <img src={event.image} alt={event.title} />
            </div>
            <div className="sidebar-content">
              <div className="price-tag">
                {event.price === 0 ? 'Free Entry' : `₹${event.price}`}
              </div>
              
              {registered ? (
                <div className="success-msg">
                  <CheckCircle />
                  <span>You're registered!</span>
                </div>
              ) : (
                <button 
                  className={`reg-btn ${registering ? 'loading' : ''}`}
                  onClick={handleRegister}
                  disabled={registering}
                >
                  {registering ? 'Registering...' : 'Register Now'}
                </button>
              )}
              
              <p className="sidebar-note">
                * Limited slots available. Registration closes 2 days before the event.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails;
