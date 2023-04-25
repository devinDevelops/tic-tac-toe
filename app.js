const Gameboard = (function () {
  const player1 = CreatePlayer('player1', 'X', true);
  const player2 = CreatePlayer('player2', 'O', false);

  let gbArr = [null, null, null, null, null, null, null, null, null];

  function CreatePlayer(name, symbol, isCurrentPlayer) {
    return {
      name,
      symbol,
      isCurrentPlayer,
    };
  }

  const getCurrentPlayer = () => {
    return player1.isCurrentPlayer ? player1 : player2;
  };

  const changeCurrentPlayer = () => {
    if (player1.isCurrentPlayer) {
      player1.isCurrentPlayer = false;
      player2.isCurrentPlayer = true;
    } else {
      player2.isCurrentPlayer = false;
      player1.isCurrentPlayer = true;
    }
    return getCurrentPlayer();
  };

  const updateGbArr = (el, gbCellElsArr) => {
    const indexOfgbCellEvent = gbCellElsArr.indexOf(el);
    return (gbArr[indexOfgbCellEvent] = getCurrentPlayer().symbol);
  };

  const checkForWinner = currentPlayer => {
    const checkDiagonalSquares = () => {
      if (
        (gbArr[0] === currentPlayer.symbol &&
          gbArr[4] === currentPlayer.symbol &&
          gbArr[8] === currentPlayer.symbol) ||
        (gbArr[2] === currentPlayer.symbol &&
          gbArr[4] === currentPlayer.symbol &&
          gbArr[6] === currentPlayer.symbol)
      ) {
        return true;
      }
      return false;
    };

    const checkHorizontalSquares = () => {
      if (
        (gbArr[0] === currentPlayer.symbol &&
          gbArr[1] === currentPlayer.symbol &&
          gbArr[2] === currentPlayer.symbol) ||
        (gbArr[3] === currentPlayer.symbol &&
          gbArr[4] === currentPlayer.symbol &&
          gbArr[5] === currentPlayer.symbol) ||
        (gbArr[6] === currentPlayer.symbol &&
          gbArr[7] === currentPlayer.symbol &&
          gbArr[8] === currentPlayer.symbol)
      ) {
        return true;
      }
      return false;
    };

    const checkVerticalSquares = () => {
      if (
        (gbArr[0] === currentPlayer.symbol &&
          gbArr[3] === currentPlayer.symbol &&
          gbArr[6] === currentPlayer.symbol) ||
        (gbArr[1] === currentPlayer.symbol &&
          gbArr[4] === currentPlayer.symbol &&
          gbArr[7] === currentPlayer.symbol) ||
        (gbArr[2] === currentPlayer.symbol &&
          gbArr[5] === currentPlayer.symbol &&
          gbArr[8] === currentPlayer.symbol)
      ) {
        return true;
      }
      return false;
    };

    if (checkDiagonalSquares()) return true;

    if (checkHorizontalSquares()) return true;

    if (checkVerticalSquares()) return true;

    return false;
  };

  const checkForTie = () => {
    const emptyGbArrSpots = gbArr.filter(i => i === null);
    if (
      emptyGbArrSpots.length === 0 &&
      checkForWinner(getCurrentPlayer) === false
    ) {
      return true;
    }

    return false;
  };

  const resetGameboard = () => {
    gbArr = [null, null, null, null, null, null, null, null, null];
    player1.isCurrentPlayer = true;
    player2.isCurrentPlayer = false;
  };

  return {
    getCurrentPlayer,
    changeCurrentPlayer,
    checkForWinner,
    checkForTie,
    updateGbArr,
    resetGameboard,
  };
})();

const GameboardDisplay = (function () {
  const addCellListeners = () => {
    const gameboardCellEls = document.querySelectorAll('.gameboard-cell');
    const gbCellElsArr = [...gameboardCellEls];

    gameboardCellEls.forEach(el => {
      return el.addEventListener(
        'click',
        () => {
          appendSymbol(el);
          Gameboard.updateGbArr(el, gbCellElsArr);

          if (Gameboard.checkForWinner(Gameboard.getCurrentPlayer())) {
            setWinnerTextDisplay(Gameboard.getCurrentPlayer());
            displayModal();
          } else if (Gameboard.checkForTie()) {
            setTieTextDisplay();
            displayModal();
          } else {
            Gameboard.changeCurrentPlayer();
            changeCurrentPlayerDisplay(Gameboard.getCurrentPlayer());
          }
        },
        {
          once: true,
        }
      );
    });
  };

  const playAgainBTN = document.querySelector('.play-again');

  const addPlayAgainListeners = () => {
    playAgainBTN.addEventListener('click', displayModal);
    playAgainBTN.addEventListener('click', Gameboard.resetGameboard);
    playAgainBTN.addEventListener('click', resetGameboardDisplay);
    playAgainBTN.addEventListener('click', addCellListeners);
  };

  const addStartGameListener = () => {
    const startGameBTN = document.querySelector('.start-game-btn');
    startGameBTN.addEventListener('click', removeStartGameScreen);
  };

  const removeStartGameScreen = () => {
    const startGamePageEl = document.querySelector('.starting-page');
    startGamePageEl.classList.add('hidden');
  };

  const appendSymbol = el => {
    return el.appendChild(createSymbol(Gameboard.getCurrentPlayer()));
  };

  const createSymbol = currentPlayer => {
    const symbolEl = document.createElement('span');
    symbolEl.textContent = currentPlayer.symbol;
    symbolEl.classList.add('symbol');
    symbolEl.classList.add(currentPlayer.name);
    return symbolEl;
  };

  const displayModal = () => {
    const modal = document.querySelector('.modal-blur');
    modal.classList.toggle('hidden');
  };

  const gameOutcomeTextEl = document.querySelector('.outcome');
  const winnerNameDisplay = document.querySelector('.modal h1>span');

  const setTieTextDisplay = () => {
    removeWinnerTextDisplay();
    gameOutcomeTextEl.textContent = 'This round is a tie!';
  };

  const setWinnerTextDisplay = currentPlayer => {
    const capFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);
    const winnerName = currentPlayer.name;
    winnerNameDisplay.textContent = capFirstLetter(winnerName);
    winnerNameDisplay.removeAttribute('class');
    winnerNameDisplay.setAttribute('class', 'highlight');
    winnerNameDisplay.classList.add(`${winnerName}`);
    gameOutcomeTextEl.textContent = 'Wins!';
  };

  const removeWinnerTextDisplay = () => {
    winnerNameDisplay.textContent = '';
  };

  const changeCurrentPlayerDisplay = currentPlayer => {
    const player1NameDisplay = document.querySelector(
      '.player-names-container .player1'
    );
    const player2NameDisplay = document.querySelector(
      '.player-names-container .player2'
    );

    if (currentPlayer.name === player1NameDisplay.textContent.toLowerCase()) {
      player1NameDisplay.classList.add('highlight');
      player2NameDisplay.classList.remove('highlight');
    } else {
      player1NameDisplay.classList.remove('highlight');
      player2NameDisplay.classList.add('highlight');
    }
  };

  const createGBCell = () => {
    const gameboardEl = document.querySelector('.gameboard');
    const gbCell = document.createElement('div');
    gbCell.classList.add('gameboard-cell');
    gameboardEl.appendChild(gbCell);
  };

  const resetGameboardDisplay = () => {
    const gameboardCellEls = document.querySelectorAll('.gameboard-cell');

    gameboardCellEls.forEach(el => el.remove());

    for (let i = 0; i < 9; i++) {
      createGBCell();
    }

    changeCurrentPlayerDisplay(Gameboard.getCurrentPlayer());
  };

  return { addCellListeners, addPlayAgainListeners, addStartGameListener };
})();

GameboardDisplay.addCellListeners();
GameboardDisplay.addPlayAgainListeners();
GameboardDisplay.addStartGameListener();
