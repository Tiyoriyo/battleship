const Player = (name) => ({
  name,
  activeShips: [],
  sunkShips: [],
  shipArsenal: ['carrier', 'battleship', 'battleship',
    'destroyer', 'destroyer', 'destroyer', 'patrol', 'patrol', 'patrol', 'patrol'],
});

export default Player;
