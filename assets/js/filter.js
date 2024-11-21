// Fetching the game data from the JSON file
fetch('/data/games.json')
  .then(response => response.json())
  .then(data => {
    const games = data.games;
    const gameGrid = document.getElementById('gameGrid');

    // Function to display games in the grid
    function displayGames(games) {
      gameGrid.innerHTML = '';
      games.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('gameGrid');
        gameElement.innerHTML = `
            <div class="game">
              <h2><a href="peli.html?id=${game.ID}">${game.game_name.fi}</a></h2>
              <strong>Paras tulos: ${getTopScore(game.hall_of_fame)} - Voittaja: ${getTopPlayer(game.hall_of_fame)}</strong>
              <p>Tekijä: ${game.maker}</p>
                    <p>Genre: ${game.genre}</p>
                          <p>Julkaisija: ${game.publisher}</p>
                                <p>Julkaisuvuosi: ${game.launched_year}</p>
            </div>
        `;
        gameGrid.appendChild(gameElement);
      });
    }

    // Function to apply filters based on selected options
    function filterGames() {
      const yearFilter = document.getElementById('yearFilter').value;
      const makerFilter = document.getElementById('makerFilter').value.toLowerCase();
      const publisherFilter = document.getElementById('publisherFilter').value.toLowerCase();
      const genreFilter = document.getElementById('genreFilter').value.toLowerCase();

      const filteredGames = games.filter(game => {
        const matchesYear = yearFilter === '' || game.launched_year.toString() === yearFilter;
        const matchesMaker = makerFilter === '' || game.maker.toLowerCase().includes(makerFilter);
        const matchesPublisher = publisherFilter === '' || game.publisher.toLowerCase().includes(publisherFilter);
        const matchesGenre = genreFilter === '' || game.genre.toLowerCase().includes(genreFilter);

        return matchesYear && matchesMaker && matchesPublisher && matchesGenre;
      });

      // Display the filtered games
      displayGames(filteredGames);
    }

    // Event listeners for filters
    document.getElementById('yearFilter').addEventListener('change', filterGames);
    document.getElementById('makerFilter').addEventListener('input', filterGames);
    document.getElementById('publisherFilter').addEventListener('input', filterGames);
    document.getElementById('genreFilter').addEventListener('change', filterGames);

    // Display all games initially
    displayGames(games);
  })
  .catch(error => console.error('Error fetching games data:', error));
