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

  const checkForWinner = () => {
    // const diaginalSquares = null;
    // console.log(`diagSqs: ${diaginalSquares}`);
    // const horizontalSquares = null;
    // console.log(`horiSqs: ${horizontalSquares}`);
    // const verticalSquares = null;
    // console.log(`vertSqs: ${verticalSquares});
    console.log(gbArr);
  };

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
          Gameboard.checkForWinner();
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

  return { addListeners };
})();

GameboardDisplay.addListeners();
