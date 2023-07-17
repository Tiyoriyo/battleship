/* eslint-disable no-undef */
const Ship = require('./ship');

describe('Ship Constructor Tests', () => {
  const ship = Ship();
  test('Return object from Ship factory function', () => {
    expect(typeof ship).toBe('object');
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
