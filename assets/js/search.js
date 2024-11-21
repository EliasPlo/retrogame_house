function searchGames() {
    const query = document.getElementById('searchGames').value.toLowerCase();
    const filteredGames = gamesData.filter(game => game.game_name.fi.toLowerCase().includes(query) || game.game_name.en.toLowerCase().includes(query));
    displayFilteredGames(filteredGames);
  }
  
  function displayFilteredGames(filteredGames) {
    const gameGrid = document.getElementById('gameGrid');
    
    gameGrid.innerHTML = filteredGames.map(game => `
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
  