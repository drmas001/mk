// Get current user from auth.js
import { getCurrentUser } from './auth.js';

// Function to save user progress
function saveProgress(progressData) {
    const user = getCurrentUser();
    if (!user) {
        console.error('No user logged in');
        return;
    }

    // Create form data
    const formData = new FormData();
    formData.append('form-name', 'user-progress');
    formData.append('userId', user.id);
    formData.append('email', user.email);
    formData.append('timestamp', new Date().toISOString());
    formData.append('progress', JSON.stringify(progressData));

    // Submit to Netlify Forms
    fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    })
    .then(response => {
        if (response.ok) {
            console.log('Progress saved successfully');
        } else {
            console.error('Failed to save progress');
        }
    })
    .catch(error => console.error('Error saving progress:', error));
}

// Example usage:
// saveProgress({
//     currentPage: 5,
//     completedExercises: ['ex1', 'ex2'],
//     score: 85
// });

export { saveProgress };
