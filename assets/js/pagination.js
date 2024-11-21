/*async function fetchGames() {
    try {
        const response = await fetch('/data/games.json');
        const data = await response.json();
        displayGames(data.games);
    } catch (error) {
        console.error("Error fetching games:", error);
    }
}*/
const gamesPerPage = 10;
let currentPage = 1;
let gamesData = [];

document.addEventListener('DOMContentLoaded', function () {
  fetch('data/games.json')
    .then(response => response.json())
    .then(data => {
      gamesData = data.games;
      gamesData.sort((a, b) => new Date(b.added_to_hall_of_fame) - new Date(a.added_to_hall_of_fame));
      displayGames();
      createPagination();
    });
});

function displayGames() {
  const start = (currentPage - 1) * gamesPerPage;
  const end = start + gamesPerPage;
  const gamesToDisplay = gamesData.slice(start, end);
  const gameGrid = document.getElementById('gameGrid');
  
  gameGrid.innerHTML = gamesToDisplay.map(game => `
    <div class="game">
      <h2><a href="peli.html?id=${game.ID}">${game.game_name.fi}</a></h2>
      <strong>Paras tulos: ${getTopScore(game.hall_of_fame)} - Voittaja: ${getTopPlayer(game.hall_of_fame)}</strong>
      <p>Tekijä: ${game.maker}</p>
            <p>Genre: ${game.genre}</p>
                  <p>Julkaisija: ${game.publisher}</p>
                        <p>Julkaisuvuosi: ${game.launched_year}</p>
    </div>
  `).join('');
}

function getTopScore(hall_of_fame) {
  return Math.max(...hall_of_fame.map(entry => entry.score));
}

function getTopPlayer(hall_of_fame) {
  const topEntry = hall_of_fame.reduce((prev, current) => (prev.score > current.score) ? prev : current);
  return topEntry.username;
}

function createPagination() {
  const totalPages = Math.ceil(gamesData.length / gamesPerPage);
  const pagination = document.getElementById('pagination');
  
  pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => `
    <button onclick="goToPage(${i + 1})">${i + 1}</button>
  `).join('');
}

function goToPage(page) {
  currentPage = page;
  displayGames();
}
