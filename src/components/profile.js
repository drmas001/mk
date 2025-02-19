import { getCurrentUser } from '../auth.js';

export function initializeProfile() {
    const user = getCurrentUser();
    updateProfileUI(user);

    // Listen for auth changes
    window.netlifyIdentity.on('login', user => updateProfileUI(user));
    window.netlifyIdentity.on('logout', () => updateProfileUI(null));
}

function updateProfileUI(user) {
    const profileSection = document.getElementById('user-profile');
    if (!profileSection) return;

    if (user) {
        const email = user.email;
        const name = user.user_metadata?.full_name || email.split('@')[0];
        const avatar = user.user_metadata?.avatar_url || 'assets/default-avatar.png';

        profileSection.innerHTML = `
            <div class="profile-container">
                <div class="profile-header d-flex align-items-center">
                    <img src="${avatar}" alt="Profile" class="profile-avatar" />
                    <div class="profile-info ml-3">
                        <h3 class="profile-name">${name}</h3>
                        <p class="profile-email">${email}</p>
                    </div>
                </div>
                <div class="profile-actions mt-3">
                    <a class="btn btn-link sidebar-text d-flex align-items-center justify-content-start" href="/signout" onclick="handleSignOut(event)">
                        <svg class="svg-icon svg-lock" aria-hidden="true">
                            <use xlink:href="#svg-lock"></use>
                        </svg>
                        <span class="ml-3">Not you? Sign Out</span>
                    </a>
                </div>
            </div>
        `;
    } else {
        profileSection.innerHTML = `
            <div class="profile-container">
                <a href="/signin.html" class="btn btn-primary">Sign In</a>
            </div>
        `;
    }
}

// Handle sign out
window.handleSignOut = (event) => {
    if (event) event.preventDefault();
    window.netlifyIdentity.logout();
    window.location.href = '/signin.html';
};
