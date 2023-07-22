const Ship = (length) => {
  if (length < 1 || length > 5) { return 'Length Error'; }

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
    length,
    hits: 0,
    sunk: false,
    damage,
    isSunk,
  };
};

export default Ship;

// module.exports = Ship;
