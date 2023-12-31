/* eslint-disable no-plusplus */
import Logo from '../images/logo.png';
import '../style.css';

// Add img source to logo element
document.querySelector('.logo').src = Logo;

// DOM elements
const plyBoard = document.querySelector('.boardSpace1');
const cpuBoard = document.querySelector('.boardSpace2');
const buttonHolder = document.querySelector('.buttonHolder');

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
const styleShipSquare = (x, y, element, player) => {
  const square = element;
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

// Updates the board squares upon hit/miss/expose
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

// Display Game Winner & Game Loser
const displayWinner = (winner) => {
  const board1 = document.createElement('div');
  const board2 = document.createElement('div');
  board1.classList.add('overlay');
  board2.classList.add('overlay');
  board1.textContent = (winner === 'player') ? 'Computer Loses' : 'Computer Wins';
  board2.textContent = (winner === 'player') ? 'Player Wins' : 'Player Loses';

  plyBoard.append(board1);
  cpuBoard.append(board2);
  plyBoard.childNodes[0].classList.add('blur');
  cpuBoard.childNodes[0].classList.add('blur');

  const restartButton = document.createElement('button');
  restartButton.id = 'resButton';
  restartButton.textContent = 'Restart';
  buttonHolder.append(restartButton);
};

// Add reset and start game button
const addPreGameButtons = () => {
  buttonHolder.innerHTML = '';
  const resetBtn = document.createElement('button');
  const playBtn = document.createElement('button');
  resetBtn.id = 'plyReset'; playBtn.id = 'gamePlay';
  resetBtn.textContent = 'Reset'; playBtn.textContent = 'Play';
  buttonHolder.append(resetBtn, playBtn);
};

const getShips = (type, index) => {
  const array = [];
  const tracker = document.querySelector(`.shipTracker${index}`);
  const trackRows = tracker.children;
  for (let i = 0; i < trackRows.length; i++) {
    const trackRow = trackRows[i].children;
    for (let j = 0; j < trackRow.length; j++) {
      const ship = trackRow[j];
      const shipClassList = Array.from(ship.classList);
      if (shipClassList.indexOf(type) > -1) { array.push(ship); }
    }
  }
  return array;
};

const playerTracker = {
  carriers: getShips('carrier', 1),
  battleships: getShips('battleship', 1),
  destroyers: getShips('destroyer', 1),
  patrols: getShips('patrol', 1),

};

const computerTracker = {
  carriers: getShips('carrier', 2),
  battleships: getShips('battleship', 2),
  destroyers: getShips('destroyer', 2),
  patrols: getShips('patrol', 2),
};

const updateTracker = (shipName, targetName) => {
  const key = `${shipName}s`;
  const tracker = (targetName === 'player') ? playerTracker : computerTracker;
  const element = tracker[key].pop();
  element.style.backgroundColor = 'rgb(255, 195, 195)';
};

const resetColours = (tracker) => {
  const trackRows = tracker.children;
  for (let i = 0; i < trackRows.length; i++) {
    const trackRow = trackRows[i].children;
    for (let j = 0; j < trackRow.length; j++) {
      const ship = trackRow[j];
      ship.style.backgroundColor = 'red';
    }
  }
};

const resetArrays = (obj, index) => {
  Object.keys(obj).forEach((key) => {
    let string = key;
    string = string.slice(0, string.length - 1);
    obj[key] = getShips(string, index);
  });
};

const resetTrackers = () => {
  const tracker1 = document.querySelector('.shipTracker1');
  const tracker2 = document.querySelector('.shipTracker2');

  resetColours(tracker1);
  resetColours(tracker2);
  resetArrays(playerTracker, 1);
  resetArrays(computerTracker, 2);
};

export {
  buildBoard, renderShips, resetShipSetup, updateBoard, displayWinner,
  addPreGameButtons, updateTracker, resetTrackers,
};
