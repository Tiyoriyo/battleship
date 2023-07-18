/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const Game = () => {
  function createBoard() {
    const board = [];
    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let j = 0; j < 10; j += 1) { row[j] = 'empty'; }
      board.push(row);
    }
    return board;
  }

  function isSunk(ship) {
    if (ship.length === ship.hits) return true; return false;
  }

  function checkTrack(ship, x, y, direction, board) {
    let curX = x; let curY = y;
    for (let i = 0; i < ship.length; i += 1) {
      if (curX > 9 || curX < 0 || curY > 9 || curY < 0) return false;
      switch (direction) {
        case 'down': curY += 1; break;
        case 'up': curY -= 1; break;
        case 'left': curX -= 1; break;
        case 'right': curX += 1; break;
        default: break;
      }
    }
    return true;
  }

  return {
    board: createBoard(),
    placeShip(ship, x, y, direction) {
      let curX = x; let curY = y;
      if (!checkTrack(ship, x, y, direction, this.board)) return 'Error';
      for (let i = 0; i < ship.length; i += 1) {
        this.board[curY][curX] = 'ship';
        switch (direction) {
          case 'down': curY += 1; break;
          case 'up': curY -= 1; break;
          case 'left': curX -= 1; break;
          case 'right': curX += 1; break;
          default: break;
        }
      }
    },
  };
};

module.exports = Game;
