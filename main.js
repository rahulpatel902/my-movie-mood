import { auth } from './src/firebase.js';
import { signOut } from 'firebase/auth';
import { moodCategories } from './src/config.js';
import { getRandomMovie, getGenres } from './src/api.js';
import { updateMovieUI, toggleLoadingState } from './src/ui.js';

// DOM element references for form controls
const primaryMoodSelect = document.getElementById('primaryMoodSelect');
const subMoodSelect = document.getElementById('subMoodSelect');
const formatSelect = document.getElementById('formatSelect');
const yearStart = document.getElementById('yearStart');
const yearEnd = document.getElementById('yearEnd');

// Initialize year range inputs
const currentYear = new Date().getFullYear();
yearStart.max = currentYear;
yearEnd.max = currentYear;

// Initialize authentication state and UI
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Setup logout button handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await signOut(auth);
                window.location.href = '/auth.html';
            } catch (error) {
                console.error('Logout error:', error);
            }
        });
    }

    // Monitor auth state
    auth.onAuthStateChanged((user) => {
        if (user) {
            // Update UI for logged in user
            const userNameElement = document.getElementById('userName');
            if (userNameElement) {
                userNameElement.textContent = user.displayName || user.email;
            }
        } else if (!window.location.pathname.includes('auth.html')) {
            // Redirect to auth page if not authenticated
            window.location.href = '/auth.html';
        }
    });
});

// Populate mood selectors
Object.keys(moodCategories).forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    const match = category.match(/^(.*?)\s*([\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])$/u);
    option.textContent = match ? `${match[2]} ${match[1].trim()}` : category;
    primaryMoodSelect.appendChild(option);
});

// Handle primary mood selection
primaryMoodSelect.addEventListener('change', (e) => {
    const primaryMood = e.target.value;
    subMoodSelect.innerHTML = '<option value="">Select specific mood...</option>';
    
    if (primaryMood) {
        const subMoods = moodCategories[primaryMood];
        Object.entries(subMoods).forEach(([key, { label }]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = label;
            subMoodSelect.appendChild(option);
        });
        subMoodSelect.disabled = false;
    } else {
        subMoodSelect.disabled = true;
    }
});

// Year range validation
yearStart.addEventListener('change', () => {
    if (yearEnd.value && parseInt(yearStart.value) > parseInt(yearEnd.value)) {
        yearEnd.value = yearStart.value;
    }
});

yearEnd.addEventListener('change', () => {
    if (yearStart.value && parseInt(yearEnd.value) < parseInt(yearStart.value)) {
        yearStart.value = yearEnd.value;
    }
});

// Movie update handler
async function updateMovie(primaryMood, subMood) {
    if (!primaryMood || !subMood) return;
    
    toggleLoadingState(true);
    
    const { genres } = moodCategories[primaryMood][subMood];
    const format = formatSelect.value;
    const yearStartValue = yearStart.value ? parseInt(yearStart.value) : null;
    const yearEndValue = yearEnd.value ? parseInt(yearEnd.value) : null;
    
    const movie = await getRandomMovie(genres, format, yearStartValue, yearEndValue);
    const genreList = await getGenres();
    
    if (!movie) {
        alert('No movie found with the selected filters. Please try different criteria.');
        toggleLoadingState(false);
        return;
    }
    
    updateMovieUI(movie, genreList);
    toggleLoadingState(false);
}

// Add change event listeners to filters
[subMoodSelect, formatSelect, yearStart, yearEnd].forEach(element => {
    element.addEventListener('change', () => {
        const primaryMood = primaryMoodSelect.value;
        const subMood = subMoodSelect.value;
        if (primaryMood && subMood) {
            updateMovie(primaryMood, subMood);
        }
    });
});