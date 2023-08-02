/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
import Game from './modules/game.js';

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

game.shipSetup(player);

const buildBoard = () => {
  const board = document.createElement('div');
  board.classList.add('board');

  for (let i = 0; i < 10; i++) {
    const column = document.createElement('div');
    column.classList.add('column');
    for (let j = 0; j < 10; j++) {
      const square = document.createElement('div');
      const content = document.createElement('div');
      square.classList.add('square');
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
        column[j].style.background = '#0D3B66';
        column[j].classList.add('active');
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

const addEventListeners = (e) => {
  const columns = cpuBoard.childNodes[0].childNodes;
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i].childNodes;
    for (let j = 0; j < columns.length; j++) {
      column[j].addEventListener('click', () => {
        console.log(i, j);
      });
    }
  }
};

const startGame = () => {
  buttonHolder.innerHTML = '';
  addEventListeners();
};

plyBoard.appendChild(buildBoard(player));
cpuBoard.appendChild(buildBoard(player));

plyReset.addEventListener('click', resetShipSetup);
gamePlay.addEventListener('click', startGame);

debugShowShips();

console.log(plyBoard.childNodes[0].childNodes);
