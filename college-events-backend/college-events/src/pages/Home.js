import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import EventCard from '../components/EventCard';
import ContactModal from '../components/ContactModal';
import './Home.css';

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [showContactModal, setShowContactModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setFeaturedEvents(data.slice(0, 3)))
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="container hero-content">
          <div className="hero-badge glass">
            <Star size={16} className="text-secondary" />
            <span>Discover Top College Events</span>
          </div>
          <h1 className="hero-title">
            Experience College Life <br />
            <span className="text-gradient">Like Never Before</span>
          </h1>
          <p className="hero-subtitle">
            Find, register, and participate in the best workshops, fests, and sports events happening at Walchand Institute of Technology, Solapur.
          </p>
          <div className="hero-actions">
            <Link to="/events" className="btn btn-primary btn-lg">
              Explore Events <ArrowRight size={20} />
            </Link>
            <Link to="/dashboard" className="btn btn-secondary btn-lg">
              My Registrations
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="featured-section container">
        <div className="section-header">
          <h2 className="section-title">Trending Events</h2>
          <Link to="/events" className="view-all-link">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="events-grid">
          {featuredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section container">
        <div className="cta-card glass">
          <h2>Ready to host your own event?</h2>
          <p>Contact the admin to get your WIT club's event listed.</p>
          <button onClick={() => setShowContactModal(true)} className="btn btn-primary">Contact Admin</button>
        </div>
      </section>

      {/* Render Contact Modal */}
      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </div>
  );
};

export default Home;
