document.addEventListener('DOMContentLoaded', () => {
    const usernameDisplay = document.getElementById('usernameDisplay');
    const logoutButton = document.getElementById('logoutButton');

    fetch('/api/session')
        .then(response => response.json())
        .then(data => {
            if (data.user) {
                usernameDisplay.textContent = `Welcome, ${data.user.username}!`;
                logoutButton.style.display = 'inline';
            } else {
                window.location.href = '/login.html';
            }
        });

    // Uloskirjautuminen
    logoutButton.addEventListener('click', async () => {
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/login.html';
    });
});
