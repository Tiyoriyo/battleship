/* eslint-disable no-undef */
const Ship = require('./ship');

describe('Ship Constructor Tests', () => {
  const ship = Ship(5);
  test('Return object from Ship factory function', () => {
    expect(typeof ship).toBe('object');
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
    const shipError = Ship(-10);
    expect(shipError).toMatch('Length Error');
  });

  describe('Ship Hit Mechanics', () => {
    test('Hit Count increases when ship is hit', () => {
      ship.hit();
      expect(ship.hits).toBe(1);
    });

    test('Hit Count does not increase past the length of the ship', () => {
      ship.hit();
      ship.hit();
      ship.hit();
      ship.hit();
      ship.hit();
      ship.hit();
      ship.hit();
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.hits).toBe(5);
    });
  });
});
