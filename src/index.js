/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
import Game from './modules/game';
import {
  buildBoard, renderShips, resetShipSetup, updateBoard, displayWinner,
} from './modules/dom';
import './style.css';
import Logo from './images/logo.png';

// Add img source to logo element
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

function handler(e) {
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

const attack = (x, y, target, game) => {
  if (game.attack(x, y, target) === 'Error: Square is used') return;
  const board = (target.name === 'player') ? plyBoard : cpuBoard;
  updateBoard(target, board);
  if (checkWin()) return;
  game.computerAttack();
  setTimeout(() => {
    updateBoard(player, plyBoard, cpuBoard);
    setupEventListeners('add');
    checkWin();
  }, 1);
};

const startGame = () => {
  buttonHolder.innerHTML = '';
  setupEventListeners('add', cpuBoard);
};

const restartGame = () => {
  resetPlayers();
  game.shipSetup(player);
  game.shipSetup(computer);
  renderShips(plyBoard, player);
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
  resetBtn.addEventListener('click', () => { resetShipSetup(player, plyBoard, game); });
  playBtn.addEventListener('click', startGame);
  buttonHolder.append(resetBtn, playBtn);
};

const addRestartEventListener = () => {
  document.querySelector('#resButton').addEventListener('click', restartGame);
};

const checkWin = () => {
  // const result = game.checkWinner(player, computer);
  const result = 'player';
  if (result) {
    setupEventListeners('remove');
    displayWinner(result);
    addRestartEventListener();
    return true;
  }
  return false;
};

game.shipSetup(player);
game.shipSetup(computer);

plyBoard.appendChild(buildBoard());
cpuBoard.appendChild(buildBoard());

plyReset.addEventListener('click', () => { resetShipSetup(player, plyBoard, game); });
gamePlay.addEventListener('click', startGame);

renderShips(plyBoard, player);

console.log(plyBoard.childNodes[0].childNodes);
