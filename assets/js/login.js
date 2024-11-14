// login.js

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Estetään lomakkeen oletustoiminta (sivun uudelleenlataus)

    // Haetaan lomakkeelta käyttäjänimi ja salasana
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    try {
        // Lähetetään kirjautumispyyntö palvelimelle
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        // Tarkistetaan palvelimen vastaus
        if (response.ok) {
            const data = await response.json();
            
            // Tarkistetaan, että login onnistui
            if (data.success) {
                messageElement.textContent = 'Kirjautuminen onnistui!';
                messageElement.style.color = 'green';

                // Uudelleenohjaus edit.html-sivulle kirjautumisen jälkeen
                setTimeout(() => {
                    window.location.href = 'edit.html'; // Ohjataan edit-sivulle
                }, 1000); // Pieni viive ennen uudelleenohjausta
            } else {
                messageElement.textContent = 'Virheellinen käyttäjänimi tai salasana.';
                messageElement.style.color = 'red';
            }
        } else {
            messageElement.textContent = 'Verkkovirhe. Yritä myöhemmin uudelleen.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        messageElement.textContent = 'Verkkovirhe. Yritä myöhemmin uudelleen.';
        messageElement.style.color = 'red';
    }
});


/*
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
                        window.location.href = '/index.html'; // Käyttäjälle oma sivu
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
*/
