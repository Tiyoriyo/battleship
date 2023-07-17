const Game = () => {
  function createBoard() {
    const board = [];
    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let j = 0; j < 10; j += 1) {
        row[j] = 'empty';
      }
      board[i] = row;
    }
    return board;
  }

  function checkTrack(ship, x, y, direction, board) {
    const curX = x; let curY = y;
    for (let i = 0; i < ship.length; i += 1) {
      if (curX > 9 || curX < 0 || curY > 9 || curY < 0) return false;
      if (direction === 'down') { curY += 1; }
    }
    return board[curY][curX];
  }

  return {
    board: createBoard(),
    placeShip(ship, x, y, direction) {
      const curX = x; let curY = y;
      if (!checkTrack(ship, x, y, direction, this.board)) return 'Error';
      for (let i = 0; i < ship.length; i += 1) {
        this.board[curY][curX] = 'ship';
        if (direction === 'down') { curY += 1; }
      }
    },
  };
};

module.exports = Game;
