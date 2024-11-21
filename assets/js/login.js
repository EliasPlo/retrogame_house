// login.js

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    // Handle the login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Estää oletustoiminnon

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Hae käyttäjätiedot users.json-tiedostosta
            fetch('/data/users.json')
                .then(response => response.json())
                .then(data => {
                    const user = data.users.find(user => user.username === username && user.password === password);
                    
                    if (user) {
                        document.getElementById('loginMessage').innerText = 'Kirjautuminen onnistui!';
                        // Tallenna käyttäjätiedot localStorageen
                        localStorage.setItem('loggedInUser', JSON.stringify(user));
                        // Siirry edit.html-sivulle
                        window.location.href = 'edit.html'; 
                    } else {
                        document.getElementById('loginMessage').innerText = 'Virheellinen käyttäjänimi tai salasana.';
                    }
                })
                .catch(error => {
                    console.error('Virhe käyttäjätietojen haussa:', error);
                    document.getElementById('loginMessage').innerText = 'Virhe tietojen hakemisessa.';
                });
        });
    }
});


/*document.getElementById('loginForm').addEventListener('submit', async function (event) {
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
