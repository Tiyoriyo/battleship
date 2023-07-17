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

  // function placeShip(ship, x, y, direction) {
  //   const curX = x; let curY = y;
  //   for (let i = 0; i < ship.length; i += 1) {
  //     this.board[curY][curX] = 'ship';
  //     if (direction === 'down') { curY += 1; }
  //   }
  // }
  return {
    board: createBoard(),
    placeShip(ship, x, y, direction) {
      const curX = x; let curY = y;
      for (let i = 0; i < ship.length; i += 1) {
        this.board[curY][curX] = 'ship';
        if (direction === 'down') { curY += 1; }
      }
    },
  };
};

module.exports = Game;
