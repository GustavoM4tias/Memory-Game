let gameStarted = false;

function startGame() {
    if (!gameStarted) {
        const initialScreen = document.getElementById('initial-screen');
        const gameScreen = document.getElementById('game-screen');
        initialScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        gameStarted = true;

        initializeGame();
    }
}

function initializeGame() {
    const animalImages = [
        'girafa.png', 'cavalomarinho.png', 'rato.png', 'esquilo.png',
        'tubarão.png', 'leão.png', 'porco.png', 'tartaruga.png'
    ];

    const cards = animalImages.concat(animalImages);
    cards.sort(() => Math.random() - 0.5);

    const gameContainer = document.querySelector('.memory-game');
    let selectedCards = [];
    let lockBoard = false;

    cards.forEach((imageName, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.imageName = imageName;
        card.dataset.index = index;
        card.innerHTML = `<img src="img/${imageName}" alt="Card Image">`;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });

    function flipCard() {
        if (lockBoard) return;
        const selectedCard = this;

        if (selectedCard === selectedCards[0]) return;

        selectedCard.classList.add('flipped');
        selectedCards.push(selectedCard);

        if (selectedCards.length === 2) {
            lockBoard = true;
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        const [card1, card2] = selectedCards;
        const imageName1 = card1.dataset.imageName;
        const imageName2 = card2.dataset.imageName;

        if (imageName1 === imageName2) {
            disableCards();
        } else {
            unflipCards();
        }

        lockBoard = false;
        selectedCards = [];

        if (document.querySelectorAll('.matched').length === cards.length) {
            showGameResult(true);
        }
    }

    function disableCards() {
        selectedCards.forEach(card => {
            card.removeEventListener('click', flipCard);
            card.classList.add('matched');
        });
    }

    function unflipCards() {
        selectedCards.forEach(card => {
            card.classList.remove('flipped');
        });
    }

    function showGameResult(playerWon) {
        const gameMessages = document.getElementById('game-messages');
        const resultMessage = document.getElementById('result-message');

        gameMessages.classList.remove('hidden');
        if (playerWon) {
            resultMessage.textContent = 'Parabéns! Você venceu!';
        } else {
            resultMessage.textContent = 'Que pena! Você perdeu. Tente novamente!';
        }
    }
}

function restartGame() {
    const gameScreen = document.getElementById('game-screen');
    const gameMessages = document.getElementById('game-messages');

    gameScreen.style.display = 'block';
    gameMessages.classList.add('hidden');

    const gameContainer = document.querySelector('.memory-game');
    gameContainer.innerHTML = '';

    initializeGame();
}

function backToMenu() {
    const initialScreen = document.getElementById('initial-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameMessages = document.getElementById('game-messages');

    gameScreen.style.display = 'none';
    gameMessages.classList.add('hidden');
    initialScreen.style.display = 'block';
    gameStarted = false;
}
