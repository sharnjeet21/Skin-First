import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ user, onLogout, currentPage, onNavigate }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('beautyAppUser');
    setShowProfileMenu(false);
    onLogout();
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleNavigation = (page) => {
    onNavigate(page);
    setShowProfileMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-text">Skin-First</span>
        </div>

        <div className="navbar-menu">

          <button
            className={`nav-item ${currentPage === 'quiz' ? 'active' : ''}`}
            onClick={() => handleNavigation('quiz')}
          >
            Take Quiz
          </button>
          <button
            className={`nav-item ${currentPage === 'routine' ? 'active' : ''}`}
            onClick={() => handleNavigation('routine')}
          >
            My Routine
          </button>
          <button
            className={`nav-item ${currentPage === 'dermatologist' ? 'active' : ''}`}
            onClick={() => handleNavigation('dermatologist')}
          >
            Find a Dermatologist
          </button>
          <button
            className={`nav-item ${currentPage === 'reminders' ? 'active' : ''}`}
            onClick={() => handleNavigation('reminders')}
          >
            Reminders
          </button>
          <button
            className={`nav-item ${currentPage === 'skincare101' ? 'active' : ''}`}
            onClick={() => handleNavigation('skincare101')}
          >
            Skincare 101
          </button>
        </div>

        <div className="navbar-profile">
          <button className="profile-button" onClick={toggleProfileMenu}>
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="profile-name">{user.name}</span>
            <span className="profile-arrow">▼</span>
          </button>

          {showProfileMenu && (
            <div className="profile-menu">
              <div className="profile-info">
                <div className="profile-avatar-large">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="profile-details">
                  <div className="profile-name-large">{user.name}</div>
                  <div className="profile-email">{user.email}</div>
                </div>
              </div>
              <div className="profile-actions">
                <button className="menu-item" onClick={() => handleNavigation('profile')}>
                  👤 My Profile
                </button>
                <button className="menu-item" onClick={() => handleNavigation('history')}>
                  📋 Quiz History
                </button>
                {/* <button className="menu-item" onClick={() => handleNavigation('favorites')}>
                  ❤️ Favorites
                </button> */}
                <hr className="menu-divider" />
                <button className="menu-item logout" onClick={handleLogout}>
                  🚪 Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;