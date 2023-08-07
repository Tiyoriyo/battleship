const createSquare = () => {
  const square = document.createElement('div');
  const content = document.createElement('div');
  square.classList.add('square', 'noselect');
  content.classList.add('content');
  square.appendChild(content);
  return square;
};

const styleShipSquare = (x, y, columnList, player) => {
  if (player.board[x][y].ship) {
    const column = columnList[x].childNodes;
    column[y].classList.add('active');
    column[y].style.backgroundColor = 'rgb(184, 12, 9)';
  }
};

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

const debugShowShips = (domBoard, player) => {
  const columnList = domBoard.childNodes[0].childNodes;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) { styleShipSquare(i, j, columnList, player); }
  }
};

export { buildBoard, debugShowShips };
