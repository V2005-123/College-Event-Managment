import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import EventCard from '../components/EventCard';
import { dummyEvents } from '../data/events';
import './Events.css';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'technology', 'cultural', 'sports', 'business', 'networking'];

  const filteredEvents = dummyEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="events-page container">
      <div className="events-header">
        <h1 className="page-title">Explore Events</h1>
        <p className="page-subtitle">Find the perfect event to enhance your college experience.</p>
      </div>

      <div className="events-controls glass">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search events by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="category-filters">
          <Filter size={20} className="filter-icon" />
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="events-grid">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="no-events glass">
          <h3>No events found</h3>
          <p>Try adjusting your search or filter criteria.</p>
          <button className="btn btn-secondary mt-4" onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;
