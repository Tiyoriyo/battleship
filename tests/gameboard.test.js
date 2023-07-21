/* eslint-disable no-undef */
// const Game = require('./game');
import Game from '../modules/game';
import Ship from '../modules/ship';

describe('Gameboard Tests', () => {
  test('Check if a 10x10 gameboard is returned', () => {
    const game = Game();
    expect(game.board.length && game.board[0].length).toEqual(10);
  });

  test('Place ship at [x, y] coordinate', () => {
    const game = Game();
    game.placeShip(Ship(4), 4, 4, 'down');
    expect(game.board[4][4].ship
      && game.board[5][4].ship
      && game.board[6][4].ship
      && game.board[7][4].ship).toBe('ship4');
  });

  test('If the entire ship does not fit, return error', () => {
    const game = Game();
    const ship1 = Ship(5);
    expect(game.placeShip(ship1, 4, 8, 'down')).toBe('Error');
  });

  test(('All Directions have placeShip functionality'), () => {
    const game = Game();
    const ship1 = Ship(4);
    const ship2 = Ship(4);
    const ship3 = Ship(4);
    const ship4 = Ship(4);

    expect(game.placeShip(ship1, 8, 9, 'right')).toBe('Error');
    expect(game.placeShip(ship1, 1, 8, 'right')).not.toBe('Error');
    expect(game.placeShip(ship2, 1, 2, 'left')).toBe('Error');
    expect(game.placeShip(ship2, 4, 0, 'left')).not.toBe('Error');
    expect(game.placeShip(ship3, 4, 1, 'up')).toBe('Error');
    expect(game.placeShip(ship3, 6, 5, 'up')).not.toBe('Error');
    expect(game.placeShip(ship4, 4, 7, 'down')).toBe('Error');
    expect(game.placeShip(ship4, 7, 4, 'down')).not.toBe('Error');
  });

  test('Return error if player tries to place ship over another', () => {
    const game = Game();
    const ship1 = Ship(4);
    const ship2 = Ship(4);
    game.placeShip(ship1, 4, 4, 'right');
    expect(game.placeShip(ship2, 6, 3, 'down')).toBe('Error');
    expect(game.placeShip(Ship(4), 5, 5, 'down')).not.toBe('Error');
  });

  test('Be able to place ship at coordinates of failed placeship', () => {
    const game = Game();
    const ship1 = Ship(4);
    const ship2 = Ship(2);
    game.placeShip(ship1, 4, 4, 'right');
    expect(game.placeShip(ship2, 6, 2, 'down')).not.toBe('Error');
  });
});
