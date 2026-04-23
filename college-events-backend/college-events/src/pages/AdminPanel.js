import React, { useState } from 'react';
import { PlusCircle, Image, Calendar, MapPin, Tag, AlignLeft, Clock } from 'lucide-react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'technology',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    price: 'Free',
    organizer: 'College Admin'
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Event added successfully!' });
        setFormData({
          title: '',
          category: 'technology',
          date: '',
          time: '',
          location: '',
          description: '',
          image: '',
          price: 'Free',
          organizer: 'College Admin'
        });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to add event.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error connecting to server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel-page container">
      <div className="admin-header">
        <h1 className="text-gradient">Admin Panel</h1>
        <p>Create and manage college events</p>
      </div>

      <div className="admin-form-container glass">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
            <PlusCircle size={24} color="var(--primary)" />
            Add New Event
          </h2>
          <a href="/admin/settings" className="btn btn-secondary btn-sm" style={{ textDecoration: 'none' }}>
            Account Settings
          </a>
        </div>

        {message.text && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`} style={{ marginBottom: '20px', padding: '15px', borderRadius: '10px', background: message.type === 'success' ? '#d4edda' : '#f8d7da', color: message.type === 'success' ? '#155724' : '#721c24' }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group full-width">
            <label><Tag size={16} style={{ marginRight: '5px' }} /> Event Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="e.g. Annual Tech Symposium"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label><Calendar size={16} style={{ marginRight: '5px' }} /> Category</label>
            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="technology">Technology</option>
              <option value="cultural">Cultural</option>
              <option value="sports">Sports</option>
              <option value="business">Business</option>
              <option value="networking">Networking</option>
              <option value="workshop">Workshop</option>
              <option value="social">Social</option>
              <option value="seminar">Seminar</option>
              <option value="exhibition">Exhibition</option>
            </select>
          </div>

          <div className="form-group">
            <label><Calendar size={16} style={{ marginRight: '5px' }} /> Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label><Clock size={16} style={{ marginRight: '5px' }} /> Time</label>
            <input
              type="text"
              name="time"
              className="form-control"
              placeholder="e.g. 10:00 AM - 4:00 PM"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label><MapPin size={16} style={{ marginRight: '5px' }} /> Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              placeholder="e.g. Auditorium A-101"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label><Image size={16} style={{ marginRight: '5px' }} /> Image URL</label>
            <input
              type="url"
              name="image"
              className="form-control"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <label><AlignLeft size={16} style={{ marginRight: '5px' }} /> Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Provide a detailed description of the event..."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-submit">
            <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
              {loading ? 'Adding Event...' : (
                <>
                  <PlusCircle size={20} />
                  Publish Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
