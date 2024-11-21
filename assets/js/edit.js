document.addEventListener('DOMContentLoaded', function () {
    const loadGameButton = document.getElementById('loadGameButton');
    const gameSelector = document.getElementById('gameSelector');
    const resultsList = document.getElementById('resultsList');
    let gamesData = [];
    let currentEditRow = null;

    // Lataa pelit JSON-tiedostosta
    fetch('/data/games.json')
        .then(response => response.json())
        .then(data => {
            gamesData = data.games;
            gamesData.forEach(game => {
                const option = document.createElement('option');
                option.value = game.ID;
                option.textContent = game.game_name.fi;
                gameSelector.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Virhe pelitietojen lataamisessa:', error);
        });

    // Lataa valittu peli
    loadGameButton.addEventListener('click', function () {
        const selectedGameId = gameSelector.value;
        const selectedGame = gamesData.find(game => String(game.ID) === String(selectedGameId));
        if (selectedGame) {
            displayGame(selectedGame);
        } else {
            console.error('Peliä ei löydy valitulla ID:llä:', selectedGameId);
        }
    });

    // Näytä pelin tiedot ja tulokset
    function displayGame(game) {
        document.getElementById('editGameName').innerText = game.game_name.fi;

        resultsList.innerHTML = ''; // Tyhjennä lista ennen lataamista

        game.hall_of_fame.forEach(score => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${score.username}</td>
                <td>${score.score}</td>
                <td>${new Date(score.date_time).toLocaleDateString()}</td>
                <td>
                    <button class="edit-btn">Muokkaa</button>
                    <button class="delete-btn">Poista</button>
                </td>
            `;
            resultsList.appendChild(row);
        });

        document.getElementById('editResults').style.display = 'block'; // Näytä tulokset
    }

    // Lisää tai päivitä tulos
    document.getElementById('addScoreForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const score = document.getElementById('score').value;
        const selectedGameId = gameSelector.value;
        const game = gamesData.find(game => String(game.ID) === String(selectedGameId));

        if (game) {
            if (currentEditRow) {
                // Päivitä olemassa oleva rivi
                const rowCells = currentEditRow.cells;
                rowCells[0].innerText = username;
                rowCells[1].innerText = score;
                currentEditRow = null; // Nollaa muokattava rivi
            } else {
                // Lisää uusi rivi ja päivitä dataan
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${username}</td>
                    <td>${score}</td>
                    <td>${new Date().toLocaleDateString()}</td>
                    <td>
                        <button class="edit-btn">Muokkaa</button>
                        <button class="delete-btn">Poista</button>
                    </td>
                `;
                resultsList.appendChild(newRow);

                game.hall_of_fame.push({
                    username,
                    score: parseInt(score),
                    date_time: new Date().toISOString()
                });
            }

            // Tyhjennä lomake
            document.getElementById('addScoreForm').reset();

            // Tallenna uusi tulos tiedostoon
            saveDataToFile();
        }
    });

    // Tallenna päivitetty JSON-tiedosto
    function saveDataToFile() {
        fetch('/data/games.json', {
            method: 'PUT', // Tai POST riippuen backendista
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ games: gamesData })
        })
        .then(response => {
            if (response.ok) {
                console.log('Tulokset tallennettu onnistuneesti.');
            } else {
                console.error('Virhe tallennettaessa tuloksia.');
            }
        })
        .catch(error => {
            console.error('Virhe tallennuksessa:', error);
        });
    }

    // Poista tai muokkaa tulosta
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const row = event.target.closest('tr');
            const username = row.cells[0].innerText;

            // Poista tulos datasta
            const selectedGameId = gameSelector.value;
            const game = gamesData.find(game => String(game.ID) === String(selectedGameId));
            if (game) {
                game.hall_of_fame = game.hall_of_fame.filter(score => score.username !== username);
                saveDataToFile(); // Päivitä tiedosto
            }

            row.remove(); // Poista rivi taulukosta
        } else if (event.target.classList.contains('edit-btn')) {
            const row = event.target.closest('tr');
            const username = row.cells[0].innerText;
            const score = row.cells[1].innerText;

            document.getElementById('username').value = username;
            document.getElementById('score').value = score;

            currentEditRow = row; // Aseta muokattava rivi
        }
    });
});
