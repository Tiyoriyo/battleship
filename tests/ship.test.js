/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import Ship from '../modules/ship';

const hitDebug = (ship, num) => {
  for (let i = 0; i < num; i += 1) { ship.damage(); }
};

describe('Ship Constructor Tests', () => {
  test('Return object from Ship factory function', () => {
    const ship1 = Ship(5);
    expect(typeof ship1).toBe('object');
  });

  test('Return ship with given length attribute', () => {
    const ship1 = Ship(5);
    const ship2 = Ship(4);
    const ship3 = Ship(2);
    expect(ship1.length).toBe(5);
    expect(ship2.length).toBe(4);
    expect(ship3.length).not.toEqual(-10);
  });

  test('Return error if given length exceeds 5 or is less than 1', () => {
    const ship = Ship(-10);
    expect(ship).toMatch('Length Error');
  });

  describe('Ship Hit Mechanics', () => {
    test('Hit Count increases when ship is hit', () => {
      const ship = Ship(5);
      ship.damage();
      expect(ship.hits).toBe(1);
    });

    test('Battlefield sunk becomes true when the hit count reaches the length', () => {
      const ship = Ship(5);
      hitDebug(ship, 5);
      expect(ship.sunk).toBeTruthy();
    });

    test('Ship indicates it has been sunk when length = hits', () => {
      const ship = Ship(5);
      expect(ship.isSunk()).toBe(false);

      hitDebug(ship, 2);
      expect(ship.isSunk()).toBe(false);

      hitDebug(ship, 13);
      expect(ship.isSunk()).toBe(true);
    });

    test('Hit Count does not increase past the length of the ship', () => {
      const ship = Ship(5);
      hitDebug(ship, 10);
      expect(ship.hits).toBe(5);
    });
  });
});
