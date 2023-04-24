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

    // const checkForTie = () => {}

    if (checkDiagonalSquares()) return true;

    if (checkHorizontalSquares()) return true;

    if (checkVerticalSquares()) return true;

    return false;
  };

  // const resetGameboard = () => {
  //   gbArr.forEach(i => (i = null));
  //   player1.isCurrentPlayer = true;
  //   player2.isCurrentPlayer = false;
  //   // hide modal
  // };

  return {
    getCurrentPlayer,
    changeCurrentPlayer,
    checkForWinner,
    updateGbArr,
  };
})();

const GameboardDisplay = (function () {
  const gameboardCellEls = document.querySelectorAll('.gameboard-cell');
  const gbCellElsArr = [...gameboardCellEls];

  const addListeners = () => {
    gameboardCellEls.forEach(el => {
      return el.addEventListener(
        'click',
        () => {
          appendSymbol(el);
          Gameboard.updateGbArr(el, gbCellElsArr);
          if (Gameboard.checkForWinner(Gameboard.getCurrentPlayer())) {
            setWinnerNameDisplay();
            displayModal();
          }
          Gameboard.changeCurrentPlayer();
        },
        {
          once: true,
        }
      );
    });
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

  const setWinnerNameDisplay = () => {
    const capFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);
    const winnerNameDisplay = document.querySelector('.modal h1>span');
    const winnerName = Gameboard.getCurrentPlayer().name;
    winnerNameDisplay.textContent = capFirstLetter(winnerName);
    winnerNameDisplay.classList.add(`${winnerName}`);
  };

  // const setCurrentPlayerDisplay = currentPlayer => {};

  return { addListeners };
})();

GameboardDisplay.addListeners();
