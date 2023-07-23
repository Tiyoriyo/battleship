/* eslint-disable consistent-return */

import Player from './player';

/* eslint-disable no-unused-vars */
const Game = () => {
  function createBoard() {
    const board = [];
    for (let i = 0; i < 10; i += 1) {
      const column = [];
      for (let j = 0; j < 10; j += 1) {
        column[j] = {
          ship: undefined,
          status: null,
        };
      }
      board.push(column);
    }
    return board;
  }

  function getShipType(num) {
    switch (num) {
      case 5: return 'carrier';
      case 4: return 'battleship';
      case 3: return 'destroyer';
      case 2: return 'patrol';
      default: break;
    }
  }

  function checkShipAvailability(player, num) {
    const shipType = getShipType(num);
    const index = player.shipArsenal.indexOf(shipType);
    if (index > -1) { return true; }
    return false;
  }

  function checkTrack(ship, x, y, direction, board) {
    let curX = x; let curY = y;
    for (let i = 0; i < ship.length; i += 1) {
      if (curX > 9 || curX < 0 || curY > 9 || curY < 0) return false;
      if (board[curX][curY].ship !== undefined) return false;
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

  function activateShip(player, ship) {
    const index = player.shipArsenal.indexOf(getShipType(ship.length));
    player.activeShips.push(ship);
  }

  function placeShip(ship, x, y, direction) {
    let curX = x; let curY = y;
    if (!checkTrack(ship, x, y, direction, this.board)) return 'Error';
    if (!checkShipAvailability(this.player, ship.length)) return 'Error: Ship is not available';
    activateShip(this.player, ship);
    for (let i = 0; i < ship.length; i += 1) {
      this.board[curX][curY].ship = ship;
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
    const square = this.board[x][y];
    if (square.status) { return 'Error: Already Attacked'; }
    if (square.ship) {
      square.status = 'hit';
      square.ship.damage();
      return true;
    }
    square.status = 'miss';
    return false;
  }

  return {
    board: createBoard(),
    player: Player(),
    computer: undefined,
    placeShip,
    attack,
  };
};

export default Game;
// module.exports = Game;
