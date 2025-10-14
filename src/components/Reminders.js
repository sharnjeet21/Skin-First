import React, { useState, useEffect } from 'react';
import './Reminders.css';

const Reminders = ({ user }) => {
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [morningTime, setMorningTime] = useState('08:00');
  const [eveningTime, setEveningTime] = useState('22:00');
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [editingMorning, setEditingMorning] = useState(false);
  const [editingEvening, setEditingEvening] = useState(false);

  useEffect(() => {
    // Load saved reminder settings
    const savedSettings = localStorage.getItem(`reminders_${user.id}`);
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setRemindersEnabled(settings.enabled || false);
      setMorningTime(settings.morningTime || '08:00');
      setEveningTime(settings.eveningTime || '22:00');
    }

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, [user.id]);

  const handleEnableReminders = async () => {
    if (!remindersEnabled) {
      // Request notification permission
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        
        if (permission === 'granted') {
          setRemindersEnabled(true);
          scheduleNotifications();
        }
      }
    } else {
      setRemindersEnabled(false);
      cancelNotifications();
    }
  };

  const scheduleNotifications = () => {
    // Schedule morning reminder
    new Notification('Morning Skincare Routine', {
      body: 'Time for your morning skincare routine! Start with cleansing.',
      icon: '/favicon.ico',
      tag: 'morning-reminder'
    });

    // Schedule evening reminder  
    new Notification('Evening Skincare Routine', {
      body: 'Time for your evening skincare routine! Don\'t forget your treatments.',
      icon: '/favicon.ico',
      tag: 'evening-reminder'
    });

    // In a real app, you'd use a service worker for persistent notifications
    console.log('Notifications scheduled for', morningTime, 'and', eveningTime);
  };

  const cancelNotifications = () => {
    // Cancel scheduled notifications
    console.log('Notifications cancelled');
  };

  const handleTimeChange = (type, time) => {
    if (type === 'morning') {
      setMorningTime(time);
      setEditingMorning(false);
    } else {
      setEveningTime(time);
      setEditingEvening(false);
    }
  };

  const handleEditClick = (type) => {
    if (type === 'morning') {
      setEditingMorning(true);
    } else {
      setEditingEvening(true);
    }
  };



  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${hour12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  // Save settings whenever they change
  useEffect(() => {
    const saveSettings = () => {
      const settings = {
        enabled: remindersEnabled,
        morningTime,
        eveningTime,
        userId: user.id
      };
      localStorage.setItem(`reminders_${user.id}`, JSON.stringify(settings));
    };
    
    saveSettings();
  }, [remindersEnabled, morningTime, eveningTime, user.id]);

  return (
    <div className="reminders-container">
      <div className="reminders-card">
        <div className="reminders-header">
          <h2>Skincare Reminders</h2>
          <p>Stay consistent with your routine by setting daily reminders.</p>
        </div>

        <div className="reminder-settings">
          <div className="reminder-item">
            <div className="reminder-label">
              <span className="reminder-title">Morning Reminder</span>
            </div>
            <div className="reminder-time">
              {editingMorning ? (
                <input
                  type="time"
                  value={morningTime}
                  onChange={(e) => handleTimeChange('morning', e.target.value)}
                  onBlur={() => setEditingMorning(false)}
                  className="time-input-visible"
                  autoFocus
                />
              ) : (
                <>
                  <div className="time-display" onClick={() => handleEditClick('morning')}>
                    {formatTime(morningTime)}
                  </div>
                  <button 
                    className="time-edit-button"
                    onClick={() => handleEditClick('morning')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="reminder-item">
            <div className="reminder-label">
              <span className="reminder-title">Evening Reminder</span>
            </div>
            <div className="reminder-time">
              {editingEvening ? (
                <input
                  type="time"
                  value={eveningTime}
                  onChange={(e) => handleTimeChange('evening', e.target.value)}
                  onBlur={() => setEditingEvening(false)}
                  className="time-input-visible"
                  autoFocus
                />
              ) : (
                <>
                  <div className="time-display" onClick={() => handleEditClick('evening')}>
                    {formatTime(eveningTime)}
                  </div>
                  <button 
                    className="time-edit-button"
                    onClick={() => handleEditClick('evening')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="enable-section">
          <div className="enable-reminders">
            <span className="enable-label">Enable Reminders</span>
            <button 
              className={`toggle-switch ${remindersEnabled ? 'enabled' : ''}`}
              onClick={handleEnableReminders}
            >
              <div className="toggle-slider"></div>
            </button>
          </div>
          
          {notificationPermission === 'denied' && (
            <p className="permission-note error">
              Permission denied. You need to enable notifications in your browser settings.
            </p>
          )}
          
          {notificationPermission === 'default' && (
            <p className="permission-note">
              Permission denied. You need to enable notifications in your browser settings.
            </p>
          )}
          
          {notificationPermission === 'granted' && remindersEnabled && (
            <p className="permission-note success">
              ✓ Reminders are active! You'll receive notifications at your set times.
            </p>
          )}
        </div>

        <div className="reminder-tips">
          <h3>Tips for Success</h3>
          <ul>
            <li>Set reminders for times when you're usually free</li>
            <li>Morning routine: Best done within 30 minutes of waking up</li>
            <li>Evening routine: Complete at least 1 hour before bedtime</li>
            <li>Consistency is key - try to stick to the same times daily</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reminders;