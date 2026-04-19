import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    alert('Logged in successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-container glass">
        <div className="login-header">
          <div className="login-icon-wrapper">
            <User size={32} className="login-icon" />
          </div>
          <h2>Welcome Back</h2>
          <p>Login to manage your events</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="form-control" 
              placeholder="student@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className="form-actions">
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-primary btn-lg full-width">
            <LogIn size={20} /> Login
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="#">Contact Admin</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
