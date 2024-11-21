document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');

    // Navigate to login.html when the login button is clicked
    if (loginButton) {
        loginButton.addEventListener('click', function () {
            window.location.href = 'login.html';
        });
    }

    // Handle the login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default behavior

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            fetch('data/users.json')  // Oikea polku tiedostoon
                .then(response => response.json())
                .then(data => {
                    const user = data.users.find(user => user.username === username && user.password === password);
                    
                    if (user) {
                        document.getElementById('loginMessage').innerText = 'Kirjautuminen onnistui!';
                        // Siirretään admin etusivulle tai muokkauksen sivulle
                        window.location.href = 'edit.html'; // Voit vaihtaa tämän muokkaussivulle
                    } else {
                        document.getElementById('loginMessage').innerText = 'Virheellinen käyttäjänimi tai salasana.';
                    }
                })
                .catch(error => {
                    console.error('Virhe käyttäjätietojen haussa:', error);
                });
        });
    }
});
