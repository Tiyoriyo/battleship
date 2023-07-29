/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// const Game = require('./game');
import Game from '../modules/game';
import Ship from '../modules/ship';

describe('Gameboard Tests', () => {
  let game;
  let ship1;
  let ship2;
  let ship3;
  // let ship4;

  beforeEach(() => {
    game = Game();
    ship1 = Ship(4);
    ship2 = Ship(3);
    ship3 = Ship(3);
    // ship4 = Ship(4);
  });

  describe('Placeship Tests', () => {
    test('Place ship at [x, y] coordinate', () => {
      game.placeShip(game.player, Ship(4), 4, 4, 'down');
      expect(game.player.board[4][4].ship
          && game.player.board[4][5].ship
          && game.player.board[4][6].ship
          && game.player.board[4][7].ship).toBeTruthy;
      expect(game.player.board[4][8].ship).toBeFalsy;
    });

    test('If the entire ship does not fit, return error', () => {
      expect(game.placeShip(game.player, ship1, 4, 8, 'down')).toBe('Error: Cannot place ship');
    });

    test('Return error if player tries to place ship over another', () => {
      game.placeShip(game.player, ship1, 4, 4, 'right');
      expect(game.placeShip(game.player, ship2, 6, 3, 'down')).toBe('Error: Cannot place ship');
    });
  });

  describe('Board Square Test', () => {
    test('Set the ship property of square to placed ship', () => {
      game.placeShip(game.player, ship1, 4, 4, 'right');
      expect(game.player.board[4][4].ship
        && game.player.board[5][4].ship
        && game.player.board[6][4].ship
        && game.player.board[7][4].ship).toEqual(ship1);
      expect(game.player.board[8][4].ship).toBe(undefined);
    });
    test('Square status reflects whether hit or missed', () => {
      game.placeShip(game.computer, ship1, 4, 4, 'right');
      game.attack(game.computer, 5, 4);
      game.attack(game.computer, 4, 5);

      expect(game.computer.board[5][4].status).toBe('hit');
      expect(game.computer.board[4][5].status).toBe('miss');
      expect(game.computer.board[6][4].status).toBe(null);
    });
  });

  describe('Attack function tests', () => {
    test('Attack functions coincides with ship hits & isSunk', () => {
      game.placeShip(game.computer, ship1, 4, 4, 'right');
      game.computer.board[4][4].ship.hits = 4;
      game.computer.board[4][4].ship.isSunk();
      expect(game.computer.board[5][4].ship.sunk).toBe(true);
    });

    test('attack does not work if the square has already been attacked', () => {
      game.placeShip(game.computer, ship1, 4, 4, 'right');
      game.attack(game.computer, 4, 4);
      expect(game.attack(game.computer, 4, 4)).toBe('Error: Already Attacked');
    });

    test('attack outside board bounds returns error', () => {
      expect(game.attack(game.computer, 11, 12)).toBe('Error: Attack is not within bounds');
    });
  });

  describe('Game Controller tests', () => {
    test('Removes sunk ship frm player tracker', () => {
      const ship1 = Ship(2);
      game.placeShip(game.computer, ship1, 4, 4, 'right');
      game.placeShip(game.computer, ship2, 4, 7, 'right');
      game.placeShip(game.computer, ship3, 4, 9, 'right');
      expect(game.computer.activeShips).toEqual(['destroyer', 'battleship', 'battleship']);

      // game.attack(game.computer, 4, 4);
      // game.attack(game.computer, 5, 4);
      // expect(game.computer.activeShips).toEqual([ship2.name, ship3.name]);
    });

    test('Attempting to place unavailable ships will return an error', () => {
      game.player.shipArsenal = ['carrier'];
      game.placeShip(game.player, Ship(4), 4, 4, 'right');
      expect(game.placeShip(game.player, Ship(2), 3, 6, 'right')).toBe('Error: Unavailable ship');
    });

    test('Sunk ship is added to sunkShip player array', () => {
      game.placeShip(game.computer, Ship(1), 4, 4, 'right');
      game.attack(game.computer, 4, 4);
      expect(game.computer.sunkShips).toEqual(['patrol']);
    });
  });

  describe('Computer Tests', () => {
    test('Computer places all moves successfully', () => {
      game.computerSetup();
      expect(game.computer.activeShips.length).toEqual(10);
      expect(game.computer.shipArsenal).toEqual([]);
    });

    test('Computer Attacks Player', () => {
      game.placeShip(game.player, Ship(3), 4, 4, 'right');
      game.computerAttack();
      game.computerAttack();
      expect(game.getFreeSquares(game.player)).toBe(98);
    });
  });
});
