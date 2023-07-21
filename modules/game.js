/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const Game = () => {
  function createBoard() {
    const board = [];
    for (let i = 0; i < 10; i += 1) {
      const row = [];
      for (let j = 0; j < 10; j += 1) {
        row[j] = {
          ship: undefined,
          status: null,
        };
      }
      board.push(row);
    }
    return board;
  }

  function checkTrack(ship, x, y, direction, board) {
    let curX = x; let curY = y;
    for (let i = 0; i < ship.length; i += 1) {
      if (curX > 9 || curX < 0 || curY > 9 || curY < 0) return false;
      if (board[curY][curX].ship !== undefined) return false;
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

  function attack(x, y) {
    if (x > 9 || x < 0 || y > 9 || y < 0) { return 'Error: Attack is not within bounds'; }
    const square = this.board[y][x];
    if (square.status === 'hit') { return 'Error: Already Attacked'; }
    if (square.ship) {
      square.status = 'hit';
      square.ship.hit();
      return true;
    }
    square.status = 'miss';
    return false;
  }

  return {
    board: createBoard(),
    placeShip(ship, x, y, direction) {
      let curX = x; let curY = y;
      if (!checkTrack(ship, x, y, direction, this.board)) return 'Error';
      for (let i = 0; i < ship.length; i += 1) {
        this.board[curY][curX].ship = ship;
        switch (direction) {
          case 'down': curY += 1; break;
          case 'up': curY -= 1; break;
          case 'left': curX -= 1; break;
          case 'right': curX += 1; break;
          default: break;
        }
      }
    },
    attack,
  };
};

export default Game;
// module.exports = Game;
