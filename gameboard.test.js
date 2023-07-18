/* eslint-disable no-undef */
// const Game = require('./game');
import Game from './game';
import Ship from './ship';

describe('Gameboard Tests', () => {
  const game = Game();
  test('Check if a 10x10 gameboard is returned', () => {
    expect(game.board.length).toEqual(10);
    expect(game.board[0].length).toEqual(10);
  });

  test('Place ship at [x, y] coordinate', () => {
    game.placeShip(Ship(4), 4, 4, 'down');
    expect(game.board[4][4]).toBe('ship');
    expect(game.board[5][4]).toBe('ship');
    expect(game.board[6][4]).toBe('ship');
    expect(game.board[7][4]).toBe('ship');
  });

  test('If the entire ship does not fit, return error', () => {
    const ship2 = Ship(5);
    expect(game.placeShip(ship2, 4, 8, 'down')).toBe('Error');
  });

  test(('All Directions have placeShip functionality'), () => {
    const ship3 = Ship(4);
    const ship4 = Ship(4);
    const ship5 = Ship(4);
    const ship6 = Ship(4);

    expect(game.placeShip(ship3, 8, 9, 'right')).toBe('Error');
    expect(game.placeShip(ship3, 1, 8, 'right')).not.toBe('Error');
    expect(game.placeShip(ship4, 1, 2, 'left')).toBe('Error');
    expect(game.placeShip(ship4, 4, 0, 'left')).not.toBe('Error');
    expect(game.placeShip(ship5, 4, 1, 'up')).toBe('Error');
    expect(game.placeShip(ship5, 6, 5, 'up')).not.toBe('Error');
    expect(game.placeShip(ship6, 4, 7, 'down')).toBe('Error');
    expect(game.placeShip(ship6, 7, 4, 'down')).not.toBe('Error');
  });
});
