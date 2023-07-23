/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import Ship from '../modules/ship';

const hitDebug = (ship, num) => {
  for (let i = 0; i < num; i += 1) { ship.damage(); }
};

describe('Ship Constructor Tests', () => {
  let ship1 = Ship(5);
  let ship2 = Ship(4);
  let ship3 = Ship(2);

  beforeEach(() => {
    ship1 = Ship(5);
    ship2 = Ship(4);
    ship3 = Ship(2);
  });

  describe('Ship Creation Test', () => {
    test('Return object from Ship factory function', () => {
      expect(typeof ship1).toBe('object');
    });

    test('Return ship with given length attribute', () => {
      expect(ship1.length).toBe(5);
      expect(ship2.length).toBe(4);
      expect(ship3.length).not.toEqual(-10);
    });

    test('Return error if given length exceeds 5 or is less than 1', () => {
      const ship1 = Ship(-10);
      expect(ship1).toMatch('Length Error');
    });
  });

  describe('Ship Hit Mechanics', () => {
    test('Hit Count increases when ship is hit', () => {
      const ship1 = Ship(5);
      ship1.damage();
      expect(ship1.hits).toBe(1);
    });

    test('Battlefield sunk becomes true when the hit count reaches the length', () => {
      const ship1 = Ship(5);
      hitDebug(ship1, 5);
      expect(ship1.sunk).toBeTruthy();
    });

    test('Ship indicates it has been sunk when length = hits', () => {
      const ship1 = Ship(5);
      expect(ship1.isSunk()).toBe(false);

      hitDebug(ship1, 13);
      expect(ship1.isSunk()).toBe(true);
    });

    test('Hit Count does not increase past the length of the ship', () => {
      const ship1 = Ship(5);
      hitDebug(ship1, 10);
      expect(ship1.hits).toBe(5);
    });
  });
});
