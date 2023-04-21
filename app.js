const Gameboard = (function () {
  const player1 = CreatePlayer('player1', 'X');
  const player2 = CreatePlayer('player2', 'O');
  let currentPlayer;
  let gbArr = [];

  function CreatePlayer(name, symbol) {
    return {
      name,
      symbol,
    };
  }

  function changeCurrentPlayer() {
    currentPlayer === player1
      ? (currentPlayer = player2)
      : (currentPlayer = player1);
    return currentPlayer;
  }

  const updateGbArr = () => {};

  function checkForWinner() {}

  return { currentPlayer, changeCurrentPlayer };
})();

const GameboardDisplay = (function () {
  const gameboardCellEls = document.querySelectorAll('.gameboard-cell');

  const addListeners = () => {
    gameboardCellEls.forEach(el => {
      return el.addEventListener('click', () => appendSymbol(el), {
        once: true,
      });
    });
  };

  const appendSymbol = el => {
    return el.appendChild(createSymbol(Gameboard.changeCurrentPlayer()));
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
