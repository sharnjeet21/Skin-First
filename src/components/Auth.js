import React, { useState } from 'react';
import { authAPI } from '../services/api';
import './Auth.css';

const Auth = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Validation
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match!');
        }
        if (formData.name.trim() === '') {
          throw new Error('Please enter your name!');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long!');
        }
      }

      if (formData.email.trim() === '' || formData.password.trim() === '') {
        throw new Error('Please fill in all required fields!');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address!');
      }

      // Try to use the backend API first, fallback to local storage
      try {
        let result;
        if (isSignUp) {
          // Register new user
          result = await authAPI.register({
            name: formData.name,
            email: formData.email,
            password: formData.password
          });
        } else {
          // Login existing user
          result = await authAPI.login({
            email: formData.email,
            password: formData.password
          });
        }

        // Store token and user data
        localStorage.setItem('beautyAppToken', result.token);
        localStorage.setItem('beautyAppUser', JSON.stringify(result.user));
        onLogin(result.user);
      } catch (apiError) {
        console.log('API not available, using local storage fallback');
        
        // Fallback to local storage for demo purposes
        if (isSignUp) {
          // Check if user already exists in localStorage
          const existingUsers = JSON.parse(localStorage.getItem('beautyAppUsers') || '[]');
          const userExists = existingUsers.find(u => u.email === formData.email);
          
          if (userExists) {
            throw new Error('User already exists with this email');
          }
          
          // Create new user
          const newUser = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            password: formData.password, // In demo mode, store plain password
            createdAt: new Date().toISOString()
          };
          
          existingUsers.push(newUser);
          localStorage.setItem('beautyAppUsers', JSON.stringify(existingUsers));
          
          // Create session
          const userData = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt
          };
          
          localStorage.setItem('beautyAppToken', 'demo-token-' + newUser.id);
          localStorage.setItem('beautyAppUser', JSON.stringify(userData));
          onLogin(userData);
        } else {
          // Login with localStorage
          const existingUsers = JSON.parse(localStorage.getItem('beautyAppUsers') || '[]');
          const user = existingUsers.find(u => u.email === formData.email && u.password === formData.password);
          
          if (!user) {
            throw new Error('Invalid email or password');
          }
          
          // Create session
          const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
          };
          
          localStorage.setItem('beautyAppToken', 'demo-token-' + user.id);
          localStorage.setItem('beautyAppUser', JSON.stringify(userData));
          onLogin(userData);
        }
      }

    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Skin-First</h1>
            <p>Your personal AI skincare advisor.</p>
          </div>

          <div className="auth-tabs">
            <button 
              type="button"
              className={`tab-button ${!isSignUp ? 'active' : ''}`}
              onClick={() => !isSignUp || toggleMode()}
            >
              Login
            </button>
            <button 
              type="button"
              className={`tab-button ${isSignUp ? 'active' : ''}`}
              onClick={() => isSignUp || toggleMode()}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {isSignUp && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
            </div>

            {isSignUp && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? (
                <span className="loading-spinner">
                  <span className="spinner"></span>
                  {isSignUp ? 'Creating Account...' : 'Signing In...'}
                </span>
              ) : (
                isSignUp ? 'Sign Up' : 'Login'
              )}
            </button>
          </form>

          <div className="demo-note">
            <p>💡 Demo Mode: Create an account or sign in with any valid email and password (6+ characters)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;