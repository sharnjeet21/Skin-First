import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ user, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleSave = async () => {
    if (!editData.name.trim() || !editData.email.trim()) {
      showMessage('error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data
      const updatedUser = { 
        ...user, 
        name: editData.name.trim(),
        email: editData.email.trim()
      };
      
      localStorage.setItem('beautyAppUser', JSON.stringify(updatedUser));
      
      if (onUpdateUser) {
        onUpdateUser(updatedUser);
      }
      
      setIsEditing(false);
      showMessage('success', 'Profile updated successfully!');
    } catch (error) {
      showMessage('error', 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('error', 'New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showMessage('error', 'Password must be at least 6 characters long!');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      showMessage('success', 'Password updated successfully!');
    } catch (error) {
      showMessage('error', 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getMembershipDuration = () => {
    if (!user?.createdAt) return 'New member';
    
    const created = new Date(user.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>👤 My Profile</h1>
        <p>Manage your personal information and preferences</p>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-content">
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile
          </button>
          <button 
            className={`tab-button ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            🔐 Account
          </button>
          <button 
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            🔔 Notifications
          </button>
          <button 
            className={`tab-button ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            🔒 Privacy
          </button>
        </div>

        <div className="profile-panel">
          {activeTab === 'profile' && (
            <div className="profile-tab-content">
              <div className="profile-card">
                <div className="profile-avatar">
                  <div className="avatar-circle">
                    {getInitials(user?.name)}
                  </div>
                </div>

                <div className="profile-info">
                  {!isEditing ? (
                    <>
                      <div className="info-section">
                        <h2>{user?.name || 'User Name'}</h2>
                        <p className="email">{user?.email || 'user@example.com'}</p>
                      </div>

                      <div className="profile-stats">
                        <div className="stat-item">
                          <span className="stat-label">Member for</span>
                          <span className="stat-value">{getMembershipDuration()}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Joined</span>
                          <span className="stat-value">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                          </span>
                        </div>
                      </div>

                      <button 
                        className="edit-button"
                        onClick={() => setIsEditing(true)}
                      >
                        ✏️ Edit Profile
                      </button>
                    </>
                  ) : (
                    <div className="edit-form">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={editData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={editData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="form-actions">
                        <button 
                          className="save-button"
                          onClick={handleSave}
                          disabled={loading}
                        >
                          {loading ? 'Saving...' : '💾 Save Changes'}
                        </button>
                        <button 
                          className="cancel-button"
                          onClick={handleCancel}
                          disabled={loading}
                        >
                          ❌ Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="profile-sections">
                <div className="section-card">
                  <h3>🎯 Beauty Goals</h3>
                  <div className="goals-list">
                    <div className="goal-item">
                      <span className="goal-icon">✨</span>
                      <span>Achieve healthy, glowing skin</span>
                    </div>
                    <div className="goal-item">
                      <span className="goal-icon">🌿</span>
                      <span>Build a consistent skincare routine</span>
                    </div>
                    <div className="goal-item">
                      <span className="goal-icon">💄</span>
                      <span>Learn new makeup techniques</span>
                    </div>
                  </div>
                </div>

                <div className="section-card">
                  <h3>📊 Activity Summary</h3>
                  <div className="activity-stats">
                    <div className="activity-item">
                      <span className="activity-number">
                        {JSON.parse(localStorage.getItem(`quizHistory_${user?.id}`) || '[]').length}
                      </span>
                      <span className="activity-label">Quizzes Completed</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-number">
                        {localStorage.getItem('beautyAppRoutine') ? '1' : '0'}
                      </span>
                      <span className="activity-label">Active Routines</span>
                    </div>
                    <div className="activity-item">
                      <span className="activity-number">0</span>
                      <span className="activity-label">Favorite Products</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="account-settings">
              <div className="settings-section">
                <h3>🔐 Password Settings</h3>
                <form onSubmit={handlePasswordUpdate} className="settings-form">
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength="6"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength="6"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="update-button"
                    disabled={loading || !passwordData.currentPassword || !passwordData.newPassword}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notification-settings">
              <h3>🔔 Notification Preferences</h3>
              <div className="notification-options">
                <div className="notification-item">
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                  <div className="notification-info">
                    <h4>Skincare Reminders</h4>
                    <p>Get reminded about your daily skincare routine</p>
                  </div>
                </div>
                <div className="notification-item">
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                  <div className="notification-info">
                    <h4>Product Recommendations</h4>
                    <p>Receive personalized product suggestions</p>
                  </div>
                </div>
                <div className="notification-item">
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                  <div className="notification-info">
                    <h4>Beauty Tips</h4>
                    <p>Weekly beauty tips and tutorials</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="privacy-settings">
              <h3>🔒 Privacy & Data</h3>
              <div className="privacy-options">
                <div className="privacy-item">
                  <h4>Data Usage</h4>
                  <p>Your quiz responses are used to provide personalized recommendations and are stored locally on your device.</p>
                </div>
                <div className="privacy-item">
                  <h4>Account Deletion</h4>
                  <p>Want to delete your account? This action cannot be undone.</p>
                  <button className="delete-button">Delete Account</button>
                </div>
                <div className="privacy-item">
                  <h4>Export Data</h4>
                  <p>Download a copy of your data including quiz history and preferences.</p>
                  <button className="export-button">Export Data</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;