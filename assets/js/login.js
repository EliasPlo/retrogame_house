// login.js

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    try {
        const response = await fetch('http://localhost:3000/api/users');
        const users = await response.json();

        // Check if username and password match a user
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            messageDiv.innerText = 'Kirjautuminen onnistui!';
            messageDiv.style.color = 'green';
            // Optionally, redirect or store session data
        } else {
            messageDiv.innerText = 'Väärä käyttäjänimi tai salasana.';
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        messageDiv.innerText = 'Palvelinvirhe. Yritä uudelleen myöhemmin.';
        messageDiv.style.color = 'red';
        console.error('Error:', error);
    }
});
