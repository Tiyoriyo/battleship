/* eslint-disable no-undef */
const Game = require('./game');
const Ship = require('./ship');

describe('Gameboard Tests', () => {
  const game = Game();
  test('Check if a 10x10 gameboard is returned', () => {
    expect(game.board.length).toEqual(10);
    expect(game.board[0].length).toEqual(10);
  });

  test('Place ship at [x, y] coordinate', () => {
    const ship1 = Ship(4);
    game.placeShip(ship1, 4, 4, 'down');
    expect(game.board[4][4]).toBe('ship');
    expect(game.board[5][4]).toBe('ship');
    expect(game.board[6][4]).toBe('ship');
    expect(game.board[7][4]).toBe('ship');
  });
});
