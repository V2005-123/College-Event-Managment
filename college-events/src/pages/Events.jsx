import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Events.css';

import { API_URL } from '../config';

const Categories = ['all', 'technology', 'cultural', 'sports', 'business', 'networking'];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetch(`${API_URL}/api/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = events;
    
    if (activeCategory !== 'all') {
      result = result.filter(e => e.category === activeCategory);
    }
    
    if (searchTerm) {
      result = result.filter(e => 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredEvents(result);
  }, [searchTerm, activeCategory, events]);

  return (
    <div className="events-page container">
      <header className="page-header">
        <h1>Explore <span className="gradient-text">Events</span></h1>
        <p>Find the perfect event to join and grow your skills</p>
      </header>

      <div className="filters-bar glass">
        <div className="search-box">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="categories">
          {Categories.map(cat => (
            <button 
              key={cat}
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="events-grid">
        {loading ? (
          <div className="loading">Fetching events...</div>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
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
                <p>{event.description}</p>
                <Link to={`/events/${event.id}`} className="view-details">
                  View Details <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-results">
            <h3>No events found matching your criteria.</h3>
            <button onClick={() => {setSearchTerm(''); setActiveCategory('all');}}>Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
