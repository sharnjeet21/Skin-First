const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Database setup
const dbPath = path.join(__dirname, 'beauty_app.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Quiz results table
  db.run(`CREATE TABLE IF NOT EXISTS quiz_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    quiz_answers TEXT NOT NULL,
    recommendations TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);

  // User favorites table
  db.run(`CREATE TABLE IF NOT EXISTS user_favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_brand TEXT NOT NULL,
    product_name TEXT NOT NULL,
    product_description TEXT,
    product_category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`);
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (row) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      db.run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Failed to create user' });
          }

          // Generate JWT token
          const token = jwt.sign(
            { userId: this.lastID, email: email },
            JWT_SECRET,
            { expiresIn: '7d' }
          );

          res.status(201).json({
            message: 'User created successfully',
            token: token,
            user: {
              id: this.lastID,
              name: name,
              email: email
            }
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login user
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user profile
app.get('/api/user/profile', authenticateToken, (req, res) => {
  db.get('SELECT id, name, email, created_at FROM users WHERE id = ?', [req.user.userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  });
});

// Save quiz results
app.post('/api/quiz/save-results', authenticateToken, (req, res) => {
  try {
    const { quizAnswers, recommendations } = req.body;

    db.run(
      'INSERT INTO quiz_results (user_id, quiz_answers, recommendations) VALUES (?, ?, ?)',
      [req.user.userId, JSON.stringify(quizAnswers), JSON.stringify(recommendations)],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to save quiz results' });
        }

        res.json({
          message: 'Quiz results saved successfully',
          resultId: this.lastID
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's quiz history
app.get('/api/quiz/history', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM quiz_results WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      const formattedResults = results.map(result => ({
        id: result.id,
        quizAnswers: JSON.parse(result.quiz_answers),
        recommendations: JSON.parse(result.recommendations),
        createdAt: result.created_at
      }));

      res.json({ history: formattedResults });
    }
  );
});

// Add product to favorites
app.post('/api/favorites/add', authenticateToken, (req, res) => {
  try {
    const { brand, product, description, category } = req.body;

    db.run(
      'INSERT INTO user_favorites (user_id, product_brand, product_name, product_description, product_category) VALUES (?, ?, ?, ?, ?)',
      [req.user.userId, brand, product, description, category],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to add to favorites' });
        }

        res.json({
          message: 'Product added to favorites',
          favoriteId: this.lastID
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's favorites
app.get('/api/favorites', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM user_favorites WHERE user_id = ? ORDER BY created_at DESC',
    [req.user.userId],
    (err, favorites) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      res.json({ favorites });
    }
  );
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Beauty Quiz API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});