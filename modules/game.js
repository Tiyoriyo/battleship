/* eslint-disable import/extensions */
/* eslint-disable consistent-return */

import Player from './player.js';
import Ship from './ship.js';

/* eslint-disable no-unused-vars */
const Game = () => {
  function getShipType(num) {
    switch (num) {
      case 4: return 'carrier';
      case 3: return 'battleship';
      case 2: return 'destroyer';
      case 1: return 'patrol';
      default: break;
    }
  }

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
  function checkShipAvailability(player, num) {
    const shipType = getShipType(num);
    const index = player.shipArsenal.indexOf(shipType);
    if (index > -1) { return true; }
    return false;
  }

  function updateXY(x, y, direction) {
    let aX = x; let aY = y;
    switch (direction) {
      case 'down': aY += 1; break;
      case 'right': aX += 1; break;
      default: break;
    }
    return { aX, aY };
  }

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

  function getNeighbours(x, y) {
    return [[x - 1, y - 1], [x, y - 1], [x + 1, y - 1], [x + 1, y],
      [x + 1, y + 1], [x, y + 1], [x - 1, y + 1], [x - 1, y],
    ];
  }

  function placeShip(player, ship, x, y, direction) {
    if (!checkTrack(ship, x, y, direction, player.board)) return 'Error: Cannot place ship';
    if (!checkShipAvailability(player, ship.length)) return 'Error: Unavailable ship';

    let aX = x;
    let aY = y;
    const { board } = player;

    for (let i = 0; i < ship.length; i += 1) {
      board[aX][aY].ship = ship;

      const neighbours = getNeighbours(aX, aY);
      for (let j = 0; j < neighbours.length; j += 1) {
        const nX = neighbours[j][0]; const nY = neighbours[j][1];
        // If the neighbouring board position exists, set shipNearby to true
        if (board[nX]) { if (board[nX][nY]) { board[nX][nY].shipNearby = true; } }
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

  function attack(player, x, y) {
    if (x > 9 || x < 0 || y > 9 || y < 0) { return 'Error: Attack is not within bounds'; }
    if (player.board[x][y].status) { return 'Error: Already Attacked'; }
    const square = player.board[x][y];
    if (square.ship) {
      square.status = 'hit';
      square.ship.damage();
      checkSunkStatus(player, square.ship);
      return true;
    }
    square.status = 'miss';
    return false;
  }

  function computerSetup() {
    const { computer } = this;
    const directionList = ['right', 'down'];
    // for (let i = 0; i < 10; i += 1) {
    while (computer.activeShips.length !== 10) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const direction = directionList[Math.floor(Math.random() * 2)];
      const shipLength = getShipLength(computer.shipArsenal[0]);
      placeShip(computer, Ship(shipLength), x, y, direction);
    }
    // }
  }

  function getFreeSquares(player) {
    const { board } = player;
    let total = 0;
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
    attack(this.player, x, y);
  }

  // function checkWinner(player, computer) {
  //   if (player.sunkShips.length === 10 && computer.sunkShips.length !== 10) {
  //     gameover('player');
  //   } else if (computer.sunkships.length === 10 && player.sunkShips.length !== 10) {
  //     gameover('computer');
  //   }
  // }

  return {
    player: Player('player'),
    computer: Player('computer'),
    placeShip,
    attack,
    computerSetup,
    getFreeSquares,
    computerAttack,
  };
};

export default Game;
// module.exports = Game;
