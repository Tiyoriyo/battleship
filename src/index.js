/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
import Game from './modules/game';
import {
  buildBoard, renderShips, resetShipSetup, updateBoard, displayWinner,
  addPreGameButtons,
} from './modules/dom';
import './style.css';
import Logo from './images/logo.png';

// Add img source to logo element
document.querySelector('.logo').src = Logo;

// Game Controller Setup
const game = Game();
const { player } = game;
const { computer } = game;

// DOM Elements
const plyBoard = document.querySelector('.boardSpace1');
const cpuBoard = document.querySelector('.boardSpace2');
const buttonHolder = document.querySelector('.buttonHolder');

function handler(e) {
  if (e.target.className === 'content') return;
  const column = e.target.parentElement;
  const columnList = [...column.parentElement.childNodes];
  const columnChildren = [...column.childNodes];
  const x = columnList.indexOf(column);
  const y = columnChildren.indexOf(e.target);
  attack(x, y, computer, game);
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

const resetPlayers = () => {
  player.reset();
  computer.reset();
  plyBoard.innerHTML = '';
  cpuBoard.innerHTML = '';
  plyBoard.append(buildBoard());
  cpuBoard.append(buildBoard());
};

const startGame = () => {
  buttonHolder.innerHTML = '';
  setupEventListeners('add');
};

const addGameButtonListeners = () => {
  const resetBtn = document.querySelector('#plyReset');
  const playBtn = document.querySelector('#gamePlay');
  resetBtn.addEventListener('click', () => { resetShipSetup(player, plyBoard, game); });
  playBtn.addEventListener('click', startGame);
};

const restartGame = () => {
  resetPlayers();
  game.shipSetup(player);
  game.shipSetup(computer);
  renderShips(plyBoard, player);
  addPreGameButtons();
  addGameButtonListeners();
};

const addRestartEventListener = () => {
  document.querySelector('#resButton').addEventListener('click', restartGame);
};

const endGameSetup = (result) => {
  setupEventListeners('remove');
  displayWinner(result);
  addRestartEventListener();
};

const checkWin = () => {
  const result = game.checkWinner(player, computer);
  // const result = 'player';
  if (result) {
    endGameSetup(result);
    return true;
  } return false;
};

const computerMove = () => {
  game.computerAttack();
  updateBoard(player, plyBoard);
  setupEventListeners('add');
  checkWin();
};

const attack = (x, y, target) => {
  if (game.attack(x, y, target) === 'Error: Square is used') return;
  const board = (target.name === 'player') ? plyBoard : cpuBoard;
  setupEventListeners('remove');
  updateBoard(target, board);
  if (checkWin()) { return; }
  setTimeout(() => { computerMove(); }, 500);
};

const setupShips = () => {
  game.shipSetup(player);
  game.shipSetup(computer);
};

const setupBoards = () => {
  plyBoard.appendChild(buildBoard());
  cpuBoard.appendChild(buildBoard());
};

const setupWindow = () => {
  setupShips();
  setupBoards();
  addGameButtonListeners();
  renderShips(plyBoard, player);
};

window.onload = setupWindow();
