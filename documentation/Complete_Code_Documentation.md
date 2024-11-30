# Complete Code Documentation

## 1. Authentication System

### 1.1 auth.js - Authentication Handler
```javascript
// Imports and Dependencies
import { auth } from './src/firebase.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence
} from 'firebase/auth';
```

#### Functions:

1. **Event Listeners Setup**
```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');
    // ... more selectors
});
```

2. **Loading State Management**
```javascript
function showLoading() {
    loadingOverlay.classList.add('active');
    document.querySelectorAll('.auth-btn')
        .forEach(btn => btn.classList.add('loading'));
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
    document.querySelectorAll('.auth-btn')
        .forEach(btn => btn.classList.remove('loading'));
}
```

3. **Password Strength Checker**
```javascript
function checkPasswordStrength(password) {
    let score = 0;
    const feedback = [];
    
    // Length check
    if (password.length >= 8) score++;
    else feedback.push('Password should be at least 8 characters');
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score++;
    else feedback.push('Include uppercase letters');
    
    if (/[a-z]/.test(password)) score++;
    else feedback.push('Include lowercase letters');
    
    if (/[0-9]/.test(password)) score++;
    else feedback.push('Include numbers');
    
    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push('Include special characters');
    
    return { score, feedback };
}
```

4. **Error Handling**
```javascript
function getErrorMessage(errorCode) {
    const errorMessages = {
        'auth/email-already-in-use': 'Email already registered',
        'auth/invalid-email': 'Invalid email address',
        'auth/operation-not-allowed': 'Operation not allowed',
        'auth/weak-password': 'Password is too weak',
        'auth/user-disabled': 'Account has been disabled',
        'auth/user-not-found': 'Email not registered',
        'auth/wrong-password': 'Incorrect password',
        'auth/too-many-requests': 'Too many attempts. Try again later',
        'auth/network-request-failed': 'Network error. Check your connection'
    };
    return errorMessages[errorCode] || 'An error occurred. Please try again';
}
```

5. **Form Validation**
```javascript
function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    
    if (!value) return false;
    
    if (type === 'email') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    
    if (type === 'password') {
        return value.length >= 8;
    }
    
    return true;
}
```

### 1.2 firebase.js - Firebase Configuration
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // ... other config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

## 2. Main Application

### 2.1 api.js - TMDB API Integration

#### Cache System
```javascript
const cache = {
    genres: null,
    movies: new Map(),
    details: new Map(),
    
    save() {
        const data = {
            genres: this.genres,
            movies: Array.from(this.movies.entries()),
            details: Array.from(this.details.entries()),
            timestamp: Date.now()
        };
        localStorage.setItem('movieCache', JSON.stringify(data));
    },
    
    load() {
        const data = JSON.parse(localStorage.getItem('movieCache'));
        if (data && (Date.now() - data.timestamp) < CACHE_DURATION) {
            this.genres = data.genres;
            this.movies = new Map(data.movies);
            this.details = new Map(data.details);
            return true;
        }
        return false;
    }
};
```

#### API Functions

1. **Content Filtering**
```javascript
function containsAdultContent(overview) {
    const adultKeywords = [
        'explicit', 'nude', 'sex', 'adult',
        'erotic', 'porn', 'xxx', 'mature'
    ];
    const pattern = new RegExp(adultKeywords.join('|'), 'i');
    return pattern.test(overview);
}
```

2. **API Request Handler**
```javascript
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
        }
    }
}
```

3. **Movie Details Fetcher**
```javascript
async function getMovieDetails(movieId) {
    if (cache.details.has(movieId)) {
        return cache.details.get(movieId);
    }

    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`;
    
    try {
        const data = await fetchWithRetry(url);
        cache.details.set(movieId, data);
        cache.save();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
}
```

4. **Random Movie Selector**
```javascript
async function getRandomMovie(genreIds, format, yearStart, yearEnd) {
    const url = `${BASE_URL}/discover/movie`;
    const params = new URLSearchParams({
        api_key: API_KEY,
        with_genres: genreIds.join(','),
        'primary_release_date.gte': `${yearStart}-01-01`,
        'primary_release_date.lte': `${yearEnd}-12-31`,
        include_adult: false,
        with_original_language: 'en',
        page: Math.floor(Math.random() * 5) + 1
    });

    try {
        const data = await fetchWithRetry(`${url}?${params}`);
        const movies = data.results.filter(movie => 
            !containsAdultContent(movie.overview) &&
            (format === 'all' || 
             (format === 'animation' && movie.genre_ids.includes(16)) ||
             (format === 'live-action' && !movie.genre_ids.includes(16)))
        );

        if (movies.length === 0) return null;
        return movies[Math.floor(Math.random() * movies.length)];
    } catch (error) {
        console.error('Error fetching random movie:', error);
        return null;
    }
}
```

### 2.2 config.js - Application Configuration

```javascript
// API Configuration
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Mood Categories
export const moodCategories = {
    '💫 Positive/Upbeat': {
        happy: { label: '😊 Happy', genres: [35, 10751] },
        excited: { label: '🤩 Excited', genres: [28, 12] },
        optimistic: { label: '⭐ Optimistic', genres: [18, 10751] }
        // ... more moods
    },
    '🤔 Reflective': {
        nostalgic: { label: '🌅 Nostalgic', genres: [18, 36] },
        thoughtful: { label: '🤔 Thoughtful', genres: [18, 9648] }
        // ... more moods
    }
    // ... more categories
};
```

### 2.3 ui.js - User Interface Management

```javascript
// Movie Display Updates
export function updateMovieUI(movieData) {
    const movieCard = document.querySelector('.movie-card');
    const template = `
        <img src="${IMG_BASE_URL}${movieData.poster_path}" alt="${movieData.title}">
        <div class="movie-info">
            <h2>${movieData.title}</h2>
            <p class="year">${movieData.release_date.split('-')[0]}</p>
            <p class="overview">${movieData.overview}</p>
            <div class="rating">⭐ ${movieData.vote_average.toFixed(1)}</div>
        </div>
    `;
    movieCard.innerHTML = template;
}

// Loading State Management
export function toggleLoadingState(isLoading) {
    const loader = document.querySelector('.loader');
    const movieCard = document.querySelector('.movie-card');
    
    loader.style.display = isLoading ? 'block' : 'none';
    movieCard.style.opacity = isLoading ? '0.5' : '1';
}

// Error Display
export function showError(message) {
    const errorContainer = document.querySelector('.error-container');
    errorContainer.textContent = message;
    errorContainer.style.display = 'block';
    setTimeout(() => {
        errorContainer.style.display = 'none';
    }, 5000);
}
```

### 2.4 utils.js - Utility Functions

```javascript
// Date Formatting
export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Genre Name Mapping
export function getGenreNames(genreIds, genreList) {
    return genreIds
        .map(id => genreList.find(g => g.id === id)?.name)
        .filter(Boolean)
        .join(', ');
}

// Random Selection
export function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Error Handler
export function handleError(error, fallbackMessage = 'An error occurred') {
    console.error(error);
    return {
        error: true,
        message: error.message || fallbackMessage
    };
}
```

## 3. Main Application Entry Point (main.js)

```javascript
import { auth } from './src/firebase.js';
import { moodCategories } from './src/config.js';
import { getRandomMovie, getGenres } from './src/api.js';
import { updateMovieUI, toggleLoadingState } from './src/ui.js';

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
    // Setup UI Elements
    const primaryMoodSelect = document.getElementById('primaryMoodSelect');
    const subMoodSelect = document.getElementById('subMoodSelect');
    const formatSelect = document.getElementById('formatSelect');
    const yearStart = document.getElementById('yearStart');
    const yearEnd = document.getElementById('yearEnd');

    // Initialize Mood Selection
    Object.keys(moodCategories).forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        primaryMoodSelect.appendChild(option);
    });

    // Event Handlers
    primaryMoodSelect.addEventListener('change', updateSubMoods);
    document.getElementById('findMovie').addEventListener('click', updateMovie);
    
    // Initialize year range
    const currentYear = new Date().getFullYear();
    yearStart.max = currentYear;
    yearEnd.max = currentYear;
});

// Movie Update Handler
async function updateMovie() {
    toggleLoadingState(true);
    try {
        const primaryMood = primaryMoodSelect.value;
        const subMood = subMoodSelect.value;
        const format = formatSelect.value;
        const yearStartValue = yearStart.value;
        const yearEndValue = yearEnd.value;

        const genres = moodCategories[primaryMood][subMood].genres;
        const movie = await getRandomMovie(genres, format, yearStartValue, yearEndValue);
        
        if (movie) {
            updateMovieUI(movie);
        } else {
            showError('No movies found matching your criteria');
        }
    } catch (error) {
        showError('Error finding movie. Please try again.');
    } finally {
        toggleLoadingState(false);
    }
}
```

This documentation provides a complete breakdown of all code files and their functions in your Movie Mood application. Each section includes:
- Full code examples
- Function explanations
- Implementation details
- Error handling
- Integration points

Would you like me to expand on any particular section or add more details about specific functionality?
