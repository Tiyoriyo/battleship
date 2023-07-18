const Ship = (length) => {
  if (length < 1 || length > 5) { return 'Length Error'; }

  return {
    length,
    hits: 0,
    sunk: false,
    hit() {
      if (this.hits < this.length) {
        this.hits += 1;
        this.isSunk();
      }
    },
    isSunk() {
      if (this.length === this.hits) {
        this.sunk = true;
        return true;
      } return false;
    },
  };
};

module.exports = Ship;
