// Creates a square
const createSquare = () => {
  const square = document.createElement('div');
  const content = document.createElement('div');
  square.classList.add('square', 'noselect');
  content.classList.add('content');
  square.appendChild(content);
  return square;
};

// Styles the square if it is a ship
const styleShipSquare = (x, y, square, player) => {
  if (player.board[x][y].ship) {
    square.classList.add('active');
    square.style.backgroundColor = 'rgb(184, 12, 9)';
  }
};

// Styles the square depending on {hit, miss, expose} result
const styleSquare = (element, result) => {
  const subject = element;
  if (result) {
    subject.parentElement.style = 'null';
    subject.innerHTML = '&#183;';
    subject.parentElement.classList.add(result); // Target subject's square
  }
};

// Render Player's Ships onto gameboard squares
const renderShips = (domBoard, player) => {
  const columnList = domBoard.childNodes[0].childNodes;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const square = columnList[i].childNodes[j];
      styleShipSquare(i, j, square, player);
    }
  }
};

// Creates an empty 10x10 board
const buildBoard = () => {
  const board = document.createElement('div');
  for (let i = 0; i < 10; i++) {
    const column = document.createElement('div');
    for (let j = 0; j < 10; j++) { column.appendChild(createSquare()); }
    column.classList.add('column');
    board.appendChild(column);
  }
  board.classList.add('board');
  return board;
};

// Reset Current Player Ships
const resetShipSetup = (player, domBoard, game) => {
  player.reset();
  game.shipSetup(player);

  const board = domBoard;
  board.innerHTML = '';
  board.append(buildBoard());

  renderShips(domBoard, player);
};

const updateBoard = (target, board) => {
  const columns = board.childNodes[0].childNodes;
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i].childNodes;
    for (let j = 0; j < columns.length; j++) {
      const subject = column[j].childNodes[0];
      const result = target.board[i][j].status;
      styleSquare(subject, result, target);
    }
  }
};

export {
  buildBoard, renderShips, resetShipSetup, updateBoard,
};
