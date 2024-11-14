async function fetchGames() {
    try {
        const response = await fetch('games.json');
        const data = await response.json();
        displayGames(data.games);
    } catch (error) {
        console.error("Error fetching games:", error);
    }
}

function displayGames(games) {
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = ''; // Clear existing content

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'card';

        const gameImage = game.game_image || 'placeholder.jpg'; // Use a placeholder image if none is available
        card.innerHTML = `
            <img src="${gameImage}" alt="${game.game_name.en}">
            <h2>${game.game_name.en}</h2>
            <p>${game.description.en}</p>
            <p><strong>Maker:</strong> ${game.maker}</p>
            <p><strong>Genre:</strong> ${game.genre}</p>
            <p><strong>Year:</strong> ${game.launched_year}</p>
        `;

        // Add a click event to the card
        card.addEventListener('click', () => {
            window.location.href = `peli.html?id=${game.ID}`;
        });

        gameGrid.appendChild(card);
    });
}

// Initialize the fetch when the script loads
fetchGames();
