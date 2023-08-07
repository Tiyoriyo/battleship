/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
import Game from './modules/game';
import { buildBoard, debugShowShips } from './modules/dom';
import './style.css';
import Logo from './images/logo.png';

document.querySelector('.logo').src = Logo;

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

const startGame = () => {
  buttonHolder.innerHTML = '';
  // brightenPlayerColours();
  setupEventListeners('add');
};

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

  restartButton.addEventListener('click', restartGame);
};

const restartGame = () => {
  resetPlayers();
  game.shipSetup(player);
  game.shipSetup(computer);
  debugShowShips(plyBoard, player);
  addPreGameButtons();
};

const resetPlayers = () => {
  player.reset();
  computer.reset();
  plyBoard.innerHTML = '';
  cpuBoard.innerHTML = '';
  plyBoard.append(buildBoard());
  cpuBoard.append(buildBoard());
};

const addPreGameButtons = () => {
  buttonHolder.innerHTML = '';
  const resetBtn = document.createElement('button');
  const playBtn = document.createElement('button');
  resetBtn.id = 'plyReset';
  playBtn.id = 'gamePlay';
  resetBtn.textContent = 'Reset';
  playBtn.textContent = 'Play';
  resetBtn.addEventListener('click', resetShipSetup);
  playBtn.addEventListener('click', startGame);
  buttonHolder.append(resetBtn, playBtn);
};

const checkWin = () => {
  // const result = game.checkWinner(player, computer);
  const result = 'player';
  if (result) {
    setupEventListeners('remove');
    displayWinner(result);
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

debugShowShips(plyBoard, player);

console.log(plyBoard.childNodes[0].childNodes);
