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
  let ship4;

  beforeEach(() => {
    game = Game();
    ship1 = Ship(4);
    ship2 = Ship(4);
    ship3 = Ship(4);
    ship4 = Ship(4);
  });

  test('Place ship at [x, y] coordinate', () => {
    game.placeShip(Ship(4), 4, 4, 'down');
    expect(game.board[4][4].ship.length
      && game.board[4][5].ship.length
      && game.board[4][6].ship.length
      && game.board[4][7].ship.length).toBe(4);
  });

  test('If the entire ship does not fit, return error', () => {
    expect(game.placeShip(ship1, 4, 8, 'down')).toBe('Error');
  });

  test('Return error if player tries to place ship over another', () => {
    game.placeShip(ship1, 4, 4, 'right');
    expect(game.placeShip(ship2, 6, 3, 'down')).toBe('Error');
    expect(game.placeShip(Ship(4), 5, 5, 'down')).not.toBe('Error');
  });

  test('Be able to place ship at coordinates of failed placeship', () => {
    ship2 = Ship(2);
    game.placeShip(ship1, 4, 4, 'right');
    expect(game.placeShip(ship2, 6, 2, 'down')).not.toBe('Error');
  });

  describe('Gameboard and ship object integration', () => {
    test('Set the ship property of square to placed ship', () => {
      game.placeShip(ship1, 4, 4, 'right');

      expect(game.board[4][4].ship.length).toBe(4);
      expect(game.board[5][4].ship.length).toBe(4);
      expect(game.board[6][4].ship.length).toBe(4);
      expect(game.board[7][4].ship.length).toBe(4);
      expect(game.board[8][4].ship).toBe(undefined);
    });

    test('Attacking a square position will either return miss or hit', () => {
      game.placeShip(ship1, 4, 4, 'right');

      expect(game.attack(4, 5)).toBeTruthy;
      expect(game.attack(4, 8)).toBeFalsy;
    });

    test('Square status reflects whether hit or missed', () => {
      game.placeShip(ship1, 4, 4, 'right');
      game.attack(4, 5);
      game.attack(6, 4);

      expect(game.board[4][5].status).toBe('miss');
      expect(game.board[6][4].status).toBe('hit');
    });

    test('Attack functions coincides with ship hits & isSunk', () => {
      game.placeShip(ship1, 4, 4, 'right');
      game.attack(4, 4);
      expect(game.board[5][4].ship.hits).toBe(1);
      game.attack(5, 4);
      expect(game.board[6][4].ship.hits).toBe(2);
      expect(game.board[6][4].ship.sunk).toBeFalsy;
      game.attack(6, 4);
      expect(game.board[7][4].ship.hits).toBe(3);
      expect(game.board[7][4].ship.sunk).toBeFalsy;
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
});
