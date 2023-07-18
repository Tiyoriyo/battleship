const Ship = (length) => {
  if (length < 1 || length > 5) { return 'Length Error'; }

  return {
    length,
    hits: 0,
    isSunk: false,
    hit() {
      if (this.hits < this.length) {
        this.hits += 1;
        this.sunkCheck();
      }
    },
    sunkCheck() {
      if (this.length === this.hits) {
        this.isSunk = true;
        return true;
      } return false;
    },
  };
};

module.exports = Ship;
