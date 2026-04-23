import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

import { API_URL } from '../config';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data.slice(0, 3)); // Show top 3 events
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-text"
          >
            <div className="badge animate-fade-in">
              <Sparkles size={16} />
              <span>Experience Excellence</span>
            </div>
            <h1>Discover & Manage <br /><span className="gradient-text">Campus Events</span> Effortlessly</h1>
            <p>The ultimate platform for Walchand Institute of Technology students to stay updated with symposiums, cultural fests, and workshops.</p>
            <div className="hero-btns">
              <Link to="/events" className="btn btn-primary">
                Explore Events <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Get Started
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-image"
          >
            <div className="glass-card main-img">
              <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80" alt="College Events" />
              <div className="floating-badge top-right glass">
                <Calendar className="text-primary" />
                <div>
                  <strong>Upcoming</strong>
                  <span>WITech 2026</span>
                </div>
              </div>
              <div className="floating-badge bottom-left glass">
                <Users className="text-secondary" />
                <div>
                  <strong>1000+</strong>
                  <span>Attendees</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="featured container">
        <div className="section-header">
          <h2>Featured <span className="gradient-text">Events</span></h2>
          <p>Don't miss out on these upcoming highlights</p>
        </div>

        <div className="events-grid">
          {loading ? (
            <div className="loading">Loading stunning events...</div>
          ) : (
            events.map((event, index) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="event-card glass"
              >
                <div className="event-img">
                  <img src={event.image} alt={event.title} />
                  <span className="category-tag">{event.category}</span>
                </div>
                <div className="event-info">
                  <h3>{event.title}</h3>
                  <div className="event-meta">
                    <span><Calendar size={16} /> {event.date}</span>
                    <span><MapPin size={16} /> {event.location}</span>
                  </div>
                  <p>{event.description.substring(0, 100)}...</p>
                  <Link to={`/events/${event.id}`} className="view-details">
                    View Details <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
        
        <div className="center-btn">
          <Link to="/events" className="btn btn-outline">View All Events</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
