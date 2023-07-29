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
      if (board[curX][curY].shipNearby) return false;
      if (board[curX][curY].ship !== undefined) return false;
      switch (direction) {
        case 'down': curY += 1; break;
        case 'right': curX += 1; break;
        default: break;
      }
    }
    return true;
  }

  function activateShip(player, ship) {
    const index = player.shipArsenal.indexOf(ship.name);
    player.shipArsenal.splice(index, 1);
    player.activeShips.push(ship.name);
  }

  function placeShip(player, ship, x, y, direction) {
    if (!checkTrack(ship, x, y, direction, player.board)) return 'Error: Cannot place ship';
    if (!checkShipAvailability(player, ship.length)) return 'Error: Unavailable ship';

    let curX = x;
    let curY = y;

    const { board } = player;
    for (let i = 0; i < ship.length; i += 1) {
      board[curX][curY].ship = ship;
      const neighbours = [[curX - 1, curY - 1], [curX, curY - 1],
        [curX + 1, curY - 1], [curX + 1, curY],
        [curX + 1, curY + 1], [curX, curY + 1],
        [curX - 1, curY + 1], [curX - 1, curY],
      ];
      for (let j = 0; j < neighbours.length; j += 1) {
        const nX = neighbours[j][0]; const nY = neighbours[j][1];
        if (board[nX]) {
          if (board[nX][nY]) {
            board[nX][nY].shipNearby = true;
          }
        }
      }
      switch (direction) {
        case 'down': curY += 1; break;
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
    // checkWinner(this.player, this.computer);
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
