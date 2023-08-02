const Ship = (length) => {
  if (length < 1 || length > 5) { return 'Length Error'; }

  // eslint-disable-next-line consistent-return
  function getShipType(num) {
    switch (num) {
      case 4: return 'carrier';
      case 3: return 'battleship';
      case 2: return 'destroyer';
      case 1: return 'patrol';
      default: break;
    }
  }

  function damage() {
    if (this.hits < this.length) {
      this.hits += 1;
      this.isSunk();
    }
  }

  function isSunk() {
    if (this.length === this.hits) {
      this.sunk = true;
      return true;
    } return false;
  }

  return {
    name: getShipType(length),
    length,
    hits: 0,
    head: undefined,
    tail: undefined,
    sunk: false,
    direction: undefined,
    damage,
    isSunk,
  };
};

export default Ship;

// module.exports = Ship;
