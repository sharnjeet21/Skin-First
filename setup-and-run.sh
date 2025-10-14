#!/bin/bash

# 🌟 Skin-First - Automated Setup & Run Script
# This script will automatically set up and run the Skin-First application

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}================================${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check Node.js version
check_node_version() {
    if command_exists node; then
        NODE_VERSION=$(node --version | cut -d'v' -f2)
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1)
        if [ "$MAJOR_VERSION" -ge 16 ]; then
            return 0
        else
            return 1
        fi
    else
        return 1
    fi
}

# Function to install Node.js (macOS specific)
install_nodejs_macos() {
    print_status "Installing Node.js using Homebrew..."
    if command_exists brew; then
        brew install node
    else
        print_error "Homebrew not found. Please install Homebrew first:"
        echo "Visit: https://brew.sh/"
        exit 1
    fi
}

# Function to check and setup API key
setup_api_key() {
    if [ ! -f ".env" ]; then
        print_warning ".env file not found. Creating one..."
        touch .env
    fi

    if ! grep -q "REACT_APP_GEMINI_API_KEY" .env; then
        print_warning "Google Gemini API key not found in .env file."
        echo ""
        echo -e "${CYAN}To get your Google Gemini API key:${NC}"
        echo "1. Visit: https://makersuite.google.com/app/apikey"
        echo "2. Sign in with your Google account"
        echo "3. Create a new API key"
        echo "4. Copy the API key"
        echo ""
        
        read -p "Enter your Google Gemini API key (or press Enter to skip): " api_key
        
        if [ ! -z "$api_key" ]; then
            echo "REACT_APP_GEMINI_API_KEY=$api_key" >> .env
            print_success "API key added to .env file"
        else
            echo "REACT_APP_GEMINI_API_KEY=your_api_key_here" >> .env
            print_warning "Placeholder API key added. Please update .env file with your actual API key."
        fi
    else
        print_success "API key found in .env file"
    fi
}

# Function to clean install dependencies
clean_install() {
    print_status "Cleaning previous installations..."
    if [ -d "node_modules" ]; then
        rm -rf node_modules
        print_success "Removed node_modules directory"
    fi
    
    if [ -f "package-lock.json" ]; then
        rm package-lock.json
        print_success "Removed package-lock.json"
    fi
    
    print_status "Installing dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
}

# Function to run the application
run_application() {
    print_status "Starting the development server..."
    echo ""
    echo -e "${CYAN}The application will open in your browser at:${NC}"
    echo -e "${CYAN}http://localhost:3000${NC}"
    echo ""
    echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
    echo ""
    
    # Start the development server
    npm start
}

# Main execution starts here
clear
print_header "🌟 SKIN-FIRST SETUP 🌟"

echo -e "${CYAN}Welcome to the automated setup script!${NC}"
echo -e "${CYAN}This script will set up and run Skin-First.${NC}"
echo ""

# Step 1: Check prerequisites
print_header "📋 CHECKING PREREQUISITES"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the Skin-First directory."
    exit 1
fi

# Check Node.js
print_status "Checking Node.js installation..."
if check_node_version; then
    NODE_VERSION=$(node --version)
    print_success "Node.js $NODE_VERSION is installed"
else
    print_warning "Node.js 16+ is required"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        read -p "Would you like to install Node.js using Homebrew? (y/n): " install_node
        if [ "$install_node" = "y" ] || [ "$install_node" = "Y" ]; then
            install_nodejs_macos
        else
            print_error "Please install Node.js 16+ manually and run this script again."
            echo "Visit: https://nodejs.org/"
            exit 1
        fi
    else
        print_error "Please install Node.js 16+ and run this script again."
        echo "Visit: https://nodejs.org/"
        exit 1
    fi
fi

# Check npm
print_status "Checking npm installation..."
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    print_success "npm $NPM_VERSION is installed"
else
    print_error "npm is not installed. Please install Node.js which includes npm."
    exit 1
fi

# Step 2: Setup environment
print_header "⚙️ SETTING UP ENVIRONMENT"
setup_api_key

# Step 3: Install dependencies
print_header "📦 INSTALLING DEPENDENCIES"

# Ask user if they want to do a clean install
read -p "Do you want to perform a clean install? (recommended) (y/n): " clean_install_choice
if [ "$clean_install_choice" = "y" ] || [ "$clean_install_choice" = "Y" ] || [ "$clean_install_choice" = "" ]; then
    clean_install
else
    print_status "Installing dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies. Try running with clean install."
        exit 1
    fi
fi

# Step 4: Verify installation
print_header "🔍 VERIFYING INSTALLATION"

print_status "Checking installed packages..."
npm list --depth=0 > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_success "All packages are properly installed"
else
    print_warning "Some packages may have issues, but continuing..."
fi

# Check if .env file has API key
if grep -q "your_api_key_here" .env 2>/dev/null; then
    print_warning "Please update your API key in .env file for full functionality"
fi

# Step 5: Final setup complete
print_header "✅ SETUP COMPLETE"

echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo ""
echo -e "${CYAN}Project Features:${NC}"
echo "• AI-Powered Skincare Quiz"
echo "• Personalized Product Recommendations"
echo "• Skincare Routine Generation"
echo "• Quiz History & Reports"
echo "• Dermatologist Finder (India-focused)"
echo "• Skincare 101 Educational Content"
echo "• User Profile & Settings"
echo ""

# Ask if user wants to start the application
read -p "Would you like to start the application now? (y/n): " start_app
if [ "$start_app" = "y" ] || [ "$start_app" = "Y" ] || [ "$start_app" = "" ]; then
    print_header "🚀 STARTING APPLICATION"
    run_application
else
    echo ""
    print_success "Setup complete! To start the application later, run:"
    echo -e "${CYAN}npm start${NC}"
    echo ""
    echo -e "${YELLOW}Don't forget to update your API key in .env file if you haven't already!${NC}"
fi

# End of script