/* eslint-disable import/extensions */
/* eslint-disable consistent-return */

import Player from './player.js';
import Ship from './ship.js';

/* eslint-disable no-unused-vars */
const Game = () => {
  function getShipLength(string) {
    switch (string) {
      case 'carrier': return 4;
      case 'battleship': return 3;
      case 'destroyer': return 2;
      case 'patrol': return 1;
      default: break;
    }
  }

  // Checks if ship is available
  function checkShipAvailability(player, ship) {
    const shipType = ship.name;
    const index = player.shipArsenal.indexOf(shipType);
    if (index > -1) { return true; }
    return false;
  }

  // Ship Length Traversal Method
  function updateXY(x, y, direction) {
    let aX = x; let aY = y;
    switch (direction) {
      case 'down': aY += 1; break;
      case 'right': aX += 1; break;
      default: break;
    }
    return { aX, aY };
  }

  // Checks if board position exists
  function checkBoard(x, y, board) {
    if (board[x]) { if (board[x][y]) { return true; } }
    return false;
  }

  // Checks if theoretical ship position is possible
  function checkTrack(ship, x, y, direction, board) {
    let aX = x; let aY = y;
    for (let i = 0; i < ship.length; i += 1) {
      if (aX > 9 || aX < 0 || aY > 9 || aY < 0) return false;
      if (board[aX][aY].shipNearby || board[aX][aY].ship) return false;
      aX = updateXY(aX, aY, direction).aX;
      aY = updateXY(aX, aY, direction).aY;
    }
    return true;
  }

  function activateShip(player, ship) {
    const index = player.shipArsenal.indexOf(ship.name);
    player.shipArsenal.splice(index, 1);
    player.activeShips.push(ship.name);
  }

  // Square neighbour list
  function getNeighbours(x, y) {
    return [[x - 1, y - 1], [x, y - 1], [x + 1, y - 1], [x + 1, y],
      [x + 1, y + 1], [x, y + 1], [x - 1, y + 1], [x - 1, y],
    ];
  }

  function placeShip(x, y, direction, player, ship) {
    if (!checkTrack(ship, x, y, direction, player.board)) return 'Error: Cannot place ship';
    if (!checkShipAvailability(player, ship)) return 'Error: Unavailable ship';

    let aX = x;
    let aY = y;
    const { board } = player;

    for (let i = 0; i < ship.length; i += 1) {
      board[aX][aY].ship = ship;

      const neighbours = getNeighbours(aX, aY);
      for (let j = 0; j < neighbours.length; j += 1) {
        const nX = neighbours[j][0]; const nY = neighbours[j][1];
        if (checkBoard(nX, nY, board)) board[nX][nY].shipNearby = true;
      }
      aX = updateXY(aX, aY, direction).aX;
      aY = updateXY(aX, aY, direction).aY;
    }

    activateShip(player, ship);
    return true;
  }

  function checkSunkStatus(player, ship) {
    if (ship.isSunk() === true) {
      const shipIndex = player.activeShips.indexOf(ship.name);
      player.activeShips.splice(shipIndex, 1);
      player.sunkShips.push(ship.name);
    }
  }

  function exposeSurroundings(x, y, player) {
    const { board } = player;
    const neighbours = getNeighbours(x, y);
    for (let i = 0; i < neighbours.length; i += 1) {
      const nX = neighbours[i][0];
      const nY = neighbours[i][1];
      if (checkBoard(nX, nY, player.board)) {
        if (!board[nX][nY].status && !board[nX][nY].ship) {
          board[nX][nY].status = 'expose';
        }
      }
    }
  }

  function checkWinner(player, computer) {
    if (player.activeShips.length === 0) {
      return 'computer';
    } if (computer.activeShips.length === 0) {
      return 'player';
    }
    return null;
  }

  function attack(x, y, player) {
    if (!checkBoard(x, y, player.board)) { return 'Error: Attack is not within bounds'; }
    if (player.board[x][y].status) { return 'Error: Square is used'; }

    const square = player.board[x][y];
    if (square.ship) {
      square.status = 'hit';
      square.ship.damage();
      checkSunkStatus(player, square.ship);
      exposeSurroundings(x, y, player);
      checkWinner(this.player, this.computer);
      return true;
    }
    square.status = 'miss';
    return false;
  }

  function shipSetup(player) {
    const directionList = ['right', 'down'];
    while (player.activeShips.length !== 10) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const direction = directionList[Math.floor(Math.random() * 2)];
      const shipLength = getShipLength(player.shipArsenal[0]);
      placeShip(x, y, direction, player, Ship(shipLength));
    }
  }

  function getFreeSquares(player) {
    let total = 0;
    const { board } = player;
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        if (!board[i][j].status) total += 1;
      }
    } return total;
  }

  function computerAttack() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    if (this.player.board[x][y].status) { return computerAttack(); }
    attack(x, y, this.player);
  }

  return {
    player: Player('player'),
    computer: Player('computer'),
    placeShip,
    attack,
    shipSetup,
    getFreeSquares,
    computerAttack,
    checkWinner,
  };
};

export default Game;
// module.exports = Game;
