import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Image as ImageIcon, Calendar, MapPin, Clock, Tag, Type, CheckCircle, AlertCircle } from 'lucide-react';
import { API_URL } from '../config';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'technology',
    date: '',
    time: '',
    location: '',
    price: 0,
    image: '',
    description: '',
    organizer: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          title: '',
          category: 'technology',
          date: '',
          time: '',
          location: '',
          price: 0,
          image: '',
          description: '',
          organizer: ''
        });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.message || 'Failed to add event');
      }
    } catch (err) {
      setError('Connection error. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="admin-page container">
      <header className="page-header">
        <h1>Admin <span className="gradient-text">Dashboard</span></h1>
        <p>Manage campus events and announcements</p>
      </header>

      <div className="admin-grid">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-form-card glass"
        >
          <div className="form-header">
            <Plus className="text-primary" />
            <h2>Add New Event</h2>
          </div>

          {success && (
            <div className="success-banner">
              <CheckCircle size={18} />
              <span>Event added successfully!</span>
            </div>
          )}

          {error && (
            <div className="error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Event Title</label>
                <div className="input-wrapper">
                  <Type size={18} />
                  <input name="title" value={formData.title} onChange={handleChange} placeholder="Enter event title" required />
                </div>
              </div>
              <div className="form-group">
                <label>Category</label>
                <div className="input-wrapper">
                  <Tag size={18} />
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="technology">Technology</option>
                    <option value="cultural">Cultural</option>
                    <option value="sports">Sports</option>
                    <option value="business">Business</option>
                    <option value="networking">Networking</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <div className="input-wrapper">
                  <Calendar size={18} />
                  <input name="date" value={formData.date} onChange={handleChange} placeholder="e.g. Oct 20, 2026" required />
                </div>
              </div>
              <div className="form-group">
                <label>Time</label>
                <div className="input-wrapper">
                  <Clock size={18} />
                  <input name="time" value={formData.time} onChange={handleChange} placeholder="e.g. 10:00 AM" required />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <div className="input-wrapper">
                  <MapPin size={18} />
                  <input name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Main Auditorium" required />
                </div>
              </div>
              <div className="form-group">
                <label>Registration Fee (₹)</label>
                <div className="input-wrapper">
                  <span className="currency">₹</span>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <div className="input-wrapper">
                <ImageIcon size={18} />
                <input name="image" value={formData.image} onChange={handleChange} placeholder="Unsplash or direct image URL" required />
              </div>
            </div>

            <div className="form-group">
              <label>Organizer</label>
              <div className="input-wrapper">
                <User size={18} />
                <input name="organizer" value={formData.organizer} onChange={handleChange} placeholder="Dept or Student Club" required />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Describe the event details, rules, and highlights..."
                required
              />
            </div>

            <button type="submit" className={`submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
              {loading ? 'Saving Event...' : 'Create Event'}
            </button>
          </form>
        </motion.div>

        <div className="admin-stats">
          <div className="stat-card glass">
            <h3>Quick Tip</h3>
            <p>Make sure to use high-quality images from Unsplash to make the event listing more attractive to students.</p>
          </div>
          <div className="stat-card glass">
            <h3>Preview</h3>
            <div className="preview-placeholder">
              {formData.title || 'Your Event Title'}
            </div>
            <p className="preview-note">Images and details will be formatted automatically.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
