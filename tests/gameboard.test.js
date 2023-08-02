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
      game.placeShip(4, 4, 'down', game.player, Ship(4));
      expect(game.player.board[4][4].ship
          && game.player.board[4][5].ship
          && game.player.board[4][6].ship
          && game.player.board[4][7].ship).toBeTruthy;
      expect(game.player.board[4][8].ship).toBeFalsy;
    });

    test('If the entire ship does not fit, return error', () => {
      expect(game.placeShip(4, 8, 'down', game.player, ship1)).toBe('Error: Cannot place ship');
    });

    test('Return error if player tries to place ship over another', () => {
      game.placeShip(4, 4, 'right', game.player, ship1);
      expect(game.placeShip(6, 3, 'down', game.player, ship2)).toBe('Error: Cannot place ship');
    });
  });

  describe('Board Square Test', () => {
    test('Set the ship property of square to placed ship', () => {
      game.placeShip(4, 4, 'right', game.player, ship1);
      expect(game.player.board[4][4].ship
        && game.player.board[5][4].ship
        && game.player.board[6][4].ship
        && game.player.board[7][4].ship).toEqual(ship1);
      expect(game.player.board[8][4].ship).toBe(undefined);
    });
    test('Square status reflects whether hit or missed', () => {
      game.placeShip(0, 0, 'right', game.computer, ship1);
      game.attack(1, 0, game.computer);
      game.attack(9, 9, game.computer);

      expect(game.computer.board[1][0].status).toBe('hit');
      expect(game.computer.board[9][9].status).toBe('miss');
      expect(game.computer.board[4][4].status).toBe(null);
    });
  });

  describe('Attack function tests', () => {
    test('Attack functions coincides with ship hits & isSunk', () => {
      game.placeShip(4, 4, 'right', game.computer, ship1);
      game.computer.board[4][4].ship.hits = 4;
      game.computer.board[4][4].ship.isSunk();
      expect(game.computer.board[5][4].ship.sunk).toBe(true);
    });

    test('attack does not work if the square has already been attacked', () => {
      game.placeShip(4, 4, 'right', game.computer, ship1);
      game.attack(4, 4, game.computer);
      expect(game.attack(4, 4, game.computer)).toBe('Error: Square is used');
    });

    test('attack outside board bounds returns error', () => {
      expect(game.attack(11, 12, game.computer)).toBe('Error: Attack is not within bounds');
    });

    test('Neighbouring squares correspond to appropriate stage of attack sequence', () => {
      game.placeShip(4, 4, 'right', game.computer, Ship(3));
      game.attack(4, 4, game.computer);

      expect(game.computer.board[3][3].status
        && game.computer.board[5][3].status
        && game.computer.board[3][5].status
        && game.computer.board[5][5].status).toBe('expose');

      game.attack(5, 4, game.computer);
      expect(game.computer.board[3][4].status).toBe(null);

      game.attack(6, 4, game.computer);
      expect(game.computer.board[3][4].status).toBe('expose');
    });
  });

  describe('Game Controller tests', () => {
    test('Removes sunk ship frm player tracker', () => {
      const ship1 = Ship(2);
      game.placeShip(4, 4, 'right', game.computer, ship1);
      game.placeShip(4, 7, 'right', game.computer, ship2);
      game.placeShip(4, 9, 'right', game.computer, ship3);
      expect(game.computer.activeShips).toEqual(['destroyer', 'battleship', 'battleship']);

      game.attack(4, 4, game.computer);
      game.attack(5, 4, game.computer);
      expect(game.computer.activeShips).toEqual([ship2.name, ship3.name]);
    });

    test('Attempting to place unavailable ships will return an error', () => {
      game.player.shipArsenal = ['carrier'];
      game.placeShip(4, 4, 'right', game.player, Ship(4));
      expect(game.placeShip(3, 6, 'right', game.player, Ship(2))).toBe('Error: Unavailable ship');
    });

    test('Sunk ship is added to sunkShip player array', () => {
      game.placeShip(4, 4, 'right', game.computer, Ship(1));
      game.attack(4, 4, game.computer);
      expect(game.computer.sunkShips).toEqual(['patrol']);
    });

    test('Hits attempted on neighbour squares of hit square are impossible', () => {
      game.placeShip(4, 4, 'right', game.player, ship1);
      game.attack(6, 4, game.player);
      expect(game.attack(5, 3, game.player)).toBe('Error: Square is used');
    });

    test('Check winner works', () => {
      game.placeShip(4, 4, 'right', game.player, Ship(1));
      game.placeShip(4, 8, 'right', game.computer, Ship(1));
      game.placeShip(4, 6, 'right', game.computer, Ship(1));

      game.attack(4, 8, game.computer);
      expect(game.checkWinner(game.player, game.computer)).toBe(null);
      game.attack(4, 6, game.computer);
      expect(game.checkWinner(game.player, game.computer)).toBe('player');
    });
  });

  describe('Computer Tests', () => {
    test('Computer places all moves successfully', () => {
      game.shipSetup(game.computer);
      expect(game.computer.activeShips.length).toEqual(10);
      expect(game.computer.shipArsenal).toEqual([]);
    });

    test('Computer Attacks Player', () => {
      game.placeShip(4, 4, 'right', game.player, Ship(3));
      game.computerAttack();
      game.computerAttack();
      expect(game.getFreeSquares(game.player)).toBe(98);
    });
  });
});
