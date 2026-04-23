import React, { useState, useEffect } from 'react';
import { Calendar, Ticket, Award } from 'lucide-react';
import TicketModal from '../components/TicketModal';
import { dummyEvents } from '../data/events';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Read registered IDs from localStorage
    const savedIds = JSON.parse(localStorage.getItem('registeredEventIds') || '[]');
    
    if (savedIds.length > 0) {
      // Fetch all events from backend
      fetch('http://localhost:5000/api/events')
        .then(res => res.json())
        .then(data => {
          // Filter events to only those the user registered for
          const userEvents = data.filter(e => savedIds.includes(e.id));
          setRegisteredEvents(userEvents);
        })
        .catch(err => console.error("Error fetching events:", err));
    }
  }, []);

  return (
    <div className="dashboard-page container">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p>Manage your events and registrations</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card glass">
          <div className="stat-icon-wrapper blue">
            <Ticket className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Registered Events</h3>
            <p className="stat-number">{registeredEvents.length}</p>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="stat-icon-wrapper green">
            <Calendar className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Upcoming</h3>
            <p className="stat-number">{registeredEvents.length}</p>
          </div>
        </div>
        <div className="stat-card glass">
          <div className="stat-icon-wrapper purple">
            <Award className="stat-icon" />
          </div>
          <div className="stat-info">
            <h3>Certificates</h3>
            <p className="stat-number">0</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="registered-events-section glass">
          <h2>My Registrations</h2>
          {registeredEvents.length > 0 ? (
            <div className="registration-list">
              {registeredEvents.map(event => (
                <div key={event.id} className="registration-item">
                  <div className="reg-image">
                    <img src={event.image} alt={event.title} />
                  </div>
                  <div className="reg-details">
                    <h4>{event.title}</h4>
                    <p className="reg-meta">{event.date} • {event.time}</p>
                    <span className="status-badge upcoming">Upcoming</span>
                  </div>
                  <div className="reg-actions">
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedTicket(event)}
                    >
                      View Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">You haven't registered for any events yet.</p>
          )}
        </div>
      </div>
      
      {/* Render Ticket Modal */}
      {selectedTicket && (
        <TicketModal 
          event={selectedTicket} 
          user={user} 
          onClose={() => setSelectedTicket(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
