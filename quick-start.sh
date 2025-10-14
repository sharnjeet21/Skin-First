#!/bin/bash

# 🚀 Quick Start Script for Beauty Quiz App
# Simple script to install dependencies and run the project

echo "🌟 Beauty Quiz App - Quick Start"
echo "================================"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the beauty-quiz-app directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  Creating .env file..."
    echo "REACT_APP_GEMINI_API_KEY=your_api_key_here" > .env
    echo "📝 Please update .env file with your Google Gemini API key"
    echo "   Visit: https://makersuite.google.com/app/apikey"
fi

echo "✅ Setup complete!"
echo "🚀 Starting the application..."
echo ""
echo "The app will open at: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""

# Start the application
npm start