let gameResults = [];

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('id');
  // const gameId = 1; // Uncomment if testing without URL parameters

  fetch('data/games.json')
    .then(response => response.json())
    .then(data => {
      const game = data.games.find(game => game.ID == gameId);
      if (game) {
        displayGameDetails(game);
        gameResults = game.hall_of_fame;
        displayResults(gameResults);
        displayGameDescription(game);
      } else {
        console.error('Game not found');
      }
    })
    .catch(error => {
      console.error('Error fetching the JSON data:', error);
      document.getElementById('info').textContent = "Error loading game information.";
    });
});

function displayGameDetails(game) {
  document.getElementById('gameTitle').textContent = game.game_name.fi;
  // document.getElementById('gameImage').src = `assets/img/${game.game_image || 'default_game_image.png'}`;
}

function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  results.sort((a, b) => b.score - a.score);

  resultsContainer.innerHTML = results.slice(0, 20).map((result, index) => `
    <div class="player-result ${index < 3 ? 'highlight' : ''}">
      <p>${index + 1}. ${result.username} - ${result.score} (${new Date(result.date_time).toLocaleDateString()})</p>
    </div>
  `).join('');
}

function displayGameDescription(game) {
  // Display the Finnish description in the #info div
  const gameDescription = game.description && game.description.fi ? game.description.fi : "No description available in Finnish.";
  document.getElementById('info').textContent = gameDescription;
}

function searchPlayers() {
  const query = document.getElementById('searchPlayers').value.toLowerCase();
  const filteredPlayers = gameResults.filter(result => result.username.toLowerCase().includes(query));

  displayResults(filteredPlayers);
}


/*let gameResults = [];

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('id');
  //const gameId = 1;

  fetch('data/games.json')
    .then(response => response.json())
    .then(data => {
      const game = data.games.find(game => game.ID == gameId);
      if (game) {
        displayGameDetails(game);
        gameResults = game.hall_of_fame;
        displayResults(gameResults);
      } else {
        console.error('Game not found');
    } 
    });
  });
  

function displayGameDetails(game) {
  document.getElementById('gameTitle').textContent = game.game_name.fi;
  //document.getElementById('gameImage').src = `assets/img/${game.game_image || 'default_game_image.png'}`;
}

function displayResults(results) {
  const resultsContainer = document.getElementById('results');
  results.sort((a, b) => b.score - a.score);
  
  resultsContainer.innerHTML = results.slice(0, 20).map((result, index) => `
    <div class="player-result ${index < 3 ? 'highlight' : ''}">
      <p>${index + 1}. ${result.username} - ${result.score} (${new Date(result.date_time).toLocaleDateString()})</p>
    </div>
  `).join('');
}

function searchPlayers() {
  const query = document.getElementById('searchPlayers').value.toLowerCase();
  const filteredPlayers = gameResults.filter(result => result.username.toLowerCase().includes(query));
  
  displayResults(filteredPlayers);
}

async function fetchGameData() {
    try {
        const response = await fetch('data/games.json');
        const data = await response.json();
        const games = data.games;

        // Get the game ID from the URL
        document.addEventListener('DOMContentLoaded', function () {

        })
        const urlParams = new URLSearchParams(window.location.search);
        const gameId = urlParams.get('id');

//fetch('/data/games.json')
//.then(response => response.json())
//.then(data => {

})
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

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    results.sort((a, b) => b.score - a.score);
    
    resultsContainer.innerHTML = results.slice(0, 20).map((result, index) => `
      <div class="player-result ${index < 3 ? 'highlight' : ''}">
        <p>${index + 1}. ${result.username} - ${result.score} (${new Date(result.date_time).toLocaleDateString()})</p>
      </div>
    `).join('');
  }

// Initialize
fetchGameData();*/
