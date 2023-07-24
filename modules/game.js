/* eslint-disable import/extensions */
/* eslint-disable consistent-return */

import Player from './player.js';
import Ship from './ship.js';

/* eslint-disable no-unused-vars */
const Game = () => {
  function getShipType(num) {
    switch (num) {
      case 5: return 'carrier';
      case 4: return 'battleship';
      case 3: return 'destroyer';
      case 2: return 'patrol';
      default: break;
    }
  }

  // function getShipLength(string) {
  //   switch (string) {
  //     case 'carrier': return 5;
  //     case 'battleship': return 4;
  //     case 'destroyer': return 3;
  //     case 'patrol': return 2;
  //     default: break;
  //   }
  // }

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
    player.shipArsenal.splice(index, 1);
    player.activeShips.push(ship);
  }

  function checkErrors(player, ship, x, y, direction) {
    const truecheck1 = checkTrack(ship, x, y, direction, player.board);
    const truecheck2 = checkShipAvailability(player, ship.length);

    if (truecheck1 === false || truecheck2 === false) return true;
  }

  function placeShip(player, ship, x, y, direction) {
    if (checkErrors(player, ship, x, y, direction)) return 'Error';
    let curX = x;
    let curY = y;
    const { board } = player;
    for (let i = 0; i < ship.length; i += 1) {
      board[curX][curY].ship = ship;
      switch (direction) {
        case 'down': curY += 1; break;
        case 'up': curY -= 1; break;
        case 'left': curX -= 1; break;
        case 'right': curX += 1; break;
        default: break;
      }
    } activateShip(player, ship);
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
    const square = player.board[x][y];
    if (square.status) { return 'Error: Already Attacked'; }
    if (square.ship) {
      square.status = 'hit';
      square.ship.damage();
      checkSunkStatus(player, square.ship);
      return true;
    }
    square.status = 'miss';
    return false;
  }

  // function computerSetup() {
  //   for (let i = 0; i < this.computer.shipArsenal.length; i += 1) {
  //     while (this.computer.activeShips.length < this.computer.activeShips.length + 1) {
  //       const x = Math.floor(Math.random() * 10);
  //       const y = Math.floor(Math.random() * 10);
  //       const directionList = ['left', 'right', 'up', 'down'];
  //       const direction = directionList[Math.floor(Math.random() * 4)];
  //       placeShip(Ship(getShipLength(this.computer.shipArsenal[i])), x, y, direction, this.board, this.player);
  //     }
  //   }
  // }

  return {
    player: Player('player'),
    computer: Player('computer'),
    placeShip,
    attack,
    // computerSetup,
  };
};

export default Game;
// module.exports = Game;
