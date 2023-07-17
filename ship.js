const Ship = (length) => {
  if (length < 1 || length > 5) { return 'Length Error'; }

  return {
    length,
    hits: 0,
    isSunk: false,
    hit() {
      if (this.hits < this.length) {
        this.hits += 1;
        if (this.hits === this.length) { this.isSunk = !this.isSunk; }
      }
    },
  };
};

module.exports = Ship;
