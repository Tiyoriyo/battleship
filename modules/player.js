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
  return {
    name,
    board: createBoard(),
    activeShips: [],
    sunkShips: [],
    shipArsenal: ['carrier', 'battleship', 'battleship',
      'destroyer', 'destroyer', 'destroyer', 'patrol', 'patrol', 'patrol', 'patrol'],
  };
};

export default Player;
