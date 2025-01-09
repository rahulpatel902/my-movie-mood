import { auth } from './firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

// Check if user is authenticated
function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        if (!user && !window.location.pathname.includes('auth.html')) {
            // No user is signed in, redirect to auth page
            window.location.href = '/auth.html';
        } else if (user) {
            // Update user name in UI
            updateUserNameDisplay(user);
        }
    });
}

// Update user name display in the UI
function updateUserNameDisplay(user) {
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        // Use display name if available, otherwise use email
        const displayName = user.displayName || user.email.split('@')[0];
        userNameElement.textContent = displayName;
    }
}

// Run auth check
checkAuth();
