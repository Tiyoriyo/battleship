/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
import Game from '../modules/game';
import './style.css';

// Game Controller Setup
const game = Game();
const { player } = game;
const { computer } = game;

// Board Spaces
const plyBoard = document.querySelector('.boardSpace1');
const cpuBoard = document.querySelector('.boardSpace2');

// Buttons
const buttonHolder = document.querySelector('.buttonHolder');
const plyReset = document.querySelector('#plyReset');
const gamePlay = document.querySelector('#gamePlay');

const buildBoard = () => {
  const board = document.createElement('div');
  board.classList.add('board');

  for (let i = 0; i < 10; i++) {
    const column = document.createElement('div');
    column.classList.add('column');
    for (let j = 0; j < 10; j++) {
      const square = document.createElement('div');
      const content = document.createElement('div');
      square.classList.add('square', 'noselect');
      content.classList.add('content');

      square.appendChild(content);
      column.appendChild(square);
    }
    board.appendChild(column);
  }
  return board;
};

const debugShowShips = () => {
  const columnList = plyBoard.childNodes[0].childNodes;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (player.board[i][j].ship) {
        const column = columnList[i].childNodes;
        column[j].classList.add('active');
        column[j].style.backgroundColor = '#8ba5be';
      }
    }
  }
};

const resetShipSetup = () => {
  player.resetBoard();
  player.resetShips();
  game.shipSetup(player);
  plyBoard.innerHTML = '';
  plyBoard.appendChild(buildBoard());
  debugShowShips();
};

const styleSquare = (element, result, target) => {
  const subject = element;
  if (result) {
    subject.innerHTML = '&#183;';
    subject.parentElement.classList.add(result);
    subject.classList.add(result);
    if (result === 'hit') {
      subject.parentElement.style = 'null';
      if (target === player) subject.parentElement.classList.add('hitPly');
      else if (target === computer) subject.parentElement.classList.add('hitCpu');
    }
  }
};

const updateBoard = (target) => {
  const board = (target === player) ? plyBoard : cpuBoard;
  const columns = board.childNodes[0].childNodes;
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i].childNodes;
    for (let j = 0; j < columns.length; j++) {
      const result = target.board[i][j].status;
      const subject = column[j].childNodes[0];
      styleSquare(subject, result, target);
    }
  }
};

function handler(e) {
  const column = e.target.parentElement;
  const columnList = [...column.parentElement.childNodes];
  const columnChildren = [...column.childNodes];
  const x = columnList.indexOf(column);
  const y = columnChildren.indexOf(e.target);
  attack(x, y, computer);
}

const setupEventListeners = (string) => {
  const columns = cpuBoard.childNodes[0].childNodes;
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i].childNodes;
    for (let j = 0; j < columns.length; j++) {
      if (string === 'add') {
        column[j].addEventListener('click', handler);
      } else if (string === 'remove') {
        column[j].removeEventListener('click', handler);
      }
    }
  }
};

const attack = (x, y, target) => {
  if (game.attack(x, y, target) === 'Error: Square is used') return;
  updateBoard(target);
  setupEventListeners('remove');
  if (checkWin()) return;
  game.computerAttack();
  setTimeout(() => {
    updateBoard(player);
    setupEventListeners('add');
    checkWin();
  }, 1);
};

function brightenPlayerColours() {
  const columns = plyBoard.childNodes[0].childNodes;
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i].childNodes;
    for (let j = 0; j < columns.length; j++) {
      if (column[j].style.backgroundColor) {
        column[j].style.backgroundColor = '#b2d5f6';
      }
    }
  }
}

const startGame = () => {
  buttonHolder.innerHTML = '';
  brightenPlayerColours();
  setupEventListeners('add');
};

const displayWinner = () => {
  const board1 = document.createElement('div');
  const board2 = document.createElement('div');
  board1.classList.add('overlay');
  board2.classList.add('overlay');
  plyBoard.append(board1);
  cpuBoard.append(board2);
  plyBoard.childNodes[0].classList.add('blur');
  cpuBoard.childNodes[0].classList.add('blur');
};

const checkWin = () => {
  // const result = game.checkWinner(player, computer);
  const result = true;
  if (result) {
    setupEventListeners('remove');
    displayWinner();
    return true;
  }
  return false;
};

game.shipSetup(player);
game.shipSetup(computer);

plyBoard.appendChild(buildBoard());
cpuBoard.appendChild(buildBoard());

plyReset.addEventListener('click', resetShipSetup);
gamePlay.addEventListener('click', startGame);

debugShowShips();

console.log(plyBoard.childNodes[0].childNodes);
