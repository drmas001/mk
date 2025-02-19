// Initialize Netlify Identity
const netlifyIdentity = require('netlify-identity-widget');

// Login handler
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
        await netlifyIdentity.login(email, password);
        window.location.href = '/dashboard';
    } catch (error) {
        showError('Invalid credentials');
    }
});

// Google Login
document.getElementById('googleLogin')?.addEventListener('click', () => {
    netlifyIdentity.open('google');
});

// Signup handler
document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
        await netlifyIdentity.signup(email, password);
        window.location.href = '/verify-email';
    } catch (error) {
        showError(error.message);
    }
});

function showError(message) {
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    document.querySelector('.auth-container').prepend(errorEl);
}
