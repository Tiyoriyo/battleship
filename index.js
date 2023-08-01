/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
import Game from './modules/game.js';

const game = Game();
const { player } = game;
const { computer } = game;
const plyBoard = document.querySelector('.boardSpace1');
const cpuBoard = document.querySelector('.boardSpace2');
const plyReset = document.querySelector('#plyReset');

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

plyBoard.appendChild(buildBoard(player));
cpuBoard.appendChild(buildBoard(player));

plyReset.addEventListener('click', resetShipSetup);

debugShowShips();

console.log(plyBoard.childNodes[0].childNodes);
