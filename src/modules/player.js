const Player = (name) => {
  function createBoard() {
    const board = [];
    for (let i = 0; i < 10; i += 1) {
      const column = [];
      for (let j = 0; j < 10; j += 1) {
        column[j] = {
          ship: undefined,
          status: null,
          shipNearby: false,
        };
      }
      board.push(column);
    }
    return board;
  }

  function resetBoard() {
    this.board = createBoard();
  }

  function resetShips() {
    this.activeShips = [];
    this.sunkShips = [];
    this.shipArsenal = ['carrier', 'battleship', 'battleship',
      'destroyer', 'destroyer', 'destroyer', 'patrol', 'patrol', 'patrol', 'patrol'];
  }

  function reset() {
    this.resetBoard();
    this.resetShips();
  }

  return {
    name,
    board: createBoard(),
    activeShips: [],
    sunkShips: [],
    shipArsenal: ['carrier', 'battleship', 'battleship',
      'destroyer', 'destroyer', 'destroyer', 'patrol', 'patrol', 'patrol', 'patrol'],
    resetBoard,
    resetShips,
    reset,
  };
};

export default Player;
