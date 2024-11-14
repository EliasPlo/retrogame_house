document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Estetään lomakkeen oletustoiminta (sivun uudelleenlataus)

    // Haetaan lomakkeelta käyttäjänimi, salasana ja rooli
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    const messageElement = document.getElementById('message');

    // Lähetetään rekisteröintipyyntö palvelimelle
    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, role })
        });

        if (response.ok) {
            const data = await response.json();
            messageElement.textContent = 'Rekisteröinti onnistui! Voit nyt kirjautua sisään.';
            messageElement.style.color = 'green';
            setTimeout(() => {
                window.location.href = '/login.html'; // Ohjataan käyttäjä kirjautumissivulle
            }, 2000);
        } else {
            const data = await response.json();
            messageElement.textContent = data.message || 'Virhe rekisteröinnissä.';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        messageElement.textContent = 'Verkkovirhe. Yritä myöhemmin uudelleen.';
        messageElement.style.color = 'red';
    }
});
