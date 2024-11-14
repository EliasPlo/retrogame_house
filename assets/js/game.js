async function fetchGameData() {
    try {
        const response = await fetch('games.json');
        const data = await response.json();
        const games = data.games;

        // Get the game ID from the URL
        document.addEventListener('DOMContentLoaded', function () {

        })
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('id');

/*fetch('/data/games.json')
.then(response => response.json())
.then(data => {

})*/
        const game = games.find(g => g.ID == gameId);
        if (game) {
            displayGameDetails(game);
            gameResults = game.hall_of_fame;
            displayResults(gameResults);
        } else {
            console.error('Game not found');
        }
    } catch (error) {
        console.error('Error fetching game data:', error);
    }
};

function displayGameDetails(game) {
    const gameTitle = document.getElementById('gameTitle');
    const gameImage = document.getElementById('gameImage');

    gameTitle.textContent = game.game_name.en;
    gameImage.src = game.game_image || 'placeholder.jpg';
    gameImage.alt = game.game_name.en;

    // You can add more game information here if needed
}

// Initialize
fetchGameData();
