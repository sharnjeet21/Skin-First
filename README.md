# � Skain-First Beauty Quiz App

A comprehensive AI-powered skincare application that provides personalized beauty recommendations, skincare routines, and dietary advice based on user preferences and skin type analysis.

## 📋 Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
- [Technologies Used](#technologies-used)

## ✨ Features

### 🎯 Core Features
- **AI-Powered Beauty Quiz** - Personalized skincare assessment
- **Product Recommendations** - 5 tailored product suggestions per quiz
- **Skincare Routines** - Morning and evening routine generation
- **Dietary Advice** - Skin-healthy food recommendations
- **Quiz History** - Complete history with reports for every attempt
- **User Profiles** - Account management with settings
- **Dermatologist Finder** - Locate skincare professionals (India-focused)
- **Skincare 101** - Educational content about skin types
- **Reminders** - Skincare routine notifications

### 🎨 UI/UX Features
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern Interface** - Clean, professional design
- **Interactive Elements** - Smooth animations and transitions
- **Consistent Theming** - Warm brown color scheme (#d4a574)

## 🔧 Prerequisites

Before running this project, make sure you have the following installed:

### Required Software
- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

### API Requirements
- **Google Gemini API Key** (for AI-powered recommendations)

## 📦 Installation

### Step 1: Clone the Repository
```bash
git clone <https://github.com/sharnjeet21/Skin-First.git>
cd Skin-First
```

### Step 2: Install Dependencies
```bash
npm install
```
*or if you prefer yarn:*
```bash
yarn install
```

### Step 3: Verify Installation
Check if all dependencies are installed correctly:
```bash
npm list --depth=0
```

## ⚙️ Configuration

### Step 1: Environment Variables Setup
1. Create a `.env` file in the root directory:
```bash
touch .env
```

2. Add your Google Gemini API key to the `.env` file:
```env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

### Step 2: Get Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key and paste it in your `.env` file

### Step 3: Verify Configuration
The `.env` file should look like this:
```env
REACT_APP_GEMINI_API_KEY=AIzaSyC...your_actual_api_key_here
```

## 🚀 Running the Application

### Development Mode
Start the development server:
```bash
npm start
```
*or with yarn:*
```bash
yarn start
```

The application will open automatically in your browser at:
```
http://localhost:3000
```

### Production Build
To create a production build:
```bash
npm run build
```

To serve the production build locally:
```bash
npm install -g serve
serve -s build
```

## 📁 Project Structure

```
beauty-quiz-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Auth.js              # User authentication
│   │   ├── BeautyQuiz.js        # Main quiz component
│   │   ├── FindDermatologist.js # Dermatologist finder
│   │   ├── MyRoutine.js         # Skincare routine display
│   │   ├── Navbar.js            # Navigation component
│   │   ├── Profile.js           # User profile & settings
│   │   ├── ProductRecommendations.js # Quiz results
│   │   ├── QuizHistory.js       # Quiz history & reports
│   │   ├── Reminders.js         # Routine reminders
│   │   ├── Skincare101.js       # Educational content
│   │   └── [CSS files]          # Component styles
│   ├── App.js                   # Main application component
│   ├── App.css                  # Global styles
│   └── index.js                 # Application entry point
├── .env                         # Environment variables
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## 📜 Available Scripts

### Development Scripts
```bash
npm start          # Start development server
npm test           # Run test suite
npm run build      # Create production build
npm run eject      # Eject from Create React App (irreversible)
```

### Custom Scripts
```bash
npm run lint       # Run ESLint (if configured)
npm run format     # Format code with Prettier (if configured)
```

## 🔍 Troubleshooting

### Common Issues and Solutions

#### 1. API Key Issues
**Problem:** "API Key not found" or AI features not working
**Solution:**
- Verify `.env` file exists in root directory
- Check API key format: `REACT_APP_GEMINI_API_KEY=your_key`
- Restart development server after adding API key
- Ensure no spaces around the `=` sign

#### 2. Dependencies Issues
**Problem:** Module not found errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 3. Port Already in Use
**Problem:** Port 3000 is already in use
**Solution:**
- Kill the process using port 3000, or
- Start on a different port:
```bash
PORT=3001 npm start
```

#### 4. Build Issues
**Problem:** Build fails or warnings
**Solution:**
```bash
npm run build 2>&1 | tee build.log
# Check build.log for specific errors
```

#### 5. Browser Compatibility
**Problem:** App not working in older browsers
**Solution:**
- Use modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Clear browser cache and cookies
- Disable browser extensions that might interfere

### Performance Tips
- **Slow Loading:** Check internet connection for API calls
- **Memory Issues:** Close unused browser tabs
- **Mobile Performance:** Use Chrome DevTools mobile simulation for testing

## 🛠️ Technologies Used

### Frontend Framework
- **React 18** - Modern React with hooks
- **Create React App** - Project setup and build tools
- **CSS3** - Custom styling with modern features

### AI Integration
- **Google Gemini AI** - Product recommendations and routine generation
- **Natural Language Processing** - Quiz answer analysis

### Data Storage
- **localStorage** - Client-side data persistence
- **JSON** - Data format for storage and API communication

### Development Tools
- **ES6+** - Modern JavaScript features
- **JSX** - React component syntax
- **CSS Grid & Flexbox** - Responsive layouts
- **Media Queries** - Mobile-first responsive design

## 🎯 Getting Started Guide

### For First-Time Users:
1. **Clone and Install** (Steps 1-2 above)
2. **Get API Key** (Configuration Step 2)
3. **Set Environment Variables** (Configuration Step 1)
4. **Start Development Server** (`npm start`)
5. **Open Browser** (http://localhost:3000)
6. **Create Account** (Use the signup form)
7. **Take Quiz** (Follow the guided quiz process)
8. **Explore Features** (Profile, History, Skincare 101, etc.)

### For Developers:
1. **Review Project Structure** (See above)
2. **Check Component Architecture** (src/components/)
3. **Understand State Management** (App.js)
4. **Review Styling Approach** (Component-specific CSS)
5. **Test API Integration** (Quiz functionality)

## 📞 Support

If you encounter any issues:
1. Check this README for common solutions
2. Verify all prerequisites are installed
3. Ensure API key is correctly configured
4. Check browser console for error messages
5. Try clearing browser cache and localStorage

## 🔄 Updates and Maintenance

### Keeping Dependencies Updated:
```bash
npm outdated                    # Check for outdated packages
npm update                      # Update to latest compatible versions
npm audit                       # Check for security vulnerabilities
npm audit fix                   # Fix security issues automatically
```

### Regular Maintenance:
- Update API keys if they expire
- Clear localStorage if testing new features
- Monitor browser console for warnings
- Keep Node.js and npm updated

---

**Happy Coding! 🎉**

*For additional support or feature requests, please refer to the project documentation or contact the development team.*