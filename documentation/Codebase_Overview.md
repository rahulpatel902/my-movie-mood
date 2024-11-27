# 10. Codebase Overview

## 10.1 Application Flow

### 1. Authentication Flow
```
auth.html → auth.js → firebase.js → authCheck.js → index.html
```
- User starts at `auth.html` for login/signup
- `auth.js` handles authentication logic
- `firebase.js` manages Firebase connection
- `authCheck.js` verifies user session
- Redirects to `index.html` upon success

### 2. Main Application Flow
```
index.html → main.js → config.js → api.js → ui.js
```
- User interacts with mood selection in `index.html`
- `main.js` orchestrates core application logic
- `config.js` provides mood mappings and constants
- `api.js` fetches movie recommendations
- `ui.js` updates the display

## 10.2 Code Organization

### 1. Configuration and Setup
- **config.js**
  - API configurations (TMDB, Firebase)
  - Mood categories and mappings
  - Genre definitions
  - Base URLs and constants

- **firebase.js**
  - Firebase initialization
  - Authentication setup
  - Security rules

### 2. Authentication System
- **auth.html/css/js**
  - Login interface
  - Registration form
  - Password validation
  - Error handling
  - Session management

### 3. Core Application Logic
- **main.js**
  - Event listeners
  - Form handling
  - Movie update logic
  - Filter management

- **api.js**
  - TMDB API integration
  - Movie data fetching
  - Genre mapping
  - Search functionality

### 4. User Interface
- **ui.js**
  - DOM updates
  - Loading states
  - Error displays
  - Movie card rendering

- **style.css**
  - Glass-morphism effects
  - Responsive design
  - Animations
  - Layout structure

### 5. Utilities
- **utils.js**
  - Helper functions
  - Data formatting
  - Validation utilities

## 10.3 Key Features Implementation

### 1. Mood-Based Recommendation
```javascript
// config.js - Mood Category Structure
{
    '💫 Positive/Upbeat': {
        happy: { label: '😊 Happy', genres: [35, 10751] },
        excited: { label: '🤩 Excited', genres: [28, 12] },
        // ...
    }
}
```

### 2. Movie Filtering System
- Year range selection
- Format filtering (Animation/Live-action)
- Genre mapping based on moods
- Dynamic UI updates

### 3. Authentication Features
- Email/Password authentication
- Session persistence
- Secure routing
- Error handling

## 10.4 Development Environment

### 1. Build System
- Vite for development and building
- Environment variable management
- Asset optimization

### 2. Deployment
- Netlify configuration
- Build settings
- Redirect rules

## 10.5 File Structure
```
Project Final Main Deploy/
├── Authentication
│   ├── auth.html      # Login/Signup pages
│   ├── auth.css       # Authentication styles
│   └── auth.js        # Authentication logic
├── Core Application
│   ├── index.html     # Main application page
│   ├── main.js        # Application entry point
│   └── style.css      # Global styles
├── Source (src/)
│   ├── api.js         # TMDB integration
│   ├── config.js      # Application config
│   ├── firebase.js    # Firebase setup
│   ├── ui.js          # UI management
│   └── utils.js       # Utilities
└── Configuration
    ├── .env           # Environment variables
    ├── vite.config.js # Build configuration
    └── package.json   # Dependencies
```

## 10.6 Project Structure
```
Project Final Main Deploy/
├── src/
│   ├── api.js            # TMDB API integration and movie fetching logic
│   ├── authCheck.js      # Authentication state verification
│   ├── config.js         # Application configuration and constants
│   ├── firebase.js       # Firebase initialization and setup
│   ├── main.js          # Main application logic
│   ├── ui.js            # UI-related functions and handlers
│   └── utils.js         # Utility functions and helpers
├── public/
│   └── _redirects       # Netlify redirect rules
├── auth.html            # Authentication page
├── auth.css            # Authentication styles
├── auth.js             # Authentication logic
├── index.html          # Main application page
├── style.css          # Main application styles
├── main.js            # Entry point
├── vite.config.js     # Vite configuration
├── package.json       # Project dependencies and scripts
├── .env               # Environment variables
└── documentation/     # Project documentation
