// Initialize Netlify Identity
const netlifyIdentity = window.netlifyIdentity;

// Initialize the widget
if (netlifyIdentity) {
  netlifyIdentity.init();
}

// User state management
let currentUser = null;

netlifyIdentity.on('login', user => {
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
  updateUI();
  window.location.href = '/index.html';
});

netlifyIdentity.on('logout', () => {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateUI();
  window.location.href = '/signin.html';
});

function updateUI() {
  const userEmail = document.getElementById('user-email');
  const signOutBtn = document.querySelector('.sign-out-btn');
  const signInBtn = document.querySelector('.sign-in-btn');

  if (currentUser) {
    userEmail.textContent = currentUser.email;
    signOutBtn.style.display = 'inline-block';
    signInBtn.style.display = 'none';
  } else {
    userEmail.textContent = '';
    signOutBtn.style.display = 'none';
    signInBtn.style.display = 'inline-block';
  }
}

window.handleLogin = () => netlifyIdentity.open('login');
window.handleSignOut = () => netlifyIdentity.logout();

// Check if user is already logged in
const storedUser = localStorage.getItem('currentUser');
if (storedUser) {
  currentUser = JSON.parse(storedUser);
  updateUI();
}

export function getCurrentUser() {
  return currentUser;
}
