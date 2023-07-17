const Ship = () => ({
  length: 5,
  hits: 0,
  hit() {
    if (this.hits < this.length) { this.hits += 1; }
  },
});

module.exports = Ship;
