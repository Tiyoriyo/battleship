/* eslint-disable no-use-before-define */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
import Game from './modules/game';
import {
  buildBoard, renderShips, resetShipSetup, updateBoard, displayWinner, addPreGameButtons,
  updateTracker, resetTrackers,
} from './modules/dom';

// Game Controller Setup
const game = Game();
const { player } = game;
const { computer } = game;

// DOM Elements
const plyBoard = document.querySelector('.boardSpace1');
const cpuBoard = document.querySelector('.boardSpace2');
const buttonHolder = document.querySelector('.buttonHolder');

// Attack Handler
const handler = (e) => {
  if (e.target.className === 'content') return;
  const column = e.target.parentElement;
  const columnList = [...column.parentElement.childNodes];
  const columnChildren = [...column.childNodes];
  const x = columnList.indexOf(column);
  const y = columnChildren.indexOf(e.target);
  attack(x, y, computer, game);
};

// Event Listener Add & Removal Func
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

// Reset player ship arrays & generate fresh boards
const resetPlayers = () => {
  player.reset();
  computer.reset();
  plyBoard.innerHTML = '';
  cpuBoard.innerHTML = '';
  plyBoard.append(buildBoard());
  cpuBoard.append(buildBoard());
};

// Start the game func
const startGame = () => {
  buttonHolder.innerHTML = '';
  setupEventListeners('add');
};

// Event Listeners
// -- Pregame Buttons
const addGameButtonListeners = () => {
  const resetBtn = document.querySelector('#plyReset');
  const playBtn = document.querySelector('#gamePlay');
  resetBtn.addEventListener('click', () => { resetShipSetup(player, plyBoard, game); });
  playBtn.addEventListener('click', startGame);
};

// -- Restart Button
const addRestartEventListener = () => {
  const resetButton = document.querySelector('#resButton');
  resetButton.addEventListener('click', restartGame);
};

// Restarts Game with fresh slate
const restartGame = () => {
  resetPlayers();
  game.shipSetup(player);
  game.shipSetup(computer);
  renderShips(plyBoard, player);
  resetTrackers();
  addPreGameButtons();
  addGameButtonListeners();
};

// Window Setup for end game
const endGameSetup = (result) => {
  setupEventListeners('remove');
  displayWinner(result);
  addRestartEventListener();
};

// Checks if there is a winner & generates end game window setup
const checkWin = () => {
  const result = game.checkWinner(player, computer);
  // const result = 'player';
  if (result) {
    endGameSetup(result);
    return true;
  } return false;
};

// Computer Attack Move Func
const computerMove = () => {
  const coordinates = game.computerAttack();
  const { x } = coordinates;
  const { y } = coordinates;
  const { ship } = player.board[x][y];
  if (ship) {
    if (ship.isSunk()) {
      updateTracker(player.board[x][y].ship.name, player.name);
    }
  }
  updateBoard(player, plyBoard);
  setupEventListeners('add');
  checkWin();
};

// Attack initiator & DOM call
const attack = (x, y, target) => {
  if (game.attack(x, y, target) === 'Error: Square is used') return;
  const board = (target.name === 'player') ? plyBoard : cpuBoard;
  setupEventListeners('remove');
  updateBoard(target, board);
  const { ship } = target.board[x][y];
  if (ship) {
    if (ship.isSunk()) {
      updateTracker(target.board[x][y].ship.name, target.name);
    }
  }

  if (checkWin()) { return; }
  setTimeout(() => { computerMove(); }, 500);
};

// Setup player games
const setupShips = () => {
  game.shipSetup(player);
  game.shipSetup(computer);
};

// Generate Board Func
const setupBoards = () => {
  plyBoard.appendChild(buildBoard());
  cpuBoard.appendChild(buildBoard());
};

// Fresh Game Window Setup
const setupWindow = () => {
  setupShips();
  setupBoards();
  addGameButtonListeners();
  renderShips(plyBoard, player);
};

window.onload = setupWindow();
