document.addEventListener('DOMContentLoaded', () => {
    
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('start-button');
    const endScreen = document.getElementById('end-screen');
    const saveYesButton = document.getElementById('save-yes');
    const saveNoButton = document.getElementById('save-no');
    const playAgainButton = document.getElementById('play-again');
    const scoreDisplay = document.getElementById('score-display');
    const saveScoreDiv = document.getElementById('save-score');
    const submitScoreButton = document.getElementById('submit-score');
    const playerNameInput = document.getElementById('player-name');
    const scoreList = document.getElementById('score-list');

    const gridSize = 20;
    const boardSize = canvas.width / gridSize;

    let snake1 = [{x: 10, y: 10}];
    let snake2 = [{x: 20, y: 20}];
    let snake1Direction = {x: 0, y: 0};
    let snake2Direction = {x: 0, y: 0};
    let apples = [];
    let score = 0;
    let gameInterval;

    function resetGame() {
        snake1 = [{x: 10, y: 10}];
        snake2 = [{x: 20, y: 20}];
        snake1Direction = {x: 0, y: 0};
        snake2Direction = {x: 0, y: 0};
        apples = [{x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize)}];
        score = 0;
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 100);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake(snake1, 'green');
        drawSnake(snake2, 'blue');

        apples.forEach(apple => {
            ctx.fillStyle = 'red';
            ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
        });
    }

    function drawSnake(snake, color) {
        ctx.fillStyle = color;
        snake.forEach(part => {
            ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
        });
    }

    function gameLoop() {
        moveSnake(snake1, snake1Direction);
        moveSnake(snake2, snake2Direction);

        if (checkCollision(snake1, snake2)) {
            endGame();
        }

        apples.forEach((apple, index) => {
            if (snake1[0].x === apple.x && snake1[0].y === apple.y) {
                score++;
                snake1.push({...snake1[snake1.length - 1]});
                apples.splice(index, 1);
                generateNewApple();
            } else if (snake2[0].x === apple.x && snake2[0].y === apple.y) {
                score++;
                snake2.push({...snake2[snake2.length - 1]});
                apples.splice(index, 1);
                generateNewApple();
            }
        });

        draw();
    }

    function moveSnake(snake, direction) {
        const newHead = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
        newHead.x = (newHead.x + boardSize) % boardSize;
        newHead.y = (newHead.y + boardSize) % boardSize;

        snake.unshift(newHead);
        snake.pop();
    }

    function checkCollision(snake1, snake2) {
        const snake1Head = snake1[0];
        const snake2Head = snake2[0];

        // Check collision with own body
        for (let i = 1; i < snake1.length; i++) {
            if (snake1Head.x === snake1[i].x && snake1Head.y === snake1[i].y) {
                return true;
            }
        }
        for (let i = 1; i < snake2.length; i++) {
            if (snake2Head.x === snake2[i].x && snake2Head.y === snake2[i].y) {
                return true;
            }
        }

        // Check collision with the other snake
        for (let i = 0; i < snake2.length; i++) {
            if (snake1Head.x === snake2[i].x && snake1Head.y === snake2[i].y) {
                return true;
            }
        }
        for (let i = 0; i < snake1.length; i++) {
            if (snake2Head.x === snake1[i].x && snake2Head.y === snake1[i].y) {
                return true;
            }
        }

        return false;
    }

    function endGame() {
        clearInterval(gameInterval);
        scoreDisplay.textContent = score;
        endScreen.style.display = 'block';
    }

    function generateNewApple() {
        apples.push({
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize)
        });
    }

    startButton.addEventListener('click', () => {
        document.getElementById('start-screen').style.display = 'none';
        resetGame();
    });

    saveYesButton.addEventListener('click', () => {
        saveScoreDiv.style.display = 'block';
    });

    saveNoButton.addEventListener('click', () => {
        playAgainButton.style.display = 'block';
    });

    submitScoreButton.addEventListener('click', () => {
        const playerName = playerNameInput.value;
        if (playerName) {
            const scoreItem = document.createElement('li');
            scoreItem.textContent = `${playerName}: ${score} points`;
            scoreList.appendChild(scoreItem);
            playAgainButton.style.display = 'block';
            saveScoreDiv.style.display = 'none';
        }
    });

    playAgainButton.addEventListener('click', () => {
        endScreen.style.display = 'none';
        resetGame();
    });

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w':
                snake1Direction = {x: 0, y: -1};
                break;
            case 's':
                snake1Direction = {x: 0, y: 1};
                break;
            case 'a':
                snake1Direction = {x: -1, y: 0};
                break;
            case 'd':
                snake1Direction = {x: 1, y: 0};
                break;
            case 'ArrowUp':
                snake2Direction = {x: 0, y: -1};
                break;
            case 'ArrowDown':
                snake2Direction = {x: 0, y: 1};
                break;
            case 'ArrowLeft':
                snake2Direction = {x: -1, y: 0};
                break;
            case 'ArrowRight':
                snake2Direction = {x: 1, y: 0};
                break;
        }
    });
});
