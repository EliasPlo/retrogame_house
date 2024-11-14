// login.js

/*document.getElementById('loginForm').addEventListener('submit', async (event) => {
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
});*/

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                messageElement.textContent = 'Login successful!';
                messageElement.style.color = 'green';

                // Ohjataan index.html-sivulle onnistuneen kirjautumisen jälkeen
                setTimeout(() => {
                    if (data.role === 'admin') {
                        window.location.href = '/admin.html';
                    } else {
                        window.location.href = '/user.html'; // Käyttäjälle oma sivu
                    }
                }, 1000);
            } else {
                messageElement.textContent = 'Invalid username or password.';
                messageElement.style.color = 'red';
            }
        } else {
            messageElement.textContent = 'An error occurred during login. Please try again later.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        messageElement.textContent = 'Network error. Please check your connection.';
        messageElement.style.color = 'red';
    }
});

