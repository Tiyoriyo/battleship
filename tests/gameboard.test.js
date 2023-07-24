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
    ship2 = Ship(4);
    ship3 = Ship(4);
    // ship4 = Ship(4);
  });

  describe('Placeship Tests', () => {
    test('Place ship at [x, y] coordinate', () => {
      game.placeShip(Ship(4), 4, 4, 'down');
      expect(game.board[4][4].ship
          && game.board[4][5].ship
          && game.board[4][6].ship
          && game.board[4][7].ship).toBeTruthy;
      expect(game.board[4][8].ship).toBeFalsy;
    });

    test('If the entire ship does not fit, return error', () => {
      expect(game.placeShip(ship1, 4, 8, 'down')).toBe('Error');
    });

    test('Return error if player tries to place ship over another', () => {
      game.placeShip(ship1, 4, 4, 'right');
      expect(game.placeShip(ship2, 6, 3, 'down')).toBe('Error');
    });
  });

  describe('Board Square Test', () => {
    test('Set the ship property of square to placed ship', () => {
      game.placeShip(ship1, 4, 4, 'right');
      expect(game.board[4][4].ship
        && game.board[5][4].ship
        && game.board[6][4].ship
        && game.board[7][4].ship).toEqual(ship1);
      expect(game.board[8][4].ship).toBe(undefined);
    });
    test('Square status reflects whether hit or missed', () => {
      game.placeShip(ship1, 4, 4, 'right');
      game.attack(4, 5);
      game.attack(6, 4);

      expect(game.board[4][5].status).toBe('miss');
      expect(game.board[6][4].status).toBe('hit');
    });
  });

  describe('Attack function tests', () => {
    test('Attack functions coincides with ship hits & isSunk', () => {
      game.placeShip(ship1, 4, 4, 'right');
      game.attack(4, 4);
      expect(game.board[5][4].ship.hits).toBe(1);
      expect(game.board[6][4].ship.sunk).toBeFalsy;
      game.attack(5, 4);
      game.attack(6, 4);
      game.attack(7, 4);
      expect(game.board[5][4].ship.hits).toBe(4);
      expect(game.board[5][4].ship.sunk).toBeTruthy;
    });

    test('attack does not work if the square has already been attacked', () => {
      game.placeShip(ship1, 4, 4, 'right');
      game.attack(4, 4);
      expect(game.attack(4, 4)).toBe('Error: Already Attacked');
    });

    test('attack outside board bounds returns error', () => {
      expect(game.attack(11, 12)).toBe('Error: Attack is not within bounds');
    });
  });

  describe('Game Controller tests', () => {
    test('Removes sunk ship frm player tracker', () => {
      const ship1 = Ship(1);
      game.placeShip(ship1, 4, 4, 'right');
      game.placeShip(ship2, 4, 7, 'right');
      game.placeShip(ship3, 4, 8, 'right');
      game.attack(4, 4);

      expect(game.player.activeShips).toEqual([ship2, ship3]);
    });

    test('Attempting to place unavailable ships will return an error', () => {
      game.player.shipArsenal = ['carrier'];
      expect(game.placeShip(Ship(5), 4, 4, 'right')).toBe(true);
      expect(game.placeShip(Ship(2), 3, 6, 'right')).toBe('Error: Ship is not available');
    });

    test('Sunk ship is added to sunkShip player array', () => {
      game.placeShip(Ship(2), 4, 4, 'right');
      game.attack(4, 4);
      game.attack(5, 4);
      expect(game.player.sunkShips).toEqual(['patrol']);
    });
  });
});
