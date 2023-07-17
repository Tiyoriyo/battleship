const Ship = (length) => {
  if (length < 1 || length > 5) {
    return 'Length Error';
  }

  return {
    length,
    hits: 0,
    hit() {
      if (this.hits < this.length) { this.hits += 1; }
    },
  };
};

module.exports = Ship;
